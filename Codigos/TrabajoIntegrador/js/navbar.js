import { navbarComponent } from "../components/navbarComp.js";
import { crearModalDatosPersonales  } from "../components/modalcanvaComp.js";
import { inicializarToggleTema } from "./theme.js";

let navContainer = document.querySelector("header");

window.addEventListener("load", () => {
  navContainer.innerHTML = navbarComponent;

  const btnDatosPersonales = document.getElementById("btnDatosPersonales");
  if (btnDatosPersonales) {
    btnDatosPersonales.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarDatosPersonales();
    });
  }

  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
    });
  }

  inicializarToggleTema();
});

function mostrarDatosPersonales() {
  const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
  
  if (!usuarioActual) {
    alert("No se encontraron datos del usuario");
    return;
  }

  crearModalDatosPersonales(usuarioActual);
}

function cerrarSesion() {
  sessionStorage.removeItem("usuarioActual");
  sessionStorage.removeItem("usuarioLogeado");
  window.location.href = "../pagina/login.html";
}
