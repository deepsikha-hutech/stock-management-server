import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
// import { readExcelMiddleware } from "./utils/v1/middleware.js";
dotenv.config();

const app = express();
const port = 3000;
import v1Routes from "./routes/v1/v1.main.js";
// import { generateCsvFile } from "./utils/v1/csv.js";

app.use(cors());

app.use(express.json());

// app.use(readExcelMiddleware);

app.use(
  "/uploads",
  express.static(
    path.join("D:/training/stock-management-server/uploads", "uploads")
  )
);

// generateCsvFile();

app.get("/health-check", (req, res) => {
  res.send("stock management server is running...");
});

app.use("/api/v1", v1Routes);

app.listen(port, (error) => {
  if (error) {
    console.log("Error: " + error);
  } else {
    console.log("Server is running on port " + port);
  }
});
