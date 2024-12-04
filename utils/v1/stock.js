import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

import { DBCRUD } from "../dbcrud.js";
// import fs from "fs";
// import csv from "csv-parser";

// import { parser } from "json2csv";

export async function createStockUtil(stockinfo) {
  try {
    const stockDBCRUD = new DBCRUD("userstocks");
    await stockDBCRUD.initialize();
    const { acknowledged, insertedId } = await stockDBCRUD.insertOne(stockinfo);
    if (acknowledged && insertedId) {
      return {
        statusCode: 200,
        stockinfo: { ...stockinfo, _id: insertedId },
        message: "stock created successfully",
      };
    } else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

export async function updateStockbyIdUtil(id, updateInfo) {
  try {
    const stockDBCRUD = new DBCRUD("userstocks");
    await stockDBCRUD.initialize();
    const { acknowledged, modifiedCount, matchedCount } =
      await stockDBCRUD.updateById(id, updateInfo);
    if (acknowledged && matchedCount) {
      return {
        statusCode: 200,
        stockinfo: { ...updateInfo, _id: id },
        message: "stock updated successfully",
      };
    } else if (matchedCount === 0) {
      return {
        statusCode: 400,
        message: "stock not found",
      };
    } else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

export async function getStockbyIdUtil(id) {
  try {
    const stockDBCRUD = new DBCRUD("userstocks");
    await stockDBCRUD.initialize();
    const stockinfo = await stockDBCRUD.findById(id);

    console.log(stockinfo);

    if (stockinfo) {
      return {
        statusCode: 200,
        stockinfo,
        message: "stock found successfully",
      };
    } else if (!stockinfo)
      return {
        statusCode: 400,
        message: "stock not found",
      };
    else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

export async function getAllStocksUtil(page, limit, search) {
  try {
    const stockDBCRUD = new DBCRUD("userstocks");
    await stockDBCRUD.initialize();
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { customerid: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ],
      };
    }
    const skip = (+page - 1) * +limit;
    const { rows = [], totalCount = 0 } = await stockDBCRUD.findAndCountAll(
      searchQuery,
      null,
      skip,
      +limit
    );
    return {
      statusCode: 200,
      stocks: rows,
      totalCount,
      message: "stocks found successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

export async function deleteStockbyIdUtil(id) {
  try {
    const stockDBCRUD = new DBCRUD("userstocks");
    await stockDBCRUD.initialize();
    const { acknowledged, deletedCount } = await stockDBCRUD.deleteById(id);
    if (acknowledged && deletedCount) {
      return {
        statusCode: 200,
        stockinfo: { _id: id },
        message: "stock deleted successfully",
      };
    } else if (deletedCount === 0) {
      return {
        statusCode: 400,
        message: "stock not found",
      };
    } else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

export async function togggleStockStatusUtil(id, status) {
  try {
    const stockDBCRUD = new DBCRUD("userstocks");
    await stockDBCRUD.initialize();
    const { acknowledged, modifiedCount, matchedCount } =
      await stockDBCRUD.updateById(id, { status: status == "active" });
    if (acknowledged && matchedCount) {
      return {
        statusCode: 200,
        stockinfo: { status: status == "active", _id: id },
        message: "stock status updated successfully",
      };
    } else if (matchedCount === 0) {
      return {
        statusCode: 400,
        message: "stock not found",
      };
    } else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

export async function exportStocksUtil(search) {
  try {
    const stockDBCRUD = new DBCRUD("userstocks");
    await stockDBCRUD.initialize();
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { customerid: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ],
      };
    }
    const stocks = await stockDBCRUD.findAll(searchQuery);
    return {
      statusCode: 200,
      stocks,
      message: "stocks found successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

export async function importStocksUtil(stocks) {
  try {
    const stockDBCRUD = new DBCRUD("userstocks");
    await stockDBCRUD.initialize();
    const { acknowledged, insertedIds } = await stockDBCRUD.insertMany(stocks);
    if (acknowledged && insertedIds) {
      return {
        statusCode: 200,
        stocks: Object.keys(insertedIds),
        message: "stocks imported ",
      };
    } else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}
