const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.routes');
const roleRoutes = require('./routes/roles.routes');
const assignUserRoleRoutes = require('./routes/assignUserRole.routes');
const combinedDataRoutes = require('./routes/combinedData.routes');

const PORT = 8000;

const app = express();

app.use(bodyParser.json()); 
app.use(cors());

app.use("/api/", userRoutes);
app.use("/api/", roleRoutes);
app.use("/api/",assignUserRoleRoutes)
app.use("/api/",combinedDataRoutes)

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Path does not exist!" });
});

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});