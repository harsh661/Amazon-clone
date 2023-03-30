import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBWjlU9EZM8An3FwkzJuZb5-t7V4KpTPjY",
    authDomain: "clone-b4fc6.firebaseapp.com",
    projectId: "clone-b4fc6",
    storageBucket: "clone-b4fc6.appspot.com",
    messagingSenderId: "186519379416",
    appId: "1:186519379416:web:6cf4ba7a9719e8715ba6ad"
  };

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app);
