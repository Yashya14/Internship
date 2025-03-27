import mongoose, { Schema } from 'mongoose';
import IUser from './userTypes';


const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (email: string) {
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailPattern.test(email); // Validate email format
            },
            message: 'Please enter a valid email address.',
        },
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function (value: Date) {
                const today = new Date();
                return value <= today;
            },
            message: 'Date of birth cannot be in the future Date.',
        },
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Gender is required'],
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street is required'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
        },
        zipcode: {
            type: String,
            required: [true, 'Zipcode is required'],
        },
        state: {
            type: String,
            required: [true, 'State is required'],
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
        },
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (this.username && !this.username.startsWith('@')) {
        this.username = `@${this.username}`;
    }
    next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
//   today.setHours(0, 0, 0, 0); 