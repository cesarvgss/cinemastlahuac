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
const listPeliculas = document.getElementById('peliculas');
const listSalas = document.getElementById('salas');
const listHorarios = document.getElementById('horarios');
const selectElement = document.getElementById('options');
var disponible = "disponible"; // replace "some value" with the actual value you want
let selectedPeliculaOptionValue = '1';
let selectedHorarioOptionValue = '1';
let selectedSalaOptionValue = '1';

const fin = document.getElementById("cerrarSesion").addEventListener("click", (e) => {
    e.preventDefault()
    SignOut();
    window.location.href = "/index.html";

})

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async() => {

    //PELICULAS
    listPeliculas.addEventListener("change", () => {
        selectedPeliculaOptionValue = listPeliculas.options[listPeliculas.selectedIndex].text;
        console.log(selectedPeliculaOptionValue)
    })

    //HORARIOS
    listHorarios.addEventListener("change", () => {
        selectedHorarioOptionValue = listHorarios.options[listHorarios.selectedIndex].text; 
        console.log(selectedHorarioOptionValue)
    })

    //SALAS
    listSalas.addEventListener("change", () => {
        selectedSalaOptionValue = listSalas.options[listSalas.selectedIndex].text;
        console.log(selectedSalaOptionValue)
    })

    onGetDocuments('Pelicula', (querySnapshot) => { //obtener collecion de pelicula

        let htmlPelicula = "";

        querySnapshot.forEach((doc) => {
            const option = doc.data();
            htmlPelicula += `
                <option id="fk_idPelicula" value="${option.idPelicula}">${option.nombre}</option>
            `;
        });
        listPeliculas.innerHTML = htmlPelicula;
    })

    onGetDocuments('Sala', (querySnapshot) => {

        let htmlSala = "";

        querySnapshot.forEach((doc) => {
            const option = doc.data();
            htmlSala += `
                <option id="fk_idSala" value="${option.idSala}">${option.descripcion}</option>
            `;
        });
        listSalas.innerHTML = htmlSala;
    })

    onGetDocuments('Horario', (querySnapshot) => {

        let htmlHorario = "";

        querySnapshot.forEach((doc) => {
            const option = doc.data();
            htmlHorario += `
                <option id="fk_idHorario" value="${option.idHorario}">${option.horaInicio} - ${option.horaFin}</option>
            `;
        });
        listHorarios.innerHTML = htmlHorario;
    })

    onGetDocuments('Funcion', (querySnapshot) => { //obtener collecion de funcion para recuperar valores a actualizar de acuerdo con id

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.idFuncion}</div>
                    <div class="col">${item.descripcion}</div>
                    <div class="col">${item.fk_idPelicula}</div>
                    <div class="col">${item.fk_idSala}</div>
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
                deleteDocuments('Funcion', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {                     //modificar documento
            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Funcion', e.target.dataset.id);
                const item = doc.data();

                addForm["idFuncion"].value = item.idFuncion;
                addForm["descripcion"].value = item.descripcion;
               for (var i = 0; i < listPeliculas.options.length; i++) {
                    // Check if the text content of the option matches the selectedOption variable
                    if (listPeliculas.options[i].text === item.fk_idPelicula) {
                      // Set the matched option as selected
                      listPeliculas.selectedIndex = i;
                      break; // Exit the loop since the option is found
                    }
                }

                for (var i = 0; i < listHorarios.options.length; i++) {
                    if (listHorarios.options[i].text === item.fk_idHorario) {
                      listHorarios.selectedIndex = i;
                      break;
                    }
                }

                for (var i = 0; i < listSalas.options.length; i++) {
                    if (listSalas.options[i].text === item.fk_idSala) {
                      listSalas.selectedIndex = i;
                      break; 
                    }
                }

                editStatus = true;
                id = doc.id;

                document.getElementById('btn-save').value = "Modificar";
            })
        })
    });
});

listPeliculas.addEventListener("change", () => {    //cada vez que se actualiza la collecion de pelicula se actualiza el dropdown
    const selectedPeliculaOptionValue = listPeliculas.options[listPeliculas.selectedIndex].value;
    console.log(selectedPeliculaOptionValue)
    return selectedPeliculaOptionValue;
})

listHorarios.addEventListener("change", () => {
    const selectedHorarioOptionValue = listHorarios.options[listHorarios.selectedIndex].value;
    console.log(selectedHorarioOptionValue)
    return selectedHorarioOptionValue;
})

listSalas.addEventListener("change", () => {
    const selectedSalaOptionValue = listSalas.options[listSalas.selectedIndex].value;
    console.log(selectedSalaOptionValue)
    return selectedSalaOptionValue;
})

document.getElementById("btn-save").addEventListener('click', (e) => {  //cada vez que se haga click el btn-save se guarda los valores.
                                                                //dependiendo de la variable estatus se actualiza o guarda el documento
    e.preventDefault()

    const idFuncion = addForm['idFuncion'];
    const descripcion = addForm['descripcion'];
    const optionsPeliculas = addForm['peliculas'];
    const selectedPelicula = optionsPeliculas.selectedIndex;
    const optionsHorarios = addForm['horarios'];
    const selectedHorario = optionsHorarios.selectedIndex;
    const optionsSalas = addForm['salas'];
    const selectedSala = optionsSalas.selectedIndex;

    if (!editStatus) {

        var numeroAsientos = [];
        for (var i = 0; i < 40; i++) {
            numeroAsientos.push(disponible);
        }

        saveDocument('Funcion', {
            idFuncion: idFuncion.value,
            descripcion: descripcion.value,
            fk_idPelicula: selectedPeliculaOptionValue,
            fk_idHorario: selectedHorarioOptionValue,
            fk_idSala: selectedSalaOptionValue,
            numeroAsientos: numeroAsientos
        });
    } else {
        updateDocument(
            'Funcion',
            id, {
                idFuncion: idFuncion.value,
                descripcion: descripcion.value,
                fk_idPelicula: selectedPeliculaOptionValue,
                fk_idHorario: selectedHorarioOptionValue,
                fk_idSala: selectedSalaOptionValue
            });

        document.getElementById('btn-save').value = "Registrar";
        editStatus = false;
    }

    addForm.reset();    //limpiar formulario
});

document.getElementById("btn-clean").addEventListener('click', (e) => { //limpiar al hacer click en btn
    e.preventDefault();

    var idFuncion = document.getElementById("idFuncion");
    var descripcion = document.getElementById("descripcion");
    var fk_idPelicula = document.getElementById("fk_idPelicula");
    var fk_idHorario = document.getElementById("fk_idHorario");
    var fk_idSala = document.getElementById("fk_idSala");

    if (!editStatus) {
        idFuncion.value = "";
        descripcion.value = "";
        fk_idPelicula.value = "";
        fk_idHorario.value = "";
        fk_idSala.value = "";
    } else {
        idFuncion.value = "";
        descripcion.value = "";
        fk_idPelicula.value = "";
        fk_idHorario.value = "";
        fk_idSala.value = "";
        editStatus = false;
        document.getElementById('btn-save').value = "Registrar";
    }
});
