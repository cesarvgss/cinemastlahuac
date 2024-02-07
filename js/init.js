// @ts-nocheck
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    setDoc
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js"

const firebaseConfig = {
    apiKey: "AIzaSyAazv4nUxbgswnON1l1x5JG7VsBZcPsEE0",
    authDomain: "cinemastlahuacoficial.firebaseapp.com",
    projectId: "cinemastlahuacoficial",
    storageBucket: "cinemastlahuacoficial.appspot.com",
    messagingSenderId: "773845341205",
    appId: "1:773845341205:web:dc4d99cd063f48f5016a1c",
    measurementId: "G-PH0NHTFBJJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore();

export const ResetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Correo enviado exitosamente");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
}

export const SignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Registrado");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const Login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Sesión Iniciada");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const SignOut = () => {
    signOut(auth).then(() => {
        console.log('Sesión Cerrada')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

export const stateChanged = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log(user)
            return user;

        } else {
            console.log(user)
            return null;
        }
    })
}

export const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(result => {
            console.log('Logueado con google')
             window.location.href = 'index.html';
        })
        .catch(err => {
            console.log(err)
        })
}

export const saveDocument = (coleccion, newFields) => {
    addDoc(collection(db, coleccion), newFields);
}

export const getDocuments = (coleccion) =>
    getDocs(collection(db, coleccion));


export const onGetDocuments = (coleccion, callback) => {
    onSnapshot(collection(db, coleccion), callback);
}

export const deleteDocuments = (coleccion, id) =>
    deleteDoc(doc(db, coleccion, id));

export const getDocument = (coleccion, id) => getDoc(doc(db, coleccion, id));

export const updateDocument = (coleccion, id, newFields) => {
    updateDoc(doc(db, coleccion, id), newFields);
}

