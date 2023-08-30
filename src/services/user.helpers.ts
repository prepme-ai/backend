import firebase from "firebase-admin";
import { User } from "../types/user.types";

export const validateRegister = ({
  email,
  phoneNumber,
}: {
  email: User["email"];
  phoneNumber: User["phoneNumber"];
}) => {
  const auth = firebase.auth();
  return [auth.getUserByEmail(email), auth.getUserByPhoneNumber(phoneNumber)];
};
