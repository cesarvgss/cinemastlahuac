// @ts-nocheck
const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener('click', () => {
    fila.scrollLeft += fila.offsetWidth;

    const indicadorActivo = document.querySelector('.indicadores .activo');
    if (indicadorActivo.nextSibling) {
        indicadorActivo.nextSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener('click', () => {
    fila.scrollLeft -= fila.offsetWidth;

    const indicadorActivo = document.querySelector('.indicadores .activo');
    if (indicadorActivo.previousSibling) {
        indicadorActivo.previousSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
});

// ? ----- ----- Paginacion ----- -----
const numeroPaginas = Math.ceil(peliculas.length / 5);
for (let i = 0; i < numeroPaginas; i++) {
    const indicador = document.createElement('button');

    if (i === 0) {
        indicador.classList.add('activo');
    }

    document.querySelector('.indicadores').appendChild(indicador);
    indicador.addEventListener('click', (e) => {
        fila.scrollLeft = i * fila.offsetWidth;

        document.querySelector('.indicadores .activo').classList.remove('activo');
        e.target.classList.add('activo');
    });
}

// ? ----- ----- Hover ----- -----
peliculas.forEach((pelicula) => {
    pelicula.addEventListener('mouseenter', (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
            peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
            elemento.classList.add('hover');
        }, 300);
    });
});

fila.addEventListener('mouseleave', () => {
    peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});


import {
    getDocument,
    onGetDocuments

} from './init.js';

// Create a variable to store the ID of the document you want to read
const id = 'rIPKhCUAJKP4ALnbOIaB';

// Call the getDocument function
const docRef = await getDocument('Pelicula', id);

// Access the data in the document
const nombre = docRef.data().nombre;
const sinopsis = docRef.data().sinopsis;
const mainmovie = document.getElementById("btn-ref")
const newLink = document.getElementById("newLink")


// Obtain the corresponding tags via ID
document.getElementById("movie-titulo").innerHTML = nombre;
document.getElementById("movie-descripcion").innerHTML = sinopsis;

mainmovie.addEventListener("click",  async(e) => {
    newLink.href = 'pelicula.html?peliculaId='+encodeURIComponent(id);
})

// Carousel 
const carousel = document.getElementById('carousel');
let editStatus = false;

// Call the onGetDocuments function to retrieve all documents from the "Pelicula" collection
onGetDocuments("Pelicula", (querySnapshot) => {

    let html = "";

    // Loop through each document in the snapshot
    querySnapshot.forEach((doc) => {

        // Retrieve the "urlImagen" field from the document and log it to the console
        const item = doc.data();
        html += `
					<div class="pelicula">
                        <a href="pelicula.html?peliculaId=${doc.id}" id="idPelicula"><img src="${item.urlImagen}" alt=""></a>
                    </div>
            `;
        carousel.innerHTML = html;
    });

    

});