import {
  saveDocument,
  getDocument,
  updateDocument,
  auth

} from './init.js';

import {
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

import {
  logInCheck
} from './loginCheck.js'

let userGmail

onAuthStateChanged(auth, async (user) => {
  console.log(user)

  if (user) {
      logInCheck(user);
      userGmail = user.email;
      console.log(userGmail);
  } else {
    console.log('Usuario no logeado, ingresar a su cuenta')
  }

})

var urlParams = ""
var funcionId = ""
let editStatus = false;


// Extract the query parameter value
urlParams = new URLSearchParams(window.location.search);
funcionId = urlParams.get('funcionId');

// Call the getDocument function
const docRef = await getDocument('Funcion', funcionId);
var movieAsientos = docRef.data().numeroAsientos;

var seatId = 0;
const container = document.querySelector('.seats');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
var fechaFuncion = document.getElementById("fechaFuncion");
var salaFuncion = document.getElementById("salaFuncion");
const contenedorQR = document.getElementById('contenedorQR');
const asientos = document.querySelectorAll('.seat');
let secondClassValuesArray

// Generar fecha
const date = new Date();
const options = { month: '2-digit', day: '2-digit', year: 'numeric'};
const localDate = date.toLocaleDateString('en-GB', options).replace(/\//g, '/');
console.log(localDate);

// Generar folio
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

// Check if the random string exists in localStorage
let randomString = localStorage.getItem('randomString');

if (!randomString) {
  // Generate a new random string
  randomString = generateRandomString(10);
  localStorage.setItem('randomString', randomString);
}

console.log(randomString);

// LLenar los asientos
// En este código, usamos document.getElementsByClassName("asiento disponible") para recuperar todos los elementos que tienen las clases "asiento" y "disponible".
// Luego, iteramos sobre cada elemento usando un bucle for. Dentro del ciclo, recuperamos el elemento actual usando elementos[i].
//  Accedemos a la propiedad classList del elemento para manipular sus clases. Usamos item(1) para obtener la segunda clase en la lista de clases.
//  Finalmente, usamos el método replace() en classList para reemplazar la segunda clase con "seleccionado" usando element.classList.replace(element.classList.item(1), "selected").
  
console.log(movieAsientos); //Arreglo de la base de datos

function valoresAsientosDeBD(movieAsientos) {

  for (var i = 0; i < asientos.length; i++) {
    var seat = asientos[i];
    var classToRemove = seat.classList.item(1);

    if (movieAsientos[i] == "selected"){
      seat.classList.replace(classToRemove, "sold");
    } else {
      seat.classList.replace(classToRemove, movieAsientos[i]);
    }

  }
  
}

valoresAsientosDeBD(movieAsientos);

let ticketPrice = +movieSelect.value;
var totalPrices ="";
var totalAsientos =0;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  seatId = seatsIndex;

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  secondClassValuesArray = AsientosDisponibilidad();
  console.log(secondClassValuesArray);

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  totalAsientos = count.textContent;

  total.innerText = selectedSeatsCount * ticketPrice;
  totalPrices = total.textContent;

}


// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = 50;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => { //invocar metodo al hacer click en un elemento dentro de container
  const target = e.target;  //crear una variable invocar el elemento selecionado
  if (target.classList.contains('seat') && !target.classList.contains('occupied')) { //si el elemento contiene la clase seat y la clase es diferente a occupied
                                                        //procede con el siguiente procedimiento
      const classes = target.classList;                 //se crea una variable para almacenar la clase del elemento selecionado
      const currentClass = classes.item(1);             //se obtiene la clase ubicada en el index 1 (segunda clase)

      if (currentClass === 'disponible') {            // si la clase actual es disponible se cambia a selecionado
        classes.replace('disponible', 'selected');
      } 
      
      else if (currentClass === 'selected') {       // si la clase actual es selecionado se cambia a disponible
        classes.replace('selected', 'disponible');
      }

    updateSelectedCount();
    seatId;
    console.log(seatId);
    //establecer asientos selecionados
    asientoSelecionado.innerHTML = seatId;
    
  }
});

// intial count and total
updateSelectedCount();

//DISPLAY MOVIE TICKET
console.log(movieName);
console.log(totalPrices);
console.log(seatId);
console.log(movieDesc);


// Access the data in the document
var movieName = docRef.data().fk_idPelicula;
var movieDesc = docRef.data().descripcion;
var movieHorario = docRef.data().fk_idHorario;
var movieSala = docRef.data().fk_idSala;
var movieSala = docRef.data().fk_idSala;


function AsientosDisponibilidad() {

  const secondClassValues = [];

  for (let i = 0; i < asientos.length; i++) {
    const classes = asientos[i].classList;
    const secondClass = classes.item(1);
    secondClassValues.push(secondClass);
  }

  return secondClassValues;
}


// Obtain the corresponding tags via ID
document.getElementById("movieName").innerHTML = movieName;
document.getElementById("movieDesc").innerHTML = movieDesc;
document.getElementById("horarioFuncion").innerHTML = movieHorario;
salaFuncion.innerHTML = movieSala;


document.getElementById("factorizar").addEventListener('click', (e) => {
  e.preventDefault()
  modal.style.display = "block";

  movieName
  movieDesc 

  //MOVIE TICKET INFORMATION SAVED

  if (!editStatus) {
      saveDocument('Boleto', {
          fk_idFuncion: movieName,
          precio: totalPrices,
          cantidadBoletos: totalAsientos,
          funcionHorario: movieHorario,
          funcionFecha: localDate,
          funcionSala: movieSala,
          idAsiento: seatId,
          descripcion: randomString,
          pagado: false
      });

      updateDocument(
        'Funcion',
        funcionId, {
          numeroAsientos: secondClassValuesArray
        });

      const Pago_Boleto = `Clave De Transferencia: 0723206076552292709
      Precio total: ${totalPrices}
      Folio: ${randomString}`;

      //QR INFORMATION
      new QRCode(contenedorQR, Pago_Boleto);
      console.log(Pago_Boleto);

      //Send Email
      Email.send({
        Host : "smtp.elasticemail.com",
        Username : "cinemastlahuacofmx@gmail.com",
        Password : "513ABAF1AD22793FCB7D067C33DABBE39164",
        To : userGmail,
        From : "cinemastlahuacofmx@gmail.com",
        Subject : "Informacion del Pago de cuenta Interbancaria",
        Body : Pago_Boleto
  
        }).then(
        message => alert("Se ha enviado un correo con la informacion Interbancaria con sus datos correspondientes")
      );
  } 
  
  else {
     console.log("Error al almacenar")
  }

});

const modal = document.getElementById("modal");
const closeModalBtn = document.getElementsByClassName("close")[0];
const confirmBtn = document.getElementById("confirmBtn");

closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
  window.location.href = "index.html";
});

window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.location.href = "index.html";
  }
});

// Handle confirm button click
confirmBtn.addEventListener("click", function() {
  // Perform desired action or trigger further processing
  console.log("Confirmed");
  modal.style.display = "none";
  window.location.href = "index.html";
});

