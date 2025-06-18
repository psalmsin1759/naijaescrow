import express from "express";
import dotenv from "dotenv";
dotenv.config()
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger';

import { connectRabbitMQ } from "./utils/rabbitmq";
import connectDB from "./database/mongodb";
import businessRouter from "./routes/business.route"
import userRouter from "./routes/user.route"
import adminRouter from "./routes/admin.route"


const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/businesses', businessRouter);
app.use('/api/users', userRouter);
app.use('/api/admins', adminRouter);

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "http://localhost";

 app.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
    connectDB();
    connectRabbitMQ();
});
