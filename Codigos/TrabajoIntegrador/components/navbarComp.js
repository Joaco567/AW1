const navElements = [
    {title:'Home', link:'../pagina/home.html', page: 'home.html'},
    {title:'Mangas', link:'../categorias/mangas.html', page: 'mangas.html'},
    {title:'Merchandising', link:'../categorias/merch.html', page: 'merch.html'},
    {title:'Comida y Bebida', link:'../categorias/menu.html', page: 'menu.html'}
]

const estaLogeado = sessionStorage.getItem("usuarioLogeado") === "true"

let nombreUsuario = "Usuario"
if (estaLogeado) {
    const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"))
    if (usuarioActual) {
        nombreUsuario = `${usuarioActual.apellido}, ${usuarioActual.nombre}`
    }
}

let botonSesionHTML = ""

if (estaLogeado) {
  botonSesionHTML = `
    <div class="dropdown my-3">
      <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownUsuario" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-circle me-2"></i>${nombreUsuario}
      </button>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUsuario">
        <li>
          <a class="dropdown-item" href="#" id="btnDatosPersonales">
            <i class="bi bi-person-vcard me-2"></i>Datos Personales
          </a>
        </li>
        <li><hr class="dropdown-divider"></li>
        <li>
          <a class="dropdown-item text-danger" href="#" id="btnCerrarSesion">
            <i class="bi bi-box-arrow-left me-2"></i>Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
  `
} else {
  botonSesionHTML = `
    <div class="d-flex gap-3">
        <a href="../pagina/login.html" class="btn btn-outline-primary">
            <i class="bi bi-box-arrow-in-right"></i> Iniciar sesión
        </a>

        <a href="../pagina/signup.html" class="btn btn-outline-success">
            <i class="bi bi-person-plus"></i> Registrarse
        </a>
    </div>
  `
}

const paginaActual = window.location.pathname.split('/').pop();

export const navbarComponent = `
<nav class="navbar navbar-expand-lg bg-body-secondary">
  <div class="container-fluid">
    <a href="../pagina/home.html" class="navbar-brand">
      <img src="https://http2.mlstatic.com/storage/mshops-appearance-api/images/54/147826454/logo-2021060717121340300.png" 
        alt="Logo" 
        height="90">
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
      <span class="navbar-toggler-icon"></span>
    </button>

  <div class="collapse navbar-collapse" id="navbarCollapse">
    <ul class="navbar-nav">
        ${navElements.map(e => `
          <li class="nav-item my-1 mx-lg-1">
            <a href="${e.link}" class="nav-link ${paginaActual === e.page ? 'active' : ''}" ${paginaActual === e.page ? 'aria-current="page"' : ''}>${e.title}</a>
          </li>`).join('')}
    </ul>

    <div class="d-flex align-items-center gap-3 ms-lg-auto flex-wrap">
        <button id="theme-toggle" class="btn btn-outline-secondary my-3" title="Cambiar tema">
            <i class="bi bi-sun-fill"></i> Tema
        </button>

        <a href="#" class="btn btn-outline-info my-3" data-bs-toggle="offcanvas" data-bs-target="#carritoOffcanvas">
            <i class="bi bi-basket"></i> Carrito
        </a>

        ${botonSesionHTML}
    </div>
  </div>
</nav>
`