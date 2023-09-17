import 'firebase/compat/auth';

import firebase from 'firebase/compat/app';
import { User } from '../types/user.types';

// ADD types later
const loginUserFB = ({ email, password }: { email: User['email']; password: User['password'] }) => {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
};

// const logoutUserFB = () => auth.signOut();

// const sendPasswordResetEmailFB = ({ email }:{ email: User["email"] }) => auth.sendPasswordResetEmail(email);

const FirebaseAuthService = {
  loginUserFB,
  // logoutUserFB,
  // sendPasswordResetEmailFB,
};
export default FirebaseAuthService;
