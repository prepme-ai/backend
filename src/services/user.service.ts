import UserModel from '../models/user.model';
import { User } from '../types/user.types';
import firebaseAdmin from 'firebase-admin';
import { createFirebaseAuth, createMongoEntry, validateRegister } from './user.helpers';
import { UserLocales } from '../locales/user.locales';
import { createResponse } from '../utils/service.helpers';
import { HttpStatusCode as HSC } from 'axios';

export const registerUser = async (user: User) => {
  const auth = firebaseAdmin.auth();

  // STEP 1: Check if user exists in Firebase
  const isUserExists = await validateRegister({ email: user.email, phoneNumber: user.phoneNumber }, auth);
  if (isUserExists) return createResponse({
    message:UserLocales.USER_EXIST,
    statusCode: HSC.Conflict
  })

  // STEP 2: Create user in Firebase
  const userFirebaseAuth = await createFirebaseAuth(user, auth);
  if (!userFirebaseAuth) return createResponse({
    message: UserLocales.NOT_REGISTERED_BOTH,
    statusCode: HSC.BadRequest
  });

  // STEP 3: Create user in MongoDB
  const mongoEntry = await createMongoEntry(user, userFirebaseAuth.uid);
  if (!mongoEntry) return createResponse({
    message: UserLocales.REGISTERED_ONLY_FB,
    statusCode: HSC.BadRequest
  })

  // STEP 4: Successfully registered.
  return  createResponse({
    message: UserLocales.REGISTERED_BOTH,
    statusCode: HSC.Created,
    data: {
      uid: userFirebaseAuth.uid
    }
  })
};

export const getUserDetails = async ({ uid }: { uid: User['uid'] }) => {
  try {
    const user = await UserModel.findOne({ uid: uid });

    if (!user) throw new Error (UserLocales.USER_NOT_FOUND);

    return createResponse({
      message: UserLocales.USER_EXIST,
      statusCode: HSC.Found,
      data: user,
    });
  } catch (error) {
    return createResponse({
      message: UserLocales.USER_NOT_FOUND,
      statusCode: HSC.BadRequest,
      data: { uid }
    });
  }
};

export const refreshToken = async (uid: User['uid']) => {
  const auth = firebaseAdmin.auth();
  try {
    const accessToken = await auth.revokeRefreshTokens(uid);
    return {
      message: 'Token is refreshed',
      accessToken: accessToken,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Token is not refreshed!',
      status: 400,
    };
  }
};
