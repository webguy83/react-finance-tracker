import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCfpT8onOmtVOWzdidJTHKBxf82FgGOu_g',
  authDomain: 'financer-75bac.firebaseapp.com',
  projectId: 'financer-75bac',
  storageBucket: 'financer-75bac.appspot.com',
  messagingSenderId: '465288220539',
  appId: '1:465288220539:web:6219f268727e2dbc5877de',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const authConfig = {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};

export { db, collection, getDocs, authConfig, addDoc };
