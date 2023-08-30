import mongoose from "mongoose";
import firebaseAdmin from "firebase-admin";
import { createFirebaseAdminConfig } from "./database.helpers";

export default async function () {
  mongoose.connect(process.env.ATLAS_URI || "");

  const connection = mongoose.connection;
  connection.once("open", () => console.log("Mongo is connected"));

  try {
    await firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(createFirebaseAdminConfig()),
    });
    console.log("Firebase is connected");
  } catch (error) {
    console.log("Firebase not connected");
    console.log(error);
  }
}
