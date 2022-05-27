import { initializeApp } from 'firebase/app'
import { 
    getAuth,
    createUserWithEmailAndPassword,
    updateProfil,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAH1NEtddc4teo_qxPTWuzYyKM0Qlw6Udc",
    authDomain: "new-tube-76f82.firebaseapp.com",
    projectId: "new-tube-76f82",
    storageBucket: "new-tube-76f82.appspot.com",
    messagingSenderId: "374386174914",
    appId: "1:374386174914:web:d5ff309d4772b4b796045b",
    measurementId: "G-160PYMJGPQ"
}

initializeApp(firebaseConfig)

const auth = getAuth()

export {
    auth,
    createUserWithEmailAndPassword,
    updateProfil,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
}
