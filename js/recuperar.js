import {
    saveDocument,
    getDocument,
    updateDocument,
    auth,
    ResetPassword
  } from './init.js';

  const recoveryForm = document.querySelector('#recovery-form');
  const mensajeCorreo = document.querySelector('#mensajeCorreo');

  recoveryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    ResetPassword(email);
    let html = '';
    html += `
        <p>Si el correo ${email} existe, recibirás un correo para reestablecer tu contraseña. No olvides revisar tu bandeja de spam. Ya puedes cerrar esta página.<br><br> <a href="./index.html">Volver a inicio</a></p>        
        `;
    mensajeCorreo.innerHTML = html;
  })