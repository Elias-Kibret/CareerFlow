import express from "express";

import { connectDB } from "./db/connect.js";
import { userRouter } from "./routes/userRooutes.js";
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

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ messsage: "sucess" });
});
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

////////////////////////////////

// {
//   "firstName": "Elias",
//   "lastName": "Kibret",
//   "email": "et@example.com",
//   "password": "securepassword123",
//   "role": "employee",
//   "companyName": "",
//   "companyDescription": "",
//   "jobType": ["fulltime","parttime",""],
//   "skills": ["JavaScript", "Node.js", "React"],
//   "interestedSkills": ["TypeScript", "GraphQL"]
// }
// /api/users/sign-up
//
