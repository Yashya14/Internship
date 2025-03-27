import { Request, Response } from 'express';
import User from '../user/UserModal';


//! create new user 
export const createUser = async (req: Request, res: Response) => {
    try {
        const userData = new User(req.body);
        if (!userData) {
            res.status(400).send({ msg: "User data not found" });
            return;
        }

        const savedData = await userData.save();
        // console.log(savedData);
        res.status(201).send("User added successfully");
    } catch (error) {
        res.status(500).send({ error: error, msg: "Failed to add user" });
    }
};

//! Get all users 
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const userData = await User.find();
        if (!userData) {
            res.status(404).send({ msg: "Users not found" });
            return;
        }
        res.status(200).send(userData);
        // console.log(userData);
    } catch (error) {
        res.status(500).send({ error: error, msg: "Failed to get users" });
    }
};

//!get user by id
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userData = await User.findById(req.params.id);
        if (!userData) {
            res.status(404).send({ msg: "User not found" });
            return;
        }
        res.status(200).send(userData);
    } catch (error) {
        res.status(500).send({ error: error, msg: "User not found" });
    }
}

//!delete user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            res.status(404).send({ msg: "User not found" });
            return;
        }

        const deletedData = await User.findByIdAndDelete(id);
        res.status(200).send({ deletedData, msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error, msg: "Failed to delete user" });
    }
};

//! update user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            res.status(404).send({ msg: "User not found" });
            return;
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send({ updatedData, msg: "User updated successfully" });
    } catch (error) {
        res.status(500).send({ error: error, msg: "Failed to update user" });
    }
}

















// Helper function to read the database
// const readDatabase = async (): Promise<Database | null> => {
//     try {
//         const data = await readFile(dbPath, 'utf8');
//         return JSON.parse(data.toString());
//     } catch (err) {
//         return null;
//     }

// };

// // Helper function to write the database
// const writeDatabase = async (db: Database): Promise<boolean> => {
//     try {
//         await writeFile(dbPath, JSON.stringify(db));
//         return true;
//     } catch (err) {
//         return false;
//     }
// };

// // Get all users
// const getAllUsers = async (req: Request, res: Response): Promise<void> => {
//     const db = await readDatabase();
//     if (!db) {
//         res.status(500).json({ error: 'Failed to read database' });
//         return;
//     }
//     res.status(200).json(db.users);
// };

// // Get user by ID
// const getUserById = async (req: Request, res: Response): Promise<void> => {
//     const db = await readDatabase();
//     if (!db) {
//         res.status(500).json({ error: 'Failed to read database' });
//         return;
//     }
//     const user = db.users.find(u => u.id === req.params.id);
//     if (!user) {
//         res.status(404).json({ error: 'User not found' });
//         return;
//     }
//     res.status(200).json(user);
// };

// // Create new user
// const createUser = async (req: Request, res: Response): Promise<void> => {
//     const newUser: User = { ...req.body, id: uuidv4() };
//     const db = await readDatabase();
//     if (!db) {
//         res.status(500).json({ error: 'Failed to read database' });
//         return;
//     }
//     db.users.push(newUser);

//     const success = await writeDatabase(db);
//     if (!success) {
//         res.status(500).json({ error: 'Failed to write data' });
//         return;
//     }

//     logAction({
//         date: formatDate(new Date()),
//         user: 'Admin',
//         action: 'Added User',
//         status: 'Success',
//         details: `Added new user ${newUser.firstName} ${newUser.lastName}`,
//     });
//     res.status(201).json({ message: 'User Added Successfully!', user: newUser });
// };

// // Update user
// const updateUser = async (req: Request, res: Response): Promise<void> => {
//     const updatedUser: Partial<User> = req.body;
//     const db = await readDatabase();
//     if (!db) {
//         res.status(500).json({ error: 'Failed to read database' });
//         return;
//     }

//     const userIndex = db.users.findIndex(u => u.id === req.params.id);
//     if (userIndex === -1) {
//         res.status(404).json({ error: 'User not found' });
//         return;
//     }

//     db.users[userIndex] = { ...db.users[userIndex], ...updatedUser };
//     const success = await writeDatabase(db);
//     if (!success) {
//         res.status(500).json({ error: 'Failed to write data' });
//         return;
//     }

//     logAction({
//         date: formatDate(new Date()),
//         user: 'Admin',
//         action: 'Updated User',
//         status: 'Success',
//         details: `Updated user ${db.users[userIndex].firstName} ${db.users[userIndex].lastName}`,
//     });
//     res.status(200).json({ message: 'User Updated Successfully!' });
// };

// // Delete user
// const deleteUser = async (req: Request, res: Response): Promise<void> => {
//     const userId = req.params.id;
//     const db = await readDatabase();
//     if (!db) {
//         res.status(500).json({ error: 'Failed to read database' });
//         return;
//     }

//     const userIndex = db.users.findIndex(u => u.id === userId);
//     if (userIndex === -1) {
//         res.status(404).json({ error: 'User not found' });
//         return;
//     }

//     const deletedUser = db.users[userIndex];
//     db.users.splice(userIndex, 1);
//     const success = await writeDatabase(db);
//     if (!success) {
//         res.status(500).json({ error: 'Failed to write data' });
//         return;
//     }

//     logAction({
//         date: formatDate(new Date()),
//         user: 'Admin',
//         action: 'Deleted User',
//         status: 'Success',
//         details: `Deleted user ${deletedUser.firstName} ${deletedUser.lastName}`,
//     });
//     res.status(200).json({ message: 'User Deleted Successfully!' });
// };


