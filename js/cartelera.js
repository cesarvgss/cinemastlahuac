// @ts-nocheck
import {
    onGetDocuments

} from './init.js';

// Cartas 
const carta = document.getElementById('carta-contenedor');
let editStatus = false;
let id = '';

// Call the onGetDocuments function to retrieve all documents from the "Pelicula" collection
onGetDocuments("Pelicula", (querySnapshot) => {

    let html = "";

    // Loop through each document in the snapshot
    querySnapshot.forEach((doc) => {

        // Retrieve the "urlImagen" field from the document and log it to the console
        const item = doc.data();
        html += `
            <div class="carta">
                <img src="${item.urlImagen}" alt="card-image" class="pelicula">
                <h2>${item.nombre}</h2>
                <div class="card-text">
                    <div>
                        <p><strong>Director:</strong> ${item.director}</p>
                        <p><strong>Género:</strong> ${item.genero}</p>
                    </div>
                    <div>
                        <p><strong>Clasificación:</strong> ${item.clasificacion}</p>
                        <p><strong>Duración:</strong> ${item.duracion}</p>
                    </div>
                </div>
            
                <div class="card-buttons">
                    <a href="pelicula.html?peliculaId=${doc.id}" class="button primary">Ver Trailer</a>
                    <a href="reserva.html?peliculaId=${doc.id}" class="button secondary">Comprar Boleto</a>
                </div>
            </div>
            `;

        carta.innerHTML = html;
    });

});
