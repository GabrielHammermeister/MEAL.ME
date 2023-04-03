import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA1Dhk0I62D0w0a_hfdtkQxiwJLS9JEWqM',
  authDomain: 'meal-me-v2.firebaseapp.com',
  projectId: 'meal-me-v2',
  storageBucket: 'meal-me-v2.appspot.com',
  messagingSenderId: '973433826939',
  appId: '1:973433826939:web:19a93655585f6ff8b43cde',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
