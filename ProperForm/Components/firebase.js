// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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

// Initialize Auth with AsyncStorage persistence for React Native
// Important: initializeAuth MUST be called before any getAuth(app) usage in React Native.
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  // If Auth was already initialized elsewhere, get existing instance
  auth = getAuth(app);
}

// Initialize Firestore
const db = getFirestore(app);
// Initialize Realtime Database
const rtdb = getDatabase(app);

export { auth, db, rtdb };
export default app;