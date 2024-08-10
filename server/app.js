import express from "express";

import { connectDB } from "./db/connect.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;
const mongoURL = process.env.MONGO_URL;

connectDB(mongoURL)
  .then(() => {
    console.log("MongoDb connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
