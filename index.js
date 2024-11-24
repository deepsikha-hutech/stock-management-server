import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/health-check", (req, res) => {
  res.send("stock management server is running...");
});

app.listen(port, (error) => {
  if (error) {
    console.log("Error: " + error);
  } else {
    console.log("Server is running on port " + port);
  }
});
