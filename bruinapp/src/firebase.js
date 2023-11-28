// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALtAMLyqRTezdUkyNXbsOCwxeME_piokQ",
  authDomain: "bruincache-1c406.firebaseapp.com",
  projectId: "bruincache-1c406",
  storageBucket: "bruincache-1c406.appspot.com",
  messagingSenderId: "1014750408853",
  appId: "1:1014750408853:web:3ccbfbf2f4ab3a5dbe6b9c",
  measurementId: "G-XPHRYSNR7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export default app;
