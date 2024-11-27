import { validatePayload } from "../../utils/v1/middleware.js";
// import { updateUserbyId } from "../../controller/v1/auth.js";
// import { updateUser } from "../../controller/v1/auth.js";

import express from "express";

import {
  NEW_STOCK_RULE,
  UPDATE_STOCK_RULE,
} from "../../utils/v1/validationrules.js";
import {
  createStock,
  deleteStockbyId,
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

router.get("/:id", getStockbyId);

router.get("/", getAllStocks);

router.delete("/:id", deleteStockbyId);

export default router;
