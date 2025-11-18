import { navbarComponent } from "../components/navbarComp.js"

let navContainer = document.querySelector("header")

window.addEventListener("load", () => {
  navContainer.innerHTML = navbarComponent

  const btnLogout = document.getElementById("btnLogout")
  if (btnLogout) {
      btnLogout.addEventListener("click", () => {
          sessionStorage.removeItem("usuarioLogeado")
          window.location.href = "../pagina/login.html"
      })
  }
})
