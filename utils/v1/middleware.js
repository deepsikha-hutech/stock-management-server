import { verifyToken } from "./crypto.js";
import { perfectPayloadV1 } from "perfect-payload";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

export async function verifyUserToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  try {
    verifyToken(token)
      .then((decoded) => {
        req.user = decoded;
        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).json({ message: "Invalid token" });
      });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export const validatePayload = ({ rule }) => {
  return (req, res, next) => {
    const { statusCode, ...response } = perfectPayloadV1(req?.body, rule);
    if (+statusCode >= 200 && +statusCode <= 299) {
      next();
    } else res.status(statusCode).json(response);
  };
};

export const uploadFileMiddleware = upload.single("data");
uploadFileMiddleware.errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: "File upload error: " + err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
  next();
};
