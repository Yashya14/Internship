import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.routes.js';

const PORT = 8000;
const app = express();

app.use(bodyParser.json()); //Configures the app to use body-parser to parse JSON request bodies.
app.use(cors());
app.use("/", userRoutes);

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.all("*", (req, res) => {
    res.send("Path does not exist");
});

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});