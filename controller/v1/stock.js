import express from "express";
const router = express.Router();
import {
  createStockUtil,
  updateStockbyIdUtil,
  getStockbyIdUtil,
  getAllStocksUtil,
  deleteStockbyIdUtil,
  togggleStockStatusUtil,
} from "../../utils/v1/stock.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

export async function createStock(req, res) {
  try {
    const { statusCode, ...response } = await createStockUtil({
      ...req?.body,
      userId: ObjectId.createFromHexString(req?.user?._id),
    });
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
}

export async function updateStockbyId(req, res) {
  const { id } = req.params;
  try {
    const { statusCode, ...response } = await updateStockbyIdUtil(
      id,
      req?.body
    );
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
}

export async function getStockbyId(req, res) {
  const { id } = req.params;
  try {
    const { statusCode, ...response } = await getStockbyIdUtil(id);
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
}

export async function getAllStocks(req, res) {
  try {
    const { page = 1, limit = 10, search = null } = req?.query;
    const { statusCode, ...response } = await getAllStocksUtil(
      page,
      limit,
      search
    );
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
}

export async function deleteStockbyId(req, res) {
  const { id } = req.params;
  try {
    const { statusCode, ...response } = await deleteStockbyIdUtil(
      id,
      req?.body
    );
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
}

export async function togggleStockStatus(req, res) {
  const { id, status } = req.params;
  try {
    const { statusCode, ...response } = await togggleStockStatusUtil(
      id,
      status
    );
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
}

// export async function downloadStockResource(req, res) {
//   const controller = {};
//   const fields = [
//     customerid,
//     name,
//     status,
//     riskprofile,
//     portfoliovalue,
//     sipamount,
//     adhocinv,
//     modelportfolio,
//     thematicinv,
//     lastupdated,
//     action,
//   ];

//   const data = await stocks.findAll();
// }

//   return downloadStockResource(res, "stocks.csv", fields, data);

// export async function downloadStockResource(res, fileName, fields, data) {
//   const csvData = json2csv({ data: data, fields: fields });
//   const csvFile = `${fileName}.csv`;
//   const csvFilePath = `${__dirname}/../uploads/${csvFile}`;
//   fs.writeFileSync(csvFilePath, csvData);
//   res.download(csvFilePath, csvFile, (err) => {
//     if (err) {
//       console.error("Error downloading file:", err);
//       res.status(500).json({ error: "Failed to download the file." });
//     } else {
//       console.log("File downloaded successfully");
//       fs.unlinkSync(csvFilePath);
//     }
//   });
// }
