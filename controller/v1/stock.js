import express from "express";
const router = express.Router();
import {
  createStockUtil,
  updateStockbyIdUtil,
  getStockbyIdUtil,
  getAllStocksUtil,
  deleteStockbyIdUtil,
  togggleStockStatusUtil,
  exportStocksUtil,
  importStocksUtil,
} from "../../utils/v1/stock.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;
import { Parser } from "json2csv";
import { parse } from "dotenv";
import csv from "csv-parser";
import fs from "fs";

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

export async function exportStocks(req, res) {
  try {
    const { search = null } = req?.query;
    const { statusCode, stocks, ...response } = await exportStocksUtil(search);
    const fields = Object.keys(stocks[0]);
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(stocks);

    res.header("Content-Type", "text/csv");
    res.attachment("data.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
}

export async function importStocks(req, res) {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const stocks = await parseCSV(file.path);
    if (!stocks || stocks.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid data found in the CSV file" });
    }
    const { statusCode, ...response } = await importStocksUtil(stocks);
    fs.unlinkSync(file.path);
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
}

export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};
