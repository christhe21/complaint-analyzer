import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "complaint-analysis-d49e7.firebaseapp.com",
  projectId: "complaint-analysis-d49e7",
  storageBucket: "complaint-analysis-d49e7.appspot.com",
  messagingSenderId: "435595217509",
  appId: "1:435595217509:web:d4d561efbbcd1f54aad48c",
  measurementId: "G-X2K53C4C9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}