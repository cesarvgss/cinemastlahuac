const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

export const logInCheck = user => {
    if(user) {
        loggedInLinks.forEach(link => link.style.display = "block");
        loggedOutLinks.forEach(link => link.style.display = "none");
        console.log("logeado");


    } else {
        loggedOutLinks.forEach(link => link.style.display = "block");
        loggedInLinks.forEach(link => link.style.display = "none");
        console.log("signout")

    }
}