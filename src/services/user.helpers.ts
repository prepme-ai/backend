import firebase from "firebase-admin";
import { User } from "../types/user.types";
import { Auth } from "firebase-admin/lib/auth/auth";
import { UserLocales } from "../locales/user.locales";
import UserModel from "../models/user.model";

export const validateRegister = async ({
  email,
  phoneNumber,
}: {
  email: User["email"];
  phoneNumber: User["phoneNumber"];
}, auth:Auth) => {
  try {
    console.log("here", await Promise.all([auth.getUserByEmail(email), auth.getUserByPhoneNumber(phoneNumber)]));
    return true;
  }
  catch (error) {
    return false;
  }
};

export const createFirebaseAuth = async ({
  email,
  fullName,
  password,
  phoneNumber
}:User, auth:Auth) => {
  try {
    const userFirebaseAuth = await auth.createUser({
      displayName: fullName,
      email: email,
      password,
      emailVerified: true,
      phoneNumber,
    });
    console.log(UserLocales.REGISTERED_FB);
    return userFirebaseAuth;

  } catch (error) {
    console.log(error);
    return false;
  }
}

export const createMongoEntry = async ({
  fullName,
  email,
  phoneNumber,
  userType,
}:User, uid:User["uid"]) => {
  try {
    const userMongo = new UserModel({
      uid,
      fullName,
      email,
      phoneNumber,
      userType,
    });

    await userMongo.save();

    console.log(UserLocales.CREATED_MONGO_ENTRY);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}