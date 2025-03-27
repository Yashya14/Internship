import { readFile, writeFile } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

const dbPath = join(__dirname, '../database/users.json');

interface User {
    id: string;
    [key: string]: any;
}

interface Database {
    users: User[];
}

const getAllUsers = (req: Request, res: Response): void => {
    readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const users: User[] = JSON.parse(data.toString()).users;
        res.json(users);
    });
};

const getUserById = (req: Request, res: Response): void => {
    readFile(dbPath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const users: User[] = JSON.parse(data).users;
        const singleUser = users.filter((user: User) => user.id === req.params.id);

        if (singleUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(singleUser);
    });
};

const createUser = (req: Request, res: Response): void => {
    const newUser: User = req.body;
    newUser.id = uuidv4();

    readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const db: Database = JSON.parse(data.toString());
        db.users.push(newUser);
        writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data' });
            }
            res.status(201).send("User Added Successfully!");
        });
    });
};

const updateUser = (req: Request, res: Response): void => {
    const updatedUser: Partial<User> = req.body;

    readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const db: Database = JSON.parse(data.toString());

        const userIndex = db.users.findIndex((u: User) => u.id === req.params.id);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        db.users[userIndex] = { ...db.users[userIndex], ...updatedUser };
        writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data' });
            }
            res.send("User Updated Successfully!");
        });
    });
};

const deleteUser = (req: Request, res: Response): void => {
    const userId = req.params.id;
    readFile(dbPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read database' });
        }
        const db: Database = JSON.parse(data.toString());
        const userIndex = db.users.findIndex((u: User) => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        db.users.splice(userIndex, 1);
        writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write database' });
            }
            res.status(200).send("User Deleted Successfully!");
        });
    });
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };