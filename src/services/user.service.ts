import UserModel from "../models/user.model";
import { User } from "../types/user.types";
import firebaseAdmin from "firebase-admin";
import { validateRegister } from "./user.helpers";

/**
 * @requires Object
 * @example {name,surName,email,password,userType,phoneNumber}
 * @returns {message || error ,status ,user}
 * @note userType 1 = standartUser, 2 = companyUser , 3 = adminUser
 * @note Instead of firestore we will use mongoDB
 */
export const registerUser = async ({
  email,
  fullName,
  password,
  phoneNumber,
  userType,
}: User) => {
  const auth = firebaseAdmin.auth();

  // STEP 1: Check if user exists in Firebase
  let userFirebaseAuth = null;
  const validators = validateRegister({ email, phoneNumber });
  try {
    const validatorResults = await Promise.all(validators);
    console.log(validatorResults);
    if (validatorResults) {
      return { message: "User exists", status: 400 };
    }
  } catch (error) {
    console.log(error);
  }

  // STEP 2: Create user in Firebase
  try {
    userFirebaseAuth = await auth.createUser({
      displayName: fullName,
      email: email,
      password,
      emailVerified: true,
      phoneNumber,
    });
    console.log("User is authenticated Firebase");
  } catch (error) {
    console.log(error);
    return {
      message: "User is not registered and not added to DB",
      status: 400,
    };
  }

  // STEP 3: Create user in MongoDB
  try {
    if (userFirebaseAuth) {
      const userMongo = new UserModel({
        uid: userFirebaseAuth.uid,
        fullName,
        email,
        phoneNumber,
        userType,
      });
      await userMongo.save();
      console.log("User created to MongoDB");
      return {
        message: "User is registered and added to DB",
        uid: userFirebaseAuth.uid,
        status: 201,
      };
    } else throw "User is not registered and added to DB";
  } catch (error) {
    console.log(error);
    return {
      message: "User is registered ,but not added to DB",
      status: 400,
    };
  }
};
/**
 * @requires Object
 * @param {uid}
 * @returns {message || error ,status ,user}
 */
export const getUserDetails = async (uid: User["uid"]) => {
  try {
    const user = await UserModel.findOne({ uid: uid });
    return { message: "User is found", user: user, status: 200 };
  } catch (error) {
    console.log(error);
    return {
      message: "User not found!",
      status: 400,
    };
  }
};
/**
 * @requires Object
 * @param {uid}
 * @returns {message || error ,status ,user}
 */
export const refreshToken = async (uid: User["uid"]) => {
  const auth = firebaseAdmin.auth();
  try {
    const accessToken = await auth.revokeRefreshTokens(uid);
    return {
      message: "Token is refreshed",
      accessToken: accessToken,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Token is not refreshed!",
      status: 400,
    };
  }
};
