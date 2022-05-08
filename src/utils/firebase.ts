import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHiJ7WE_zcf1wANJTUrgt9rJW0jC0sw0w",
  authDomain: "rishi-demo-getmega-web-a-dcbc0.firebaseapp.com",
  projectId: "rishi-demo-getmega-web-a-dcbc0",
  storageBucket: "rishi-demo-getmega-web-a-dcbc0.appspot.com",
  messagingSenderId: "1064382293655",
  appId: "1:1064382293655:web:1fe7de1972696266cc2bd2",
  measurementId: "G-ZE8QCL5RSH",
};

firebase.initializeApp(firebaseConfig);

const FIREBASE_AUTHENTICATION = firebase;
export default FIREBASE_AUTHENTICATION;
