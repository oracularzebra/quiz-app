// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsNrqpCeRP5H5czViHYBl4m6zcns5F_3s",
  authDomain: "quizze-3dd02.firebaseapp.com",
  projectId: "quizze-3dd02",
  storageBucket: "quizze-3dd02.appspot.com",
  messagingSenderId: "227820419143",
  appId: "1:227820419143:web:3b78185a827ef65e8e1962",
  databaseURL: "https://quizze-3dd02-default-rtdb.firebaseio.com",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;