import { readFile } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';
import { Log } from '../utils/logger';

interface Database {
    logs: Log[];
};

const dbPath = join(__dirname, '../database/logs.json');


// Helper function to read the database
const readDatabase = async (): Promise<Database | null> => {
    try {
        const data = await new Promise<Buffer>((resolve, reject) => {
            readFile(dbPath, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        // console.log(data.toString())
        return JSON.parse(data.toString());
    } catch (err) {
        return null;
    }
};

// Get all users
const getAllLogs = async (req: Request, res: Response): Promise<void> => {
    const db = await readDatabase();
    if (!db || !db.logs || db.logs.length === 0) {
        res.status(500).json({ error: 'Failed to read logs or no logs found' });
        return;
    }
    res.status(200).json(db.logs);
};


export { getAllLogs };