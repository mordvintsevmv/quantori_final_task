import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

initializeApp(firebaseConfig)

export const auth = getAuth()

export const createUserAsync = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
}

export const loginUserAsync = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const logoutUserAsync = async () => {
  await signOut(auth)
}
