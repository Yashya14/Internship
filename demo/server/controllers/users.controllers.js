const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../database/users.json');

const getAllUsers = (req, res) => {
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        // console.log(data);
        const users = JSON.parse(data).users;
        res.json(users);
        // console.log(users);
    });
};

const getUserById = (req, res) => {
    // const userId = Number(req.params.id);
    // console.log(userId);
    fs.readFile(dbPath,"utf-8" ,(err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const users = JSON.parse(data).users;
        const singleUser = users.filter((user) => user.id === req.params.id);

        if (singleUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        console.log(singleUser);
        res.json(singleUser);
    });
};

const createUser = (req, res) => {
    const newUser = req.body;
    newUser.id = uuidv4();
    
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const db = JSON.parse(data);
        db.users.push(newUser);
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data' });
            }
            res.status(201).send("User Added Successfully!");
        });
    });
};

const updateUser = (req, res) => {
    const updatedUser = req.body;
    console.log(updatedUser);

    fs.readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const db = JSON.parse(data);

        const userIndex = db.users.findIndex(u => u.id === req.params.id);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        db.users[userIndex] = { ...db.users[userIndex], ...updatedUser };
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data' });
            }
            res.send("User Updated Successfully!");
        });
    });
};

const deleteUser = (req, res) => {
    const userId = req.params.id;
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read database' });
        }
        const db = JSON.parse(data);
        const userIndex = db.users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        db.users.splice(userIndex, 1);
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write database' });
            }
            res.status(200).send("User Deleted Successfully!");
        });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};