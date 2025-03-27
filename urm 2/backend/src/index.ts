import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import userRoutes from './user/users.routes'
import roleRoutes from './roles/roles.routes';
import assignUserRoleRoutes from './assignUserRole/assignUserRole.routes';
import combinedDataRoutes from './cominedData/combinedData.routes';
import logsRoutes from './logs/logs.routes';
import { config } from './config/config';
import connectDB from './config/db';
import globalErrorHandler from './middlewares/globalErrorHandler';
// import createHttpError, { HttpError } from 'http-errors';


const app: Express = express();

// connect db
const startServer = async () => {
    await connectDB();

    const port = config.port || 8001;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// app.get('/', (_req: Request, res: Response) => {
//     const error = createHttpError(404, 'something went wrong');
//     throw error;
//     res.send('Hello World');
// });

app.use("/api/", userRoutes);
app.use("/api/", roleRoutes);
app.use("/api/", assignUserRoleRoutes)
app.use("/api/", combinedDataRoutes)
app.use("/api/", logsRoutes)

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World');
});

app.all("*", (_req: Request, res: Response) => {
    res.status(404).json({ message: "Path does not exist!" });
});

// global error handler
app.use(globalErrorHandler)

//! make sure to change NODE_ENV to production in .env file before deploying 
