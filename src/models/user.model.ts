import { UserTypes } from "../types/user.types";

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        //general
        uid: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        fullName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 65,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        userType: {
            required: true,
            type: String,
            default: '1',
            enum: UserTypes,
        },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema); 
