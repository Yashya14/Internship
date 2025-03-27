import { NextFunction, Request, Response } from 'express';
import User from './user.model';
import AssignUserRole from '../assignUserRole/assignUserRole.model';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '../config/config';

interface ChangePasswordRequestBody {
    userId: string;
    oldPassword: string;
    newPassword: string;
}

//! Register User
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, username, phoneNumber, dateOfBirth, gender, address, password } = req.body;

    // validation
    if (!firstName || !lastName || !email || !username || !phoneNumber || !dateOfBirth || !gender || !address || !password) {
        const error = createHttpError(400, 'All fields are required');
        return next(error);
    }

    if (password.length < 8) {
        const error = createHttpError(400, 'Password must be at least 8 characters long');
        return next(error);
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
        const error = createHttpError(400, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
        return next(error);
    }

    // db call
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = createHttpError(400, 'User already exists with this email.');
            return next(error);
        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting User"));
    }

    // password hashing 
    const hashedPassword = await bcrypt.hash(password, 10); //? (password, salt) to create hash with salt rounds not to guess any pattern

    let newUser;
    try {
        newUser = await User.create({
            firstName,
            lastName,
            email,
            username,
            phoneNumber,
            dateOfBirth,
            gender,
            address,
            password: hashedPassword
        });
    } catch (error) {
        return next(createHttpError(500, "Error while creating user"));
    }

    // generate token sync fun
    try {
        const token = sign({ _id: newUser._id },
            config.jwtSecret as string,
            {
                expiresIn: "1d",
                algorithm: "HS256"
            }
        );

        res.status(201).json({ accessToken: token, user: newUser });
    } catch (error) {
        return next(createHttpError(500, "Error while creating token"));
    }
};

//! Login User
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"));
    }

    console.log("email : ", email);
    console.log("password : ", password);
    let user;
    try {
        user = await User.findOne({ email });
        if (!user) {
            return next(createHttpError(404, "User not found"));
        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting User"));
    }

    // console.log("hashpswd : ", user.password);

    const isMatch = await bcrypt.compare(password, user.password); //? compare - it will return (boolean value) true or false
    if (!isMatch) {
        return next(createHttpError(400, "email and password is incorrect"));
    }
    // console.log(isMatch)

    // create accessToken
    try {
        const token = sign({ _id: user._id },
            config.jwtSecret as string,
            {
                expiresIn: "1d",
                algorithm: "HS256"
            }
        );

        res.json({ accessToken: token, userId: user._id.toString() });
    } catch (error) {
        return next(createHttpError(500, "Error while creating token"));
    }

}

// const getProfileDetails = async (req: Request, res: Response, next: NextFunction) => {
//     const { userId } = req.params;

//     try {
//         const user = await User.findById(userId).select('-password');
//         if (!user) {
//             return next(createHttpError(404, "User not found"));
//         }

//         const userDetails = {
//             firstName: user.firstName,
//             lastName : user.lastName,
//             username: user.username,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             dateOfBirth: user.dateOfBirth,
//             address : user.address,
//             // _id: user._id
//         };

//         res.json([userDetails]);
//     } catch (error) {
//         return next(createHttpError(500, "Error while getting User details"));
//     }
// }

//! Get all users 
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = await User.find({ _id: { $ne: "67c84fa95ba86461cc60953d" } }).select("-password");
        if (!userData) {
            return next(createHttpError(404, "Users not found"));
        }
        res.status(200).send(userData);
    } catch (error) {
        return next(createHttpError(500, "Failed to get users"));
    }
};

//! Get user by id
export const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userData = await User.findById(req.params.id).select("-password").select("-__v");
        if (!userData) {
            return next(createHttpError(404, "User not found"));
        }
        res.status(200).send(userData);
    } catch (error) {
        return next(createHttpError(500, "User not found"));
    }
};

//! Delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // if (req.params.id === "67c84fa95ba86461cc60953d") {
        //     return next(createHttpError(403, "This user cannot be deleted"));
        // }
        const id = req.params.id;
        const userExist = await User.findById(id).select("-password");
        if (!userExist) {
            return next(createHttpError(404, "User not found"));
        }

        const deletedData = await User.findByIdAndDelete(id);
        if (deletedData) {
            await AssignUserRole.deleteMany({ user: id }); // delete assigned roles
        }
        res.status(200).send({ deletedData, msg: "User and assigned roles deleted successfully" });
    } catch (error) {
        return next(createHttpError(500, "Failed to delete user"));
    }
};

//! Update user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // if (req.params.id === "67c84fa95ba86461cc60953d") {
        //     return next(createHttpError(403, "This user cannot be deleted"));
        // }
        const id = req.params.id;
        const userExist = await User.findById(id).select("-password");
        if (!userExist) {
            return next(createHttpError(404, "User not found"));
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send({ updatedData, msg: "User updated successfully" });
    } catch (error) {
        return next(createHttpError(500, "Failed to update user"));
    }
};

//! Change password

export const changePassword = async (
    req: Request<{}, {}, ChangePasswordRequestBody>,
    res: Response,
    next: NextFunction
) => {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
        return next(createHttpError(400, "All fields are required"));
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return next(createHttpError(404, "User not found"));
        }
        if (newPassword.length < 8) {
            return next(createHttpError(400, 'Password must be at least 8 characters long'));
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(newPassword)) {
            return next(createHttpError(400, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'));
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return next(createHttpError(400, "Old password is incorrect"));
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        const token = sign(
            { userId: user._id },
            config.jwtSecret as string,
            { expiresIn: '1h' }
        );


        res.status(200).json({ success: true, msg: "Password changed successfully" });
    } catch (error) {
        return next(createHttpError(500, "Failed to change password"));
    }
};
