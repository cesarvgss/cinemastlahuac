// @ts-nocheck
import {
    getDocument,
    onGetDocuments
} from './init.js';

var urlParams = ""
var peliculaId = ""

// Extract the query parameter value
urlParams = new URLSearchParams(window.location.search);
peliculaId = urlParams.get('peliculaId');

// Call the getDocument function
const docRef = await getDocument('Pelicula', peliculaId);

// Access the data in the document
var nombre = docRef.data().nombre;
var clasificacion = docRef.data().clasificacion;
var director = docRef.data().director;
var duracion = docRef.data().duracion;
var genero = docRef.data().genero;
var urlImagen = docRef.data().urlImagen;
var idPelicula = docRef.data().idPelicula;

// Obtain the corresponding tags via ID
document.getElementById("titulo").innerHTML = nombre;
document.getElementById("clasificacion").innerHTML = clasificacion;
document.getElementById("director").innerHTML = director;
document.getElementById("duracion").innerHTML = duracion;
document.getElementById("genero").innerHTML = genero;

const newImg = document.getElementById("img-url");
newImg.src = urlImagen;

// const mainmovie = document.getElementById("btn-ref")
// const newLink = document.getElementById("newLink")

// mainmovie.addEventListener("click",  async(e) => {
// newLink.href = 'reserva.html?peliculaId='+encodeURIComponent(peliculaId);
// })

const divElement = document.getElementById('horarioFunciones');

let editStatus = false;

onGetDocuments("Funcion", (querySnapshot) => {

    let html = "";

    // Loop through each document in the snapshot
    querySnapshot.forEach((doc) => {
        let idHorario = "";
        const item = doc.data();
        // Retrieve the "urlImagen" field from the document and log it to the console
        if (item.fk_idPelicula == nombre) { //

            console.log("aquí todo bien")
            idHorario = item.fk_idHorario //idHorario is 5

            html += `
                <button class="button" id="horario"><a href="asientos.html?funcionId=${doc.id}" style="color: white;">${item.fk_idHorario}</a></button>
                `;

                divElement.innerHTML = html;
        
        } else {

        }
    }); //end for first forEach

}); //end of ongetdocuments