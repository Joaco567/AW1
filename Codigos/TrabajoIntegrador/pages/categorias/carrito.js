function obtenerClaveCarrito() {
    const usuarioLogeado = sessionStorage.getItem("usuarioLogeado")
    
    if (usuarioLogeado === "true") {
        const usuario = JSON.parse(sessionStorage.getItem("usuarioActual"))
        if (usuario && usuario.email) {
            return `carrito_${usuario.email}`
        }
    }
    
    return 'carrito_invitado'
}

let carrito = JSON.parse(sessionStorage.getItem(obtenerClaveCarrito())) || []

function esperarElemento(id, callback, intentos = 0) {
    const elemento = document.getElementById(id)
    if (elemento) {
        callback(elemento)
    } else if (intentos < 50) {
        setTimeout(() => esperarElemento(id, callback, intentos + 1), 100)
    }
}

function crearModalVaciar() {
    const modalViejo = document.getElementById('modalVaciarCarritoDinamico')
    if (modalViejo) modalViejo.remove()

    const modalHTML = `
    <div class="modal fade" id="modalVaciarCarritoDinamico" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-danger">
              <i class="bi bi-exclamation-triangle-fill me-2"></i> Vaciar carrito
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <p class="fs-5">¿Estás seguro de que querés vaciar todo el carrito?</p>
          </div>
          <div class="modal-footer d-flex gap-2">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button id="btnConfirmarVaciarDinamico" class="btn btn-danger">Vaciar carrito</button>
          </div>
        </div>
      </div>
    </div>
    `
    
    document.body.insertAdjacentHTML('beforeend', modalHTML)
    
    const modalElement = document.getElementById('modalVaciarCarritoDinamico')
    const modal = new bootstrap.Modal(modalElement)
    
    document.getElementById('btnConfirmarVaciarDinamico').onclick = () => {
        carrito = []
        guardarCarrito()
        actualizarCarritoOffcanvas()
        modal.hide()
    }
    
    modalElement.addEventListener('hidden.bs.modal', () => {
        setTimeout(() => modalElement.remove(), 300)
    })
    
    modal.show()
}

function crearModalCompra() {
    const modalViejo = document.getElementById('modalCompraDinamico')
    if (modalViejo) modalViejo.remove()

    const modalHTML = `
    <div class="modal fade" id="modalCompraDinamico" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title text-success">
              <i class="bi bi-bag-heart-fill me-2"></i> ¡Gracias por tu compra!
            </h5>
            <button type="button" class="btn-close position-absolute end-0 top-0 m-3" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center pt-3">
            <p class="fs-5 mb-2">¡Tu compra fue realizada con éxito!</p>
            <p class="text-muted mb-1">Esperamos que disfrutes tus productos ❤️</p>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <a href="../pagina/home.html" class="btn btn-success px-4">Volver al Home</a>
          </div>
        </div>
      </div>
    </div>
    `
    
    document.body.insertAdjacentHTML('beforeend', modalHTML)
    
    const modalElement = document.getElementById('modalCompraDinamico')
    const modal = new bootstrap.Modal(modalElement)
    
    modalElement.addEventListener('hidden.bs.modal', () => {
        setTimeout(() => modalElement.remove(), 300)
    })
    
    modal.show()
}

window.agregarAlCarrito = function(producto, inputId, precio, imagen) {
    const cantidadInput = document.getElementById(inputId)
    const cantidad = parseInt(cantidadInput.value)

    if (cantidad <= 0 || isNaN(cantidad)) {
        alert('Por favor, ingrese una cantidad válida (mayor a 0)')
        return
    }
    
    const productoExistente = carrito.find(item => item.nombre === producto)
    
    if (productoExistente) {
        productoExistente.cantidad += cantidad
    } else {
        carrito.push({
            nombre: producto,
            cantidad: cantidad,
            precio: precio,
            imagen: imagen
        })
    }
    
    guardarCarrito()
    actualizarModal()
    actualizarCarritoOffcanvas()
    cantidadInput.value = ''
    
    esperarElemento('carritoModal', (modalElement) => {
        const modal = new bootstrap.Modal(modalElement)
        modal.show()
    })
}

window.cambiarCantidad = function(index, cambio) {
    carrito[index].cantidad += cambio
    
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1)
    }
    
    guardarCarrito()
    actualizarCarritoOffcanvas()
}

window.eliminarDelCarrito = function(index) {
    carrito.splice(index, 1)
    guardarCarrito()
    actualizarCarritoOffcanvas()
}

window.vaciarCarrito = function() {
    crearModalVaciar()
}

window.iniciarCompra = function() {
    esperarElemento('carritoOffcanvas', (offcanvasElement) => {
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement)
        
        if (offcanvas) {
            offcanvas.hide()
        }

        setTimeout(() => {
            carrito = []
            guardarCarrito()
            actualizarCarritoOffcanvas()
            
            setTimeout(() => {
                crearModalCompra()
            }, 300)
        }, 400)
    })
}

window.inicializarBotonIrCarrito = function() {
    esperarElemento('btnIrCarrito', (btnIrCarrito) => {
        const nuevoBoton = btnIrCarrito.cloneNode(true)
        btnIrCarrito.parentNode.replaceChild(nuevoBoton, btnIrCarrito)
        
        nuevoBoton.addEventListener('click', function (event) {
            event.preventDefault()

            esperarElemento('carritoModal', (modalElement) => {
                const modalInstance = bootstrap.Modal.getInstance(modalElement)

                if (modalInstance) {
                    modalInstance.hide()

                    setTimeout(() => {
                        esperarElemento('carritoOffcanvas', (offcanvasElement) => {
                            const offcanvas = new bootstrap.Offcanvas(offcanvasElement)
                            offcanvas.show()
                        })
                    }, 300)
                } else {
                    esperarElemento('carritoOffcanvas', (offcanvasElement) => {
                        const offcanvas = new bootstrap.Offcanvas(offcanvasElement)
                        offcanvas.show()
                    })
                }
            })
        })
    })
}

function actualizarModal() {
    esperarElemento('listaCarrito', (lista) => {
        lista.innerHTML = ''
        let total = 0
        
        carrito.forEach(item => {
            const li = document.createElement('li')
            li.className = 'mb-2'
            li.innerHTML = `<i class="bi bi-asterisk text-success"></i> ${item.nombre} - x${item.cantidad} <span class="text-muted">($${item.precio.toLocaleString()} c/u)</span>`
            lista.appendChild(li)
            total += item.precio * item.cantidad
        })
        
        esperarElemento('totalCarrito', (totalElement) => {
            totalElement.textContent = total.toLocaleString()
        })
    })
}

function actualizarCarritoOffcanvas() {
    esperarElemento('productosCarrito', (productosCarrito) => {
        const carritoVacio = document.querySelector('#carritoLista .alert')
        const carritoResumen = document.getElementById('carritoResumen')
        const btnVaciar = document.getElementById('btnVaciarCarrito')
        
        if (carrito.length === 0) {
            if (carritoVacio) carritoVacio.classList.remove('d-none')
            if (carritoResumen) carritoResumen.classList.add('d-none')
            if (btnVaciar) btnVaciar.classList.add('d-none')
            return
        }
        
        if (carritoVacio) carritoVacio.classList.add('d-none')
        if (carritoResumen) carritoResumen.classList.remove('d-none')
        if (btnVaciar) btnVaciar.classList.remove('d-none')
        
        productosCarrito.innerHTML = ''
        let total = 0
        
        carrito.forEach((item, index) => {
            const itemDiv = document.createElement('div')
            itemDiv.innerHTML = `
              <div class="d-flex align-items-center w-100 gap-3 pt-2 mb-3 ${index > 0 ? 'border-top' : ''}">
                <img src="${item.imagen}" alt="${item.nombre}" class="rounded" style="width:70px; height:90px; object-fit:cover;">
                <div class="flex-grow-1">
                  <h6 class="mb-1">${item.nombre}</h6>
                  <span class="text-muted small d-block mb-2">$${item.precio.toLocaleString()} c/u</span>
                  <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, -1)">
                      <i class="bi bi-dash"></i>
                    </button>
                    <span class="fw-bold">${item.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, 1)">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="text-end">
                  <button class="btn btn-sm btn-outline-danger mb-2" onclick="eliminarDelCarrito(${index})">
                    <i class="bi bi-trash"></i>
                  </button>
                  <div class="fw-bold">$${(item.precio * item.cantidad).toLocaleString()}</div>
                </div>
              </div>
            `
            productosCarrito.appendChild(itemDiv)
            total += item.precio * item.cantidad
        })
        
        const subtotalElement = document.getElementById('subtotalCarrito')
        const totalOffcanvasElement = document.getElementById('totalCarritoOffcanvas')
        
        if (subtotalElement) subtotalElement.textContent = total.toLocaleString()
        if (totalOffcanvasElement) totalOffcanvasElement.textContent = total.toLocaleString()
    })
}

function guardarCarrito() {
    sessionStorage.setItem(obtenerClaveCarrito(), JSON.stringify(carrito))
}

function inicializar() {
    actualizarCarritoOffcanvas()
    inicializarBotonIrCarrito()
}

if (window.modalesListos) {
    inicializar()
} else {
    window.addEventListener('modalesInsertados', inicializar, { once: true })
}

setTimeout(() => {
    if (!window.modalesListos) {
        inicializar()
    }
}, 1000)

