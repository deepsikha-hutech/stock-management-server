import {
  uploadFileMiddleware,
  validatePayload,
} from "../../utils/v1/middleware.js";
import express from "express";

import {
  NEW_STOCK_RULE,
  UPDATE_STOCK_RULE,
} from "../../utils/v1/validationrules.js";
import {
  createStock,
  deleteStockbyId,
  exportStocks,
  importStocks,
  togggleStockStatus,
  updateStockbyId,
} from "../../controller/v1/stock.js";
import { getStockbyId } from "../../controller/v1/stock.js";
import { getAllStocks } from "../../controller/v1/stock.js";

const router = express.Router();

router.post("/", validatePayload({ rule: NEW_STOCK_RULE }), createStock);

router.put(
  "/:id",
  validatePayload({ rule: UPDATE_STOCK_RULE }),
  updateStockbyId
);

router.get("/export", exportStocks);

router.get("/:id", getStockbyId);

router.get("/", getAllStocks);

router.delete("/:id", deleteStockbyId);
router.put("/:id/:status", togggleStockStatus);

router.post("/import", uploadFileMiddleware, importStocks);

export default router;
