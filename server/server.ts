import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

const port = 3000;

app.get("/", (req, res) => {
  res.send("yo");
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
