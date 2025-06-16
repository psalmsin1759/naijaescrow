import express from "express";
import dotenv from "dotenv";
dotenv.config()

import { connectRabbitMQ } from "./utils/rabbitmq";
import connectDB from "./database/mongodb";



const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";

 app.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
    connectDB();
    connectRabbitMQ();
});
