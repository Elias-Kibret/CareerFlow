import express from "express";
import cors from "cors";

import { connectDB } from "./db/connect.js";
import { userRouter, jobRouter } from "./routes/index.js";
import dotenv from "dotenv";

// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "Content-Type, Authorization",
// };

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;
const mongoURL = process.env.MONGO_URL;

// app.use(cors(corsOptions));

connectDB(mongoURL)
  .then(() => {
    console.log("MongoDb connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  });

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ messsage: "sucess" });
});
app.use("/api/user", userRouter);
app.use("/api/jobs", jobRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
