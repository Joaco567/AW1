import { modalcanvaComponent } from "../components/modalcanvaComp.js"

let modalcanvaContainer = document.querySelector('.carrito')

window.addEventListener('load', () => {
    if (modalcanvaContainer) {
        modalcanvaContainer.innerHTML = modalcanvaComponent
        
        if (typeof inicializarBotonIrCarrito === 'function') {
            inicializarBotonIrCarrito()
        }
    }
})