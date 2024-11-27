import { loginUser, signupUser } from "../../controller/v1/auth.js";
import { validatePayload } from "../../utils/v1/middleware.js";

import express from "express";
import { LOGIN_RULE, SIGNUP_RULE } from "../../utils/v1/validationrules.js";
const router = express.Router();

router.post("/login", validatePayload({ rule: LOGIN_RULE }), loginUser);
router.post("/signup", validatePayload({ rule: SIGNUP_RULE }), signupUser);

export default router;
