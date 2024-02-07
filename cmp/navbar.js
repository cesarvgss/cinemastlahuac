    class UserNavbar extends HTMLElement {
        connectedCallback() {
            this.innerHTML = /* html */
                `
                <nav class="navbar navbar-expand-lg navbar-light my-nav-bg">
                <!-- Container wrapper -->
                <div class="container-fluid">
                    <!-- Toggle button -->
                    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                  </button>
        
                    <!-- Collapsible wrapper -->
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <!-- Navbar brand -->
                        <a class="navbar-brand mt-2 mt-lg-0" href="./index.html">
                            <img src="./img/logo.png" height="50" alt="Cinemas Tláhuac" loading="lazy" />
                        </a>
                        <!-- Left links -->
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="/cartelera.html">CARTELERA</a>
                            </li>
                            <li class="nav-item logged-out">
                                <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">INICIAR SESIÓN</a>
                            </li>
                            <li class="nav-item logged-out">
                                <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#signupModal">REGISTRARSE</a>
                            </li>
                            <li class="nav-item logged-in">
                                <a class="nav-link" href="#" id="logout">CERRAR SESIÓN</a>
                            </li>
                        </ul>
                        <!-- Left links -->
                    </div>
                    <!-- Collapsible wrapper -->
                </div>
                <!-- Container wrapper -->
            </nav>

            <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered text-center">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">
                        Iniciar Sesión
                    </h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-center">
                    <form id="login-form">
                        <div class="form-group p-2">
                            <input type="text" id="login-email" class="form-control" placeholder="Email" required>
                        </div>
                        <div class="form-group p-2">
                            <input type="password" id="login-password" class="form-control" placeholder="Contraseña" required>
                        </div>
                        <button type="submit" class="btn btn-secondary btn-block p-2">
                            Iniciar Sesión
                        </button>
                        <button type="button" class="btn btn-primary btn-block pt-2" id="googleLogin">
                            Login with Google
                        </button>
                        <a href="recuperar.html">¿Has olvidado tu contraseña?</a>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- REGISTRARSE -->

    <div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered text-center">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="signupModalLabel">
                        Regístrate
                    </h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-center">
                    <form id="signup-form">
                        <div class="form-group p-2">
                            <input type="text" id="nombre" class="form-control" placeholder="Nombre(s)" required>
                        </div>
                        <div class="form-group p-2">
                            <input type="text" id="apellidoP" class="form-control" placeholder="Apellido Paterno" required>
                        </div>
                        <div class="form-group p-2">
                            <input type="text" id="apellidoM" class="form-control" placeholder="Apellido Materno" required>
                        </div>
                        <div class="form-group p-2">
                            <input type="date" id="fechaNacimiento" class="form-control" placeholder="Fecha de Nacimiento" required>
                        </div>
                        <div class="form-group p-2">
                            <input type="text" id="direccion" class="form-control" placeholder="Dirección" required>
                        </div>
                        <div class="form-group p-2">
                            <input type="text" id="signup-email" class="form-control" placeholder="Email" required>
                        </div>
                        <div class="form-group p-2">
                            <input type="password" id="signup-password" class="form-control" placeholder="Contraseña" required>
                        </div>
                        <button type="submit" class="btn btn-primary p-2">
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
            `;
        }
    }

    customElements.define("user-navbar", UserNavbar);
