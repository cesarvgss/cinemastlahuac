// @ts-nocheck
import {
    saveDocument,
    getDocument,
    getDocuments,
    onGetDocuments,
    deleteDocuments,
    updateDocument,
    SignOut
} from '../../js/init.js';

const addForm = document.getElementById('add-form');
const listContainer = document.getElementById('list-container');
const listOptions = document.getElementById('options');
const selectElement = document.getElementById('options');
let selectedOptionValue = '3';

let editStatus = false;
let id = '';

const fin = document.getElementById("cerrarSesion").addEventListener("click", (e) => {
    e.preventDefault()
    SignOut();
    window.location.href = "/index.html";

})

function validateEmail(email, password) {
    const emailPattern  = /\.com$/i; // Match ".com" at the end (case-insensitive)
    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = password.length >= 10;
    return isEmailValid && isPasswordValid;
  }

window.addEventListener('DOMContentLoaded', async() => {

    selectElement.addEventListener("change", () => {
        selectedOptionValue = selectElement.options[selectElement.selectedIndex].value;
        console.log(selectedOptionValue)
    })

    onGetDocuments('Rol', (querySnapshot) => {

        let htmlO = "";

        querySnapshot.forEach((doc) => {
            const option = doc.data();
            htmlO += `
                <option id="fk_idRol" value="${option.idRol}">${option.descripcion}</option>
            `;
        });
        listOptions.innerHTML = htmlO;
    })

    onGetDocuments('Usuarios', (querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.idUsuario}</div>
                    <div class="col">${item.correo}</div>
                    <div class="col">${item.fk_idRol}</div>
                    <div class="col">
                        <button class='btn-edit' data-id="${doc.id}">Modificar</button>
                        <button class='btn-delete' data-id="${doc.id}">Eliminar</button>
                    </div>
                </div>
            `;
        });

        listContainer.innerHTML = html;

        const btnsDelete = listContainer.querySelectorAll('.btn-delete');
        const btnsEdit = listContainer.querySelectorAll('.btn-edit');

        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                deleteDocuments('Usuarios', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Usuarios', e.target.dataset.id);
                const item = doc.data();

                addForm["idUsuario"].value = item.idUsuario;
                addForm["correo"].value = item.correo;
                addForm["password"].value = item.password;
                addForm["nombre"].value = item.nombre;
                addForm["apellidoP"].value = item.apellidoP;
                addForm["apellidoM"].value = item.apellidoM;
                addForm["fechaNacimiento"].value = item.fechaNacimiento;
                addForm["direccion"].value = item.direccion;
                addForm["options"].value = selectedOptionValue;

                editStatus = true;
                id = doc.id;

                document.getElementById('btn-save').value = "Modificar";
            })
        })
    });
});

selectElement.addEventListener("change", () => {
    const selectedOptionValue = selectElement.options[selectElement.selectedIndex].value;
    console.log(selectedOptionValue)
    return selectedOptionValue;
})

document.getElementById("btn-save").addEventListener('click', (e) => {
    e.preventDefault()

    const idUsuario = addForm['idUsuario'];
    const correo = addForm['correo'];
    const password = addForm['password'];
    const nombre = addForm['nombre'];
    const apellidoP = addForm['apellidoP'];
    const apellidoM = addForm['apellidoM'];
    const fechaNacimiento = addForm['fechaNacimiento'];
    const direccion = addForm['direccion'];
    const options = addForm['options'];
    const selectedIndex = options.selectedIndex;
    
    if(validateEmail(correo.value, password.value) != false){
        if (!editStatus) {

            saveDocument('Usuarios', {
                idUsuario: idUsuario.value,
                correo: correo.value,
                password: password.value,
                nombre: nombre.value,
                apellidoP: apellidoP.value,
                apellidoM: apellidoM.value,
                fechaNacimiento: fechaNacimiento.value,
                direccion: direccion.value,
                fk_idRol: selectedOptionValue
            });
        } else {
            updateDocument(
                'Usuarios',
                id, {
                    idUsuario: idUsuario.value,
                    correo: correo.value,
                    password: password.value,
                    nombre: nombre.value,
                    apellidoP: apellidoP.value,
                    apellidoM: apellidoM.value,
                    fechaNacimiento: fechaNacimiento.value,
                    direccion: direccion.value,
                    fk_idRol: selectedOptionValue
                });
            console.log("fk_idRol: " + fk_idRol.value)
    
            document.getElementById('btn-save').value = "Registrar";
            editStatus = false;
        }
    
        addForm.reset();

    } else {
        document.getElementById("mensajeError").innerText = "Error en contraseña y correo. El password debe ser 10 caracteres"
        setTimeout(function() {
            document.getElementById("mensajeError").innerText = "";
          }, 5000);
    }
});

document.getElementById("btn-clean").addEventListener('click', (e) => {
    e.preventDefault();

    var idUsuario = document.getElementById("idUsuario");
    var correo = document.getElementById("correo");
    var password = document.getElementById("password");
    var nombre = document.getElementById("nombre");
    var apellidoP = document.getElementById("apellidoP");
    var apellidoM = document.getElementById("apellidoM");
    var fechaNacimiento = document.getElementById("fechaNacimiento");
    var direccion = document.getElementById("direccion");
    var fk_idRol = document.getElementById("fk_idRol");


    if (!editStatus) {
        idUsuario.value = "";
        correo.value = "";
        password.value = "";
        nombre.value = "";
        apellidoP.value = "";
        apellidoM.value = "";
        fechaNacimiento.value = "";
        direccion.value = "";
        fk_idRol.value = "";
    } else {
        idUsuario.value = "";
        correo.value = "";
        password.value = "";
        nombre.value = "";
        apellidoP.value = "";
        apellidoM.value = "";
        fechaNacimiento.value = "";
        direccion.value = "";
        fk_idRol.value = "";
        editStatus = false;
        document.getElementById('btn-save').value = "Registrar";
    }
});
