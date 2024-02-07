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
const listFunciones = document.getElementById('fk_idFuncion');
const listHorarios = document.getElementById('funcionHorario');
let selectedFuncionOptionValue = '1';
let selectedHorarioOptionValue = '1';
let dropdown = document.getElementById("pagado");
var pagado = dropdown.value;

let editStatus = false;
let id = '';

const fin = document.getElementById("cerrarSesion").addEventListener("click", (e) => {
    e.preventDefault()
    SignOut();
    window.location.href = "/index.html";

})

window.addEventListener('DOMContentLoaded', async() => {

    //FUNCIONES
    listFunciones.addEventListener("change", () => {
        selectedFuncionOptionValue = listFunciones.options[listFunciones.selectedIndex].text;
        console.log(selectedFuncionOptionValue)
    });

    listHorarios.addEventListener("change", () => {
        selectedHorarioOptionValue = listHorarios.options[listHorarios.selectedIndex].text;
        console.log(selectedHorarioOptionValue)
    });

    onGetDocuments('Funcion', (querySnapshot) => { //llenar menu dropdown para funciones disponibles

        let htmlFuncion = "";

        querySnapshot.forEach((doc) => {
            const option = doc.data();
            htmlFuncion += `
                <option id="fk_idFuncion" value="${option.idFuncion}">${option.fk_idPelicula}</option>
            `;
        });
        listFunciones.innerHTML = htmlFuncion;
    })

    onGetDocuments('Funcion', (querySnapshot) => {

        let htmlHorario = "";

        querySnapshot.forEach((doc) => {
            const option = doc.data();
            htmlHorario += `
            <option id="fk_idHorario" value="${option.idFuncion}">${option.fk_idHorario}</option>
            `;
        });
        listHorarios.innerHTML = htmlHorario;
    })

    onGetDocuments('Boleto', (querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.fk_idFuncion}</div>
                    <div class="col">${item.descripcion}</div>
                    <div class="col">${item.precio}</div>
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
                deleteDocuments('Boleto', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Boleto', e.target.dataset.id);
                const item = doc.data();

                addForm["idBoleto"].value = item.cantidadBoletos;
                addForm["descripcion"].value = item.descripcion;
                addForm["idAsiento"].value = item.idAsiento;
                addForm["funcionSala"].value = item.funcionSala;
                addForm["funcionFecha"].value = item.funcionFecha;
                
                 for (var i = 0; i < listFunciones.options.length; i++) {
                    if (listFunciones.options[i].text === item.fk_idFuncion) {
                        listFunciones.selectedIndex = i;
                      break;
                    }
                }

                for (var i = 0; i < listHorarios.options.length; i++) {
                    if (listHorarios.options[i].text === item.funcionHorario) {
                        listHorarios.selectedIndex = i;
                      break; 
                    }
                }

                addForm["pagado"].value = item.pagado;
                addForm["precio"].value = item.precio;

                editStatus = true;
                id = doc.id;

                document.getElementById('btn-save').value = "Modificar";
            })
        })
    });
});

listFunciones.addEventListener("change", () => {
    const selectedFuncionOptionValue = listFunciones.options[listFunciones.selectedIndex].value;
    console.log(selectedFuncionOptionValue)
    return selectedFuncionOptionValue;
})

listHorarios.addEventListener("change", () => {
    const selectedHorarioOptionValue = listHorarios.options[listHorarios.selectedIndex].value;
    console.log(selectedHorarioOptionValue)
    return selectedHorarioOptionValue;
})

document.getElementById("btn-save").addEventListener('click', (e) => {
    e.preventDefault()

    const cantidadBoletos = addForm['idBoleto'];
    const descripcion = addForm['descripcion'];
    const idAsiento = addForm['idAsiento'];
    const funcionSala = addForm['funcionSala'];
    const funcionFecha = addForm['funcionFecha'];

    const optionsFuncion = addForm['fk_idFuncion'];
    const selectedFuncion = optionsFuncion.selectedIndex;

    const optionsHorario = addForm['funcionHorario'];
    const selectedHorario = optionsHorario.selectedIndex;

    const precio = addForm['precio'];
    const pagado = addForm['pagado'];

    if (!editStatus) {

        saveDocument(
            'Boleto', {
                cantidadBoletos: cantidadBoletos.value,
                descripcion: descripcion.value,
                idAsiento: idAsiento.value,
                funcionSala: funcionSala.value,
                funcionFecha: funcionFecha.value,
                fk_idFuncion: selectedFuncionOptionValue,
                funcionHorario: selectedHorarioOptionValue,
                pagado: pagado.value,
                precio: precio.value
            });
    } else {
        updateDocument(
            'Boleto',
            id, {
                cantidadBoletos: cantidadBoletos.value,
                descripcion: descripcion.value,
                idAsiento: idAsiento.value,
                funcionSala: funcionSala.value,
                funcionFecha: funcionFecha.value,
                fk_idFuncion: selectedFuncionOptionValue,
                funcionHorario: selectedHorarioOptionValue,
                pagado: pagado.value,
                precio: precio.value
            });

        document.getElementById('btn-save').value = "Registrar";
        editStatus = false;
    }

    addForm.reset();
});

document.getElementById("btn-clean").addEventListener('click', (e) => {
    e.preventDefault();

    var idBoleto = document.getElementById("idBoleto");
    var descripcion = document.getElementById("descripcion");
    var idAsiento = document.getElementById("idAsiento");
    var funcionSala = document.getElementById("funcionSala");
    var funcionFecha = document.getElementById("funcionFecha");
    var fk_idFuncion = document.getElementById("fk_idFuncion");
    var funcionHorario = document.getElementById("funcionHorario");
    var pagado = document.getElementById("pagado");
    var precio = document.getElementById("precio");


    if (!editStatus) {
        idBoleto.value = "";
        descripcion.value = "";
        idAsiento.value = "";
        funcionSala.value = "";
        funcionFecha.value = "";
        fk_idFuncion.value = "";
        funcionHorario.value = "";
        pagado.value = "";
        precio.value = "";
    } else {
        idBoleto.value = "";
        descripcion.value = "";
        idAsiento.value = "";
        funcionSala.value = "";
        funcionFecha.value = "";
        fk_idFuncion.value = "";
        funcionHorario.value = "";
        pagado.value = "";
        precio.value = "";

        editStatus = false;
        document.getElementById('btn-save').value = "Registrar";
    }
});
