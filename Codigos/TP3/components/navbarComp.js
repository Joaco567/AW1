const navElements = [
    {title:'Home', link:'../pagina/home.html', page: 'home.html'},
    {title:'Mangas', link:'../categorias/mangas.html', page: 'mangas.html'},
    {title:'Merchandising', link:'../categorias/merch.html', page: 'merch.html'},
    {title:'Comida y Bebida', link:'../categorias/menu.html', page: 'menu.html'}
]

const estaLogeado = localStorage.getItem("usuarioLogeado") === "true"

let botonSesionHTML = ""

if (estaLogeado) {
  botonSesionHTML = `
    <button id="btnLogout" class="btn btn-outline-danger my-3">
      <i class="bi bi-box-arrow-left"></i> Deslogearse
    </button>
  `
} else {
  botonSesionHTML = `
    <a href="../pagina/login.html" class="btn btn-outline-primary my-3 me-2">
      <i class="bi bi-box-arrow-in-right"></i> Iniciar sesión
    </a>
    <a href="../pagina/signup.html" class="btn btn-outline-success my-3">
      <i class="bi bi-person-plus"></i> Registrarse
    </a>
  `
}

// Obtener la página actual
const paginaActual = window.location.pathname.split('/').pop()

export const navbarComponent = `
<nav class="navbar navbar-expand-lg bg-body-secondary">
  <div class="container-fluid">
    <a href="../pagina/home.html" class="navbar-brand">
      <img src="https://http2.mlstatic.com/storage/mshops-appearance-api/images/54/147826454/logo-2021060717121340300.png" 
        alt="Logo" 
        height="90">
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav">
        ${navElements.map(e => `
          <li class="nav-item my-1 mx-lg-1">
            <a href="${e.link}" class="nav-link ${paginaActual === e.page ? 'active' : ''}" ${paginaActual === e.page ? 'aria-current="page"' : ''}>${e.title}</a>
          </li>`).join('')}
      </ul>

      <a href="#" class="btn btn-outline-info ms-auto my-3 me-3" data-bs-toggle="offcanvas" data-bs-target="#carritoOffcanvas">
        <i class="bi bi-basket"></i> Carrito
      </a>

      ${botonSesionHTML}
    </div>
  </div>
</nav>
`