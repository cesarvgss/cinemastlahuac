// @ts-nocheck
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

import {
    saveDocument,
    getDocument,
    getDocuments,
    onGetDocuments,
    deleteDocuments,
    updateDocument,
    SignOut
} from '../../js/init.js';

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


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
const db = getFirestore();


const addForm = document.getElementById('add-form');
const listContainer = document.getElementById('list-container');
let editStatus = false;
let id = '';
var files = [];
var reader = new FileReader();

const fin = document.getElementById("cerrarSesion").addEventListener("click", (e) => {
    e.preventDefault()
    SignOut();
    window.location.href = "/index.html";

})

var Uploadbtn = document.getElementById('upload-button');

//IMAGENES// Create a root reference
const storage = getStorage();

const inputImage = document.getElementById('image-file');
inputImage.type = 'file';
const previewImage = document.getElementById('image-preview');
var FileName = document.getElementById("image-name");
let newImageUrl

inputImage.onchange = e =>{
    files = e.target.files;
    const Imgfile = inputImage.files[0];

    FileName = Imgfile;
    if (FileName) {

        reader.addEventListener('load', () => {
        previewImage.setAttribute('src', reader.result);

        console.log(`Selected file name: ${FileName.name}`);
        });
    
      }
       reader.readAsDataURL(Imgfile);
}

Uploadbtn.addEventListener("click", function() {
    if (FileName) {

        const ImageName = "images/"+FileName.name;
        const imageRef = ref(storage, ImageName);
    
        uploadBytes(imageRef, FileName).then((snapshot) => {
        urlDownload(ImageName);    

        console.log('Uploaded a blob or file!');

        });
      }
  });

function urlDownload(storageRef) {
    const path = ref(storage, storageRef);
    getDownloadURL(path)
    .then((url) => {
    // Do something with the URL ...
    SaveURLFirestore(storageRef)
    newImageUrl = String(url);
    console.log(newImageUrl);
  })
}
   //-----------SAVE TO FIRESTORE DATABASE ----------------//

   async function SaveURLFirestore(url){
    const name = FileName.name; //name es el nombre de la ID, AJUSTALO AL CORRECTO

    var ref = doc(db, "Peliculas/"+name); //imglINKS IS NAME OF THE COLLECTION
    await setDoc(ref, {

        ImageName: (name),
        ImageURL: url
    });
}


var input = document.createElement('input');
input.type = 'file';

window.addEventListener('DOMContentLoaded', async() => {

    onGetDocuments('Pelicula', (querySnapshot) => {

        let html = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                <div class="row">
                    <div class="col">${item.idPelicula}</div>
                    <div class="col">${item.nombre}</div>
                    <div class="col">${item.duracion}</div>
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
                deleteDocuments('Pelicula', dataset.id);
                console.log(dataset.id)
            })
        });

        btnsEdit.forEach((btn) => {

            btn.addEventListener('click', async(e) => {
                const doc = await getDocument('Pelicula', e.target.dataset.id);
                const item = doc.data();

                //COMPLETAR
                addForm["idPelicula"].value = item.idPelicula;
                addForm["nombre"].value = item.nombre;
                addForm["genero"].value = item.genero;
                addForm["clasificacion"].value = item.clasificacion;
                addForm["director"].value = item.director;
                addForm["reparto"].value = item.reparto;
                addForm["sinopsis"].value = item.sinopsis;
                addForm["urlTrailer"].value = item.urlTrailer;
                addForm["duracion"].value = item.duracion;
                addForm["esEstreno"].value = item.esEstreno;
                addForm["activo"].value = item.activo;
                addForm["image-preview"].src = item.urlImagen;

                editStatus = true;
                id = doc.id;

                document.getElementById('btn-save').value = "Modificar";
            })
        })
    });
});

document.getElementById("btn-save").addEventListener('click', (e) => {
    e.preventDefault()

    const idPelicula = addForm["idPelicula"];
    const nombre = addForm["nombre"];
    const genero = addForm["genero"];
    const clasificacion = addForm["clasificacion"];
    const director = addForm["director"];
    const reparto = addForm["reparto"];
    const sinopsis = addForm["sinopsis"];
    const urlTrailer = addForm["urlTrailer"];
    const duracion = addForm["duracion"];
    const esEstreno = addForm["esEstreno"];
    const activo = addForm["activo"];
    const urlImagen = addForm["image-preview"];

    if (!editStatus) {
        saveDocument('Pelicula', {
            idPelicula: idPelicula.value,
            nombre: nombre.value,
            genero: genero.value,
            clasificacion: clasificacion.value,
            director: director.value,
            reparto: reparto.value,
            sinopsis: sinopsis.value,
            urlTrailer: urlTrailer.value,
            duracion: duracion.value,
            esEstreno: esEstreno.value,
            activo: activo.value,
            urlImagen: newImageUrl
        });
    } else {
        updateDocument(
            'Pelicula',
            id, {
                idPelicula: idPelicula.value,
                nombre: nombre.value,
                genero: genero.value,
                clasificacion: clasificacion.value,
                director: director.value,
                reparto: reparto.value,
                sinopsis: sinopsis.value,
                urlTrailer: urlTrailer.value,
                duracion: duracion.value,
                esEstreno: esEstreno.value,
                activo: activo.value,
                urlImagen: newImageUrl
            });

        document.getElementById('btn-save').value = "Registrar";
        editStatus = false;
    }

    addForm.reset();
});

document.getElementById("btn-clean").addEventListener('click', (e) => {
    e.preventDefault();

    var idPelicula = document.getElementById("idPelicula");
    var nombre = document.getElementById("nombre");
    var genero = document.getElementById("genero");
    var clasificacion = document.getElementById("clasificacion");
    var director = document.getElementById("director");
    var reparto = document.getElementById("reparto");
    var sinopsis = document.getElementById("sinopsis");
    var urlTrailer = document.getElementById("urlTrailer");
    var duracion = document.getElementById("duracion");
    var esEstreno = document.getElementById("esEstreno");
    var activo = document.getElementById("activo");
    var urlImagen = document.getElementById("image-preview");

    if (!editStatus) {
        idPelicula.value = "";
        nombre.value = "";
        genero.value = "";
        clasificacion.value = "";
        director.value = "";
        reparto.value = "";
        sinopsis.value = "";
        urlTrailer.value = "";
        duracion.value = "";
        esEstreno.value = "";
        activo.value = "";
        urlImagen.src = "";
    } else {
        idPelicula.value = "";
        nombre.value = "";
        genero.value = "";
        clasificacion.value = "";
        director.value = "";
        reparto.value = "";
        sinopsis.value = "";
        urlTrailer.value = "";
        duracion.value = "";
        esEstreno.value = "";
        activo.value = "";
        urlImagen.src = "";

        editStatus = false;
        document.getElementById('btn-save').value = "Registrar";
    }
});
