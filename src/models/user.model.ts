import { UserTypes } from '../types/user.types';

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
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 65,
    },
    surname: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 65,
    },
    birtday: {
      type: Date,
      required: true,
    },
    gender: {
      enum: UserTypes,
      type: String,
      required: true,
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
      default: UserTypes.ATTENDANT,
      enum: UserTypes,
    },
  },
  { timestamps: true },
);
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
