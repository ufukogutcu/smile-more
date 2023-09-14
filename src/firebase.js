import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { GoogleAuthProvider, OAuthProvider } from "firebase/auth"
import { getFirestore, collection, doc, setDoc, getDoc, onSnapshot, query, serverTimestamp } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage" 

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

export default app

export const auth = app.auth()

export const googleProvider = new GoogleAuthProvider()
export const appleProvider = new OAuthProvider("apple.com")

export const db = getFirestore(app)
export {collection, doc, setDoc, getDoc, onSnapshot, query, serverTimestamp}

export const storage = getStorage(app)
export {ref, uploadBytes, getDownloadURL}