// export const createFirebaseWebConfig = () => {
//   const firebaseConfig = {
//     apiKey: FIREBASE_WEB_API_KEY,
//     authDomain: FIREBASE_WEB_AUTH_DOMAIN,
//     projectId: FIREBASE_WEB_PROJECT_ID,
//     storageBucket: FIREBASE_WEB_STORAGE_BUCKET,
//     messagingSenderId: FIREBASE_WEB_MESSAGING_SENDER_ID,
//     appId: FIREBASE_WEB_APP_ID,
//     measurementId: FIREBASE_WEB_MEASUREMENT_ID,
//   };
//   return firebaseConfig;

export const createFirebaseAdminConfig = () => {
  const {
    //Firebase admin
    FIREBASE_ADMIN_TYPE,
    FIREBASE_ADMIN_PROJECT_ID,
    FIREBASE_ADMIN_PRIVATE_KEY_ID,
    FIREBASE_ADMIN_PRIVATE_KEY,
    FIREBASE_ADMIN_CLIENT_EMAIL,
    FIREBASE_ADMIN_CLIENT_ID,
    FIREBASE_ADMIN_AUTH_URI,
    FIREBASE_ADMIN_TOKEN_URI,
    FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
    FIREBASE_ADMIN_UNIVERSE_DOMAIN,
  } = process.env;
  const firebaseConfig = {
    type: FIREBASE_ADMIN_TYPE,
    projectId: FIREBASE_ADMIN_PROJECT_ID,
    privateKeyId: FIREBASE_ADMIN_PRIVATE_KEY_ID,
    privateKey: FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
    clientId: FIREBASE_ADMIN_CLIENT_ID,
    authUri: FIREBASE_ADMIN_AUTH_URI,
    tokenUri: FIREBASE_ADMIN_TOKEN_URI,
    authProviderX509CertUrl: FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
    universeDomain: FIREBASE_ADMIN_UNIVERSE_DOMAIN,
  };
  return firebaseConfig;
};
