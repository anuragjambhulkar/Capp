import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Correctly import getAuth
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_KuDSyvQpSlx15PRHiDKBMEb35NBk-cI",
  authDomain: "capp-80b80.firebaseapp.com",
  projectId: "capp-80b80",
  storageBucket: "capp-80b80.firebasestorage.app",
  messagingSenderId: "61493368772",
  appId: "1:61493368772:web:8adcaadb6d3bc19b2b7691"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// Create collection references
const usersRef = collection(db, 'users');
const roomRef = collection(db, 'rooms');

// Export Firebase services
export { auth, db, usersRef, roomRef };
// To get the Auth instance after initialization

