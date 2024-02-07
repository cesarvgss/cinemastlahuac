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
const asientosArray=[];
let editStatus = false;
let id = '';

const fin = document.getElementById("cerrarSesion").addEventListener("click", (e) => {
    e.preventDefault()
    SignOut();
    window.location.href = "/index.html";

})

window.addEventListener('DOMContentLoaded', async() => {

    onGetDocuments('Sala', (querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.idSala}</div>
                    <div class="col">${item.descripcion}</div>
                    <div class="col">${item.asientosDisponibles}</div>
                    <div class="col">
                        <button class='btn-edit' data-id="${doc.id}">Modificar</button>
                        <button class='btn-delete' data-id="${doc.id}">Eliminar</button>
                    </div>
                </div>
            `;
        });
        onGetDocuments('Asiento', (querySnapshot) => {
    
            querySnapshot.forEach((doc) => {
                    asientosArray.push(doc.data());
            });
        })

        console.log(asientosArray)

        listContainer.innerHTML = html;

        const btnsDelete = listContainer.querySelectorAll('.btn-delete');
        const btnsEdit = listContainer.querySelectorAll('.btn-edit');

        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                deleteDocuments('Sala', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Sala', e.target.dataset.id);
                const item = doc.data();

                addForm["idSala"].value = item.idSala;
                addForm["descripcion"].value = item.descripcion;
                addForm["asientosDisponibles"].value = item.asientosDisponibles;

                editStatus = true;
                id = doc.id;

                document.getElementById('btn-save').value = "Modificar";
            })
        })
    });
});

document.getElementById("btn-save").addEventListener('click', (e) => {
    e.preventDefault()

    const idSala = addForm['idSala'];
    const descripcion = addForm['descripcion'];
    const asientosDisponibles = addForm['asientosDisponibles'];

    if (!editStatus) {
        saveDocument('Sala', {
            idSala: idSala.value,
            descripcion: descripcion.value,
            asientosDisponibles: asientosDisponibles.value,
            asientos: asientosArray
        });
    } else {
        updateDocument(
            'Sala',
            id, {
                idSala: idSala.value,
                descripcion: descripcion.value,
                asientosDisponibles: asientosDisponibles.value
            });

        document.getElementById('btn-save').value = "Registrar";
        editStatus = false;
    }

    addForm.reset();
});

document.getElementById("btn-clean").addEventListener('click', (e) => {
    e.preventDefault();
    var idSala = document.getElementById("idSala");
    var descripcion = document.getElementById("descripcion");
    var asientosDisponibles = document.getElementById("asientosDisponibles");
    if (!editStatus) {
        idSala.value = "";
        descripcion.value = "";
        asientosDisponibles.value = "";
    } else {
        idSala.value = "";
        descripcion.value = "";
        asientosDisponibles.value = "";
        editStatus = false;
        document.getElementById('btn-save').value = "Registrar";
    }
});
