import express from "express";
const router = express.Router();
import {
  createStockUtil,
  updateStockbyIdUtil,
  getStockbyIdUtil,
  getAllStocksUtil,
  deleteStockbyIdUtil,
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
    console.log({ id });
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
