// Cargar carrito desde localStorage al iniciar
let carrito = JSON.parse(localStorage.getItem('carrito')) || []

// Actualizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarCarritoOffcanvas()
    inicializarBotonIrCarrito()
})

function agregarAlCarrito(producto, inputId, precio, imagen) {
    const cantidadInput = document.getElementById(inputId)
    const cantidad = parseInt(cantidadInput.value)

    if (cantidad <= 0 || isNaN(cantidad)) {
        alert('Por favor, ingrese una cantidad válida (mayor a 0)')
        return
    }
    
    // Buscar si el producto ya existe en el carrito
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
    
    // Guardar en localStorage
    guardarCarrito()
    
    // Actualizar modal de confirmación
    actualizarModal()
    
    // Actualizar offcanvas del carrito
    actualizarCarritoOffcanvas()
    
    // Limpiar input
    cantidadInput.value = ''
    
    // Mostrar modal de confirmación
    const modal = new bootstrap.Modal(document.getElementById('carritoModal'))
    modal.show()
}

function actualizarModal() {
    const lista = document.getElementById('listaCarrito')
    if (!lista) return
    
    lista.innerHTML = ''
    
    let total = 0
    
    carrito.forEach(item => {
        const li = document.createElement('li')
        li.className = 'mb-2'
        li.innerHTML = `<i class="bi bi-asterisk text-success"></i> ${item.nombre} - x${item.cantidad} <span class="text-muted">($${item.precio.toLocaleString()} c/u)</span>`
        lista.appendChild(li)
        
        total += item.precio * item.cantidad
    })
    
    const totalElement = document.getElementById('totalCarrito')
    if (totalElement) {
        totalElement.textContent = total.toLocaleString()
    }

}

function actualizarCarritoOffcanvas() {
    const carritoVacio = document.querySelector('#carritoLista .alert')
    const carritoResumen = document.getElementById('carritoResumen')
    const productosCarrito = document.getElementById('productosCarrito')
    const btnVaciar = document.getElementById('btnVaciarCarrito')
    
    if (!productosCarrito) return
    
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
}

function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio
    
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1)
    }
    
    guardarCarrito()
    actualizarCarritoOffcanvas()
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1)
    guardarCarrito()
    actualizarCarritoOffcanvas()
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de que querés vaciar el carrito?')) {
        carrito = []
        guardarCarrito()
        actualizarCarritoOffcanvas()
    }
}

function iniciarCompra() {
    const offcanvasElement = document.getElementById('carritoOffcanvas')
    if (!offcanvasElement) return
    
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement)
    if (offcanvasInstance) {
        offcanvasInstance.hide()
    }
    
    offcanvasElement.addEventListener('hidden.bs.offcanvas', function mostrarGracias() {
        alert('¡Muchas gracias por tu compra!')
        
        carrito = []
        guardarCarrito()
        actualizarCarritoOffcanvas()
        
        offcanvasElement.removeEventListener('hidden.bs.offcanvas', mostrarGracias)
    })
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function inicializarBotonIrCarrito() {
    const btnIrCarrito = document.getElementById('btnIrCarrito')
    if (!btnIrCarrito) return
    
    btnIrCarrito.addEventListener('click', function (event) {
        event.preventDefault()

        const modalElement = document.getElementById('carritoModal')
        const modalInstance = bootstrap.Modal.getInstance(modalElement)

        if (modalInstance) {
            modalInstance.hide()

            modalElement.addEventListener('hidden.bs.modal', function abrirOffcanvas() {
                const offcanvas = new bootstrap.Offcanvas(document.getElementById('carritoOffcanvas'))
                offcanvas.show()

                modalElement.removeEventListener('hidden.bs.modal', abrirOffcanvas)
            })
        } else {
            const offcanvas = new bootstrap.Offcanvas(document.getElementById('carritoOffcanvas'))
            offcanvas.show()
        }
    })
}

