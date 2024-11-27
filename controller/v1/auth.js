import express from "express";
const router = express.Router();
import { signupUserUtil, loginUserUtil } from "../../utils/v1/auth.js";
import { verifyUserToken } from "../../utils/v1/middleware.js";

router.post("/signup");
export async function signupUser(req, res) {
  try {
    const { statusCode, ...response } = await signupUserUtil(req?.body);
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
}

router.post("/login");
export async function loginUser(req, res) {
  const { email, password } = req?.body;
  const { statusCode, ...rest } = await loginUserUtil(email, password);
  res.status(statusCode).json(rest);
}

export default router;
// router.post(
//   "/login",
//   validatePayload({ rule: LOGIN_RULE }),
//   async (req, res) => {
//     const { email, password } = req?.body;
//     const { statusCode, ...rest } = await loginUserUtil(email, password);
//     res.status(statusCode).json(rest);
//   }
// );

// module.exports = router;
