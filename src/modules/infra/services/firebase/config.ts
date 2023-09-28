import firebaseAdmin from "firebase-admin";

const BUCKET = "gs://haxteras.appspot.com";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    "./src/modules/infra/services/firebase/firebase-credentials.json"
  ),
  storageBucket: BUCKET,
});

export const bucket = firebaseAdmin.storage().bucket();
