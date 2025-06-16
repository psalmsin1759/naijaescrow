import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectRabbitMQ } from "./utils/rabbitmq";
dotenv.config()


const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";
const MONGO_URI = process.env.MONGO_URI || '';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log ("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on ${HOST}:${PORT}`);
    });
    connectRabbitMQ();
  })
  .catch((err: Error) => {
    console.error('DB connection error:', err);
  });
