import mongoose from 'mongoose';
import firebase from 'firebase/compat/app';
import firebaseAdmin from 'firebase-admin';
import { createFirebaseAdminConfig, createFirebaseWebConfig } from './database.helpers';

export async function initDBAdmins() {
  mongoose.connect(process.env.ATLAS_URI || '');

  const connection = mongoose.connection;
  connection.once('open', () => console.log('Mongo is connected'));

  if (!firebase.apps.length) {
    firebase.initializeApp(createFirebaseWebConfig());
  }

  try {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(createFirebaseAdminConfig()),
    });
    console.log('Firebase is connected');
  } catch (error) {
    console.log('Firebase not connected');
    console.log(error);
  }
}
