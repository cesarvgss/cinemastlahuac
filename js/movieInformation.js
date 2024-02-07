// @ts-nocheck
import {
        getDocument
    
} from './init.js';

var urlParams = ""
var peliculaId = ""
// Extract the query parameter value
    urlParams = new URLSearchParams(window.location.search);
    peliculaId = urlParams.get('peliculaId');

    // Set the value as the content of the span tag
    const spanElement = document.getElementById('peliculaId');
    spanElement.textContent = peliculaId;

// Call the getDocument function
const docRef = await getDocument('Pelicula', peliculaId);

// Access the data in the document
var nombre = docRef.data().nombre;
var sinopsis = docRef.data().sinopsis;
var clasificacion = docRef.data().clasificacion;
var director = docRef.data().director;
var duracion = docRef.data().duracion;
var genero = docRef.data().genero;
var reparto = docRef.data().reparto;
var urlImagen = docRef.data().urlImagen;
var urlTrailer = docRef.data().urlTrailer;

// Obtain the corresponding tags via ID
document.getElementById("titulo").innerHTML = nombre;
document.getElementById("sinopsis").innerHTML = sinopsis;
document.getElementById("clasificacion").innerHTML = clasificacion;
document.getElementById("director").innerHTML = director;
document.getElementById("duracion").innerHTML = duracion;
document.getElementById("genero").innerHTML = genero;
document.getElementById("reparto").innerHTML = reparto;

const newImg = document.getElementById("img-url");
newImg.src = urlImagen;

const newTrialer = document.getElementById("urlTrailer");
newTrialer.src = urlTrailer;

const mainmovie = document.getElementById("btn-ref")
const newLink = document.getElementById("newLink")

mainmovie.addEventListener("click",  async(e) => {
    newLink.href = 'reserva.html?peliculaId='+encodeURIComponent(peliculaId);
})


