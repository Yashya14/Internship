import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.routes.js";
// import connectDB from "./db/connection.js";
import mongoose from "mongoose";

const app = express();

// middleware
app.use(bodyParser.json()); //Configures the app to use body-parser to parse JSON request bodies.
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8001;
const URL = process.env.MONGODB_URL;

// mongodb connection
// connectDB();
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });

app.use("/api/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.all("*", (req, res) => {
  res.send("Path does not exist");
});
