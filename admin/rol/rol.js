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
let editStatus = false;
let id = '';

const fin = document.getElementById("cerrarSesion").addEventListener("click", (e) => {
    e.preventDefault()
    SignOut();
    window.location.href = "/index.html";

})

window.addEventListener('DOMContentLoaded', async() => {

    onGetDocuments('Rol', (querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.idRol}</div>
                    <div class="col">${item.descripcion}</div>
                    <div class="col">${item.activo}</div>
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
                deleteDocuments('Rol', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Rol', e.target.dataset.id);
                const item = doc.data();

                addForm["idRol"].value = item.idRol;
                addForm["descripcion"].value = item.descripcion;
                addForm["activo"].value = item.activo;

                editStatus = true;
                id = doc.id;

                document.getElementById('btn-save').value = "Modificar";
            })
        })
    });
});

document.getElementById("btn-save").addEventListener('click', (e) => {
    e.preventDefault()

    const idRol = addForm['idRol'];
    const descripcion = addForm['descripcion'];
    const activo = addForm['activo'];

    if (!editStatus) {
        saveDocument('Rol', {
            idRol: idRol.value,
            descripcion: descripcion.value,
            activo: activo.value
        });
    } else {
        updateDocument(
            'Rol',
            id, {
                idRol: idRol.value,
                descripcion: descripcion.value,
                activo: activo.value
            });

        document.getElementById('btn-save').value = "Registrar";
        editStatus = false;
    }

    addForm.reset();
});

document.getElementById("btn-clean").addEventListener('click', (e) => {
    e.preventDefault();
    var idRol = document.getElementById("idRol");
    var descripcion = document.getElementById("descripcion");
    var activo = document.getElementById("activo");
    if (!editStatus) {
        idRol.value = "";
        descripcion.value = "";
        activo.value = "";
    } else {
        idRol.value = "";
        descripcion.value = "";
        activo.value = "";
        editStatus = false;
        document.getElementById('btn-save').value = "Registrar";
    }
});
