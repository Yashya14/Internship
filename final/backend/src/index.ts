import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import userRegisterLogin from './registerLogin/userRegisterRoute'
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

app.use(express.json());
app.use(cors());


app.use("/api/auth", userRegisterLogin);

// app.use(authMiddleware);
app.use("/api/", userRoutes);
app.use("/api/", roleRoutes);
app.use("/api/", assignUserRoleRoutes)
app.use("/api/", combinedDataRoutes)
app.use("/api/", logsRoutes)


app.all("*", (_req: Request, res: Response) => {
    res.status(404).json({ message: "Path does not exist!" });
});

// global error handler
app.use(globalErrorHandler)

