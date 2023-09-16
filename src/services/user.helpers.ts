import firebase from 'firebase-admin';
import { User } from '../types/user.types';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { UserLocales } from '../locales/user.locales';
import UserModel from '../models/user.model';
import { CreateResponseI } from '../utils/service.helpers';
import { FirebaseAuthenticationErrors } from '../types/error.types';
import { AppLocales } from '../locales/app.locales';
import { HttpStatusCode as HSC } from 'axios';

export const handleLoginErrors = (error: any): CreateResponseI => {
  const handlers: PredicateHandlerI<CreateResponseI>[] = [
    {
      predicate: () => error?.code === FirebaseAuthenticationErrors.WRONG_PASSWORD,
      handler: () => ({
        message: UserLocales.PASSWORD_WRONG,
        statusCode: HSC.BadRequest,
      }),
    },
    {
      predicate: () => error?.code === FirebaseAuthenticationErrors.USER_NOT_FOUND,
      handler: () => ({
        message: UserLocales.USER_NOT_FOUND,
        statusCode: HSC.BadRequest,
      }),
    },
    {
      predicate: () => error?.code === FirebaseAuthenticationErrors.TOO_MANY_REQUESTS,
      handler: () => ({
        message: AppLocales.TOO_MANY_REQUESTS,
        statusCode: HSC.BadRequest,
      }),
    },
    {
      predicate: () => true,
      handler: () => ({
        message: UserLocales.INTERNAL_ERROR,
        statusCode: HSC.BadRequest,
      }),
    },
  ];
  const responseObject = handlers
    .find(({ predicate }) => predicate())
    ?.handler() as CreateResponseI;
  return responseObject;
};

export const validateRegister = async (
  {
    email,
    phoneNumber,
  }: {
    email: User['email'];
    phoneNumber: User['phoneNumber'];
  },
  auth: Auth,
) => {
  try {
    await Promise.all([auth.getUserByEmail(email), auth.getUserByPhoneNumber(phoneNumber)]);
    return true;
  } catch (error) {
    return false;
  }
};

export const createFirebaseAuth = async (
  { email, name, surname, password, phoneNumber }: User,
  auth: Auth,
) => {
  try {
    const userFirebaseAuth = await auth.createUser({
      displayName: `${name} ${surname}`,
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
};

export const createMongoEntry = async (
  { name, surname, birthday, gender, email, phoneNumber, userType }: User,
  uid: User['uid'],
) => {
  try {
    const userMongo = new UserModel({
      uid,
      name,
      surname,
      birthday,
      gender,
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
};
