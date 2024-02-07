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

    onGetDocuments('Asiento', (querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.idAsiento}</div>
                    <div class="col">${item.fila}</div>
                    <div class="col">${item.columna}</div>
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
                deleteDocuments('Asiento', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Asiento', e.target.dataset.id);
                const item = doc.data();

                addForm["idAsiento"].value = item.idAsiento;
                addForm["fila"].value = item.fila;
                addForm["columna"].value = item.columna;

                editStatus = true;
                id = doc.id;

                document.getElementById('btn-save').value = "Modificar";
            })
        })
    });
});

document.getElementById("btn-save").addEventListener('click', (e) => {
    e.preventDefault()

    const idAsiento = addForm['idAsiento'];
    const fila = addForm['fila'];
    const columna = addForm['columna'];

    if (!editStatus) {
        saveDocument('Asiento', {
            idAsiento: idAsiento.value,
            fila: fila.value,
            columna: columna.value
        });
    } else {
        updateDocument(
            'Asiento',
            id, {
                idAsiento: idAsiento.value,
                fila: fila.value,
                columna: columna.value,
                isActive: true
            });

        document.getElementById('btn-save').value = "Registrar";
        editStatus = false;
    }

    addForm.reset();
});

document.getElementById("btn-clean").addEventListener('click', (e) => {
    e.preventDefault();
    var idAsiento = document.getElementById("idAsiento");
    var fila = document.getElementById("fila");
    var columna = document.getElementById("columna");
    if (!editStatus) {
        idAsiento.value = "";
        fila.value = "";
        columna.value = "";
    } else {
        idAsiento.value = "";
        fila.value = "";
        columna.value = "";
        editStatus = false;
        document.getElementById('btn-save').value = "Registrar";
    }
});
