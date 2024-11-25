import authV1Routes from "./auth.js";

import express from "express";
const router = express.Router();

router.use("/auth", authV1Routes);

// module.exports = router;
export default router;
