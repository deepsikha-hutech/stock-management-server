import { verifyUserToken } from "../../utils/v1/middleware.js";
import authV1Routes from "./auth.js";
import stockV1Routes from "./stock.js";

import express from "express";
const router = express.Router();

router.use("/auth", authV1Routes);
router.use("/stock", verifyUserToken, stockV1Routes);

// module.exports = router;
export default router;
