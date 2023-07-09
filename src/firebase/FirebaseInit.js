// Import the functions you need from the SDKs you need
 
import fb from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyDfnkxPnfpiHp5ravSmHdF42BMEzUpg2bs",
  authDomain: "instagram-clone-e0ca3.firebaseapp.com",
  projectId: "instagram-clone-e0ca3",
  storageBucket: "instagram-clone-e0ca3.appspot.com",
  messagingSenderId: "361781067208",
  appId: "1:361781067208:web:82c9f5f7b390bdab0794fd",
  measurementId: "G-LGYB22003B",
  databaseURL: "https://instagram-clone-e0ca3.firebaseio.com"
}

// Initialize Firebase
const app = fb.initializeApp(firebaseConfig)

const db = app.firestore()
const auth = fb.auth()
const storage = fb.storage()

export { db, auth, storage, fb }