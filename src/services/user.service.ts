import UserModel from '../models/user.model';
import { User } from '../types/user.types';
import { createFirebaseAuth, createMongoEntry, handleLoginErrors, validateRegister } from './user.helpers';
import { UserLocales } from '../locales/user.locales';
import { createResponse } from '../utils/service.helpers';
import { HttpStatusCode as HSC } from 'axios';

import FirebaseAuthService from '../database/firebase.helpers';
import { getAuth } from '../utils/firebase.helpers';

export const loginUser = async ({
  email,
  password
}:{
  email: User["email"],
  password: User["password"]
}) => {
  try {
    const user:any = await FirebaseAuthService.loginUserFB({ email, password });

    if (!user) throw new Error(UserLocales.NOT_LOGGED_IN);

    return createResponse({
      message: UserLocales.LOGGED_IN_SUCCESS,
      statusCode: HSC.Accepted,
      data: user
    });
  } catch (error:any) {
    const responseObject = handleLoginErrors(error);
    return createResponse(responseObject);
  }
}

export const registerUser = async (user: User) => {
  const auth = getAuth();

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

export const refreshToken = async ({ uid }: { uid: User['uid'] }) => {
  const auth = getAuth();
  try {
    const accessToken = await auth.revokeRefreshTokens(uid);
    console.log(accessToken);
    return createResponse({
      message: UserLocales.TOKEN_REFRESHED,
      statusCode: HSC.Created,
    })
  } catch (error) {
    console.log(error);
    return createResponse({
      message: UserLocales.TOKEN_NOT_REFRESHED,
      statusCode: HSC.BadRequest,
      data: { uid }
    });
  }
};
