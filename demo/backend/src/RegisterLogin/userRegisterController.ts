import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import UserRegisterLoginModal from './userRegisterModal';
import bcrypt from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { config } from '../config/config';
import { UserRegister } from './userRegisterTypes';

//! Register User

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
        const error = createHttpError(400, 'All fields are required');
        return next(error);
    }

    // db call
    try {
        const registerUser = await UserRegisterLoginModal.findOne({ email });
        if (registerUser) {
            const error = createHttpError(400, 'User already exists with this email.');
            return next(error);
        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting User"));
    }


    // password hashing 
    const hashedPassword = await bcrypt.hash(password, 10); //? (password, salt) to create hash with salt rounds not to guess any pattern

    let newUser: UserRegister;
    try {
        newUser = await UserRegisterLoginModal.create({
            name,
            email,
            password: hashedPassword
        })
    } catch (error) {
        return next(createHttpError(500, "Error while creating"));
    }

    // generate token sync fun
    try {
        const token = sign({ sub: newUser._id },
            config.jwtSecret as string,
            {
                expiresIn: "7d",
                algorithm: "HS256"
            }
        );

        res.status(201).json({ accessToken: token });
    } catch (error) {
        return next(createHttpError(500, "Error while creating token"));
    }

};

//! Login User
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"));
    }

    let user: UserRegister;
    try {
        user = await UserRegisterLoginModal.findOne({ email }) as UserRegister;
        if (!user) {
            return next(createHttpError(404, "User not found"));
        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting User"));
    }

    const isMatch = await bcrypt.compare(password, user.password); //? compare - it will return (boolean value) true or false
    if (!isMatch) {
        return next(createHttpError(400, "email and password is incorrect"));
    }

    // create accessToken
    try {
        const token = sign({ sub: user._id },
            config.jwtSecret as string,
            {
                expiresIn: "7d",
                algorithm: "HS256"
            }
        );

        res.json({ accessToken: token, userId: user._id.toString() });
    } catch (error) {
        return next(createHttpError(500, "Error while creating token"));
    }

}

const getProfileDetails = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    try {
        const user = await UserRegisterLoginModal.findById(userId).select('-password');
        if (!user) {
            return next(createHttpError(404, "User not found"));
        }

        const userDetails = {
            name: user.name,
            email: user.email,
            _id: user._id
        };

        res.json([userDetails]);
    } catch (error) {
        return next(createHttpError(500, "Error while getting User details"));
    }
}


export { registerUser, loginUser, getProfileDetails };