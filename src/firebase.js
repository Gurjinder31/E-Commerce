// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD4Uh1jsPzagrEbX3BTm7ML97Xk_gfS-9c",
  authDomain: "e-commerce-6011b.firebaseapp.com",
  databaseURL: "https://e-commerce-6011b.firebaseio.com",
  projectId: "e-commerce-6011b",
  storageBucket: "e-commerce-6011b.appspot.com",
  messagingSenderId: "633120578257",
  appId: "1:633120578257:web:153e711fafb2cb798643f0",
  measurementId: "G-1E2B0MK597",
};

//  intialize app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// intialize databse

const db = firebaseApp.firestore();
//it give us all variable
const auth = firebase.auth();

export { db, auth };
