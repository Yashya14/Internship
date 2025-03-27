import express,{Express,Request,Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.routes'
import roleRoutes from './routes/roles.routes';
import assignUserRoleRoutes from './routes/assignUserRole.routes';
import combinedDataRoutes from './routes/combinedData.routes';
import dotenv from 'dotenv';

dotenv.config();

const app:Express = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json()); 
app.use(cors());

app.use("/api/", userRoutes);
app.use("/api/", roleRoutes);
app.use("/api/",assignUserRoleRoutes)
app.use("/api/",combinedDataRoutes)

app.get('/',(req:Request,res:Response) => {
    res.send('Hello World');
});

app.all("*", (req:Request, res:Response) => {
    res.status(404).json({ message: "Path does not exist!" });
});

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});