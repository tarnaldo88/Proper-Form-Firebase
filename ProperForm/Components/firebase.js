// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoHo4Xillk5CuAnmc_LVdkMcbsVDvmqGM",
  authDomain: "proper-form-2ccf0.firebaseapp.com",
  databaseURL: "https://proper-form-2ccf0-default-rtdb.firebaseio.com",
  projectId: "proper-form-2ccf0",
  storageBucket: "proper-form-2ccf0.appspot.com",
  messagingSenderId: "742585827463",
  appId: "1:742585827463:web:3e649fbb62c89fa9bcf822",
  measurementId: "G-1SMGG4Y9DV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence for React Native (idempotent)
let auth;
try {
  auth = getAuth(app);
} catch (e) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export { auth };
export default app;