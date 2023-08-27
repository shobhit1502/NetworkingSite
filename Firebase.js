import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBiBqsIExxtL-CDQG_x6u0o0NmgGSS90wk",
    authDomain: "linkedin-portal.firebaseapp.com",
    projectId: "linkedin-portal",
    storageBucket: "linkedin-portal.appspot.com",
    messagingSenderId: "416383456620",
    appId: "1:416383456620:web:e461108abe75c4eea6cf49"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebaseApp.firestore();

export { db, auth };
