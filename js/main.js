// @ts-nocheck
import {
    SignUp,
    Login,
    SignOut,
    auth,
    googleAuth,
    saveDocument,
    onGetDocuments
} from "./init.js";

import {
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

import {
    logInCheck
} from './loginCheck.js'

const signupForm = document.querySelector('#signup-form');
const signinForm = document.querySelector('#login-form');
const logout = document.querySelector('#logout');
const googleLogin = document.querySelector('#googleLogin');


//REGISTRARSE
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    const nombre = document.querySelector('#nombre').value;
    const apellidoP = document.querySelector('#apellidoP').value;
    const apellidoM = document.querySelector('#apellidoM').value;
    const fechaNacimiento = document.querySelector('#fechaNacimiento').value;
    const direccion = document.querySelector('#direccion').value;

    SignUp(email, password);

    saveDocument('Usuarios', {
        idUsuario: '',
        correo: email,
        password: password,
        nombre: nombre,
        apellidoP: apellidoP,
        apellidoM: apellidoM,
        fechaNacimiento: fechaNacimiento,
        direccion: direccion,
        fk_idRol: '3'
    });

    signupForm.reset();
    $('#signupModal').modal('hide')


})

//INICIAR SESIÓN
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    Login(email, password);
    signinForm.reset();
    $('#loginModal').modal('hide')
})

//LOGOUT
logout.addEventListener('click', (e) => {
    e.preventDefault();
    SignOut();
})

//GOOGLE LOGIN
googleLogin.addEventListener('click', (e) => {
    googleAuth();
    
});


//VERIFICAR ESTADO DE AUTENTIFICACION

//

onAuthStateChanged(auth, async (user) => {
    console.log(user)

    if (user) {
        logInCheck(user);
        const userGmail = user.email;
        console.log(userGmail);

        //verificar rol de usuario
        onGetDocuments('Usuarios', (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const item = doc.data();

                if((userGmail == item.correo)&&(item.fk_idRol=='1')) {
                    window.location.href = "../admin/funcion/admon-funcion.html";
                }
                 if((userGmail == item.correo)&&(item.fk_idRol=='2')){
                    console.log("No es un admin/contador")
                 }
                 if((userGmail == item.correo)&&(item.fk_idRol=='3')){
                    console.log("Cliente")
                 }
            }); //end forEach
          
        });


    } else {
        logInCheck(user);

    }

})
