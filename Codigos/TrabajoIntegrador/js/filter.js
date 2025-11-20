let productosFiltrados = []
let productosOriginales = []

export function inicializarFiltros(productos) {
    productosOriginales = [...productos]
    productosFiltrados = [...productos]

    renderizarProductos()
    
    setTimeout(() => {
        configurarEventosFiltros()
        actualizarContador()
    }, 100)
}

function configurarEventosFiltros() {
    const selectOrden = document.getElementById('ordenProductos')
    if (selectOrden) {
        selectOrden.addEventListener('change', (e) => {
            ordenarProductos(e.target.value)
        })
    }
    
    const rangoMin = document.getElementById('precioMin')
    const rangoMax = document.getElementById('precioMax')
    
    if (rangoMin && rangoMax) {
        rangoMin.addEventListener('input', actualizarFiltroPrecios)
        rangoMax.addEventListener('input', actualizarFiltroPrecios)
    }
    
    const btnReset = document.getElementById('resetFiltros')
    if (btnReset) {
        btnReset.addEventListener('click', resetearFiltros)
    }
}

function ordenarProductos(criterio) {
    switch (criterio) {
        case 'precio-asc':
            productosFiltrados.sort((a, b) => a.precio - b.precio)
            break
        case 'precio-desc':
            productosFiltrados.sort((a, b) => b.precio - a.precio)
            break
        case 'nombre-asc':
            productosFiltrados.sort((a, b) => a.title.localeCompare(b.title))
            break
        case 'nombre-desc':
            productosFiltrados.sort((a, b) => b.title.localeCompare(a.title))
            break
        default:
            productosFiltrados = [...productosOriginales]
    }
    
    renderizarProductos()
}

function actualizarFiltroPrecios() {
    const min = parseInt(document.getElementById('precioMin').value) || 0
    const max = parseInt(document.getElementById('precioMax').value) || 999999
    
    document.getElementById('precioMinLabel').textContent = `$${min.toLocaleString()}`
    document.getElementById('precioMaxLabel').textContent = `$${max.toLocaleString()}`
    
    productosFiltrados = productosOriginales.filter(p => 
        p.precio >= min && p.precio <= max
    )
    
    const ordenActual = document.getElementById('ordenProductos')?.value
    if (ordenActual && ordenActual !== 'default') {
        ordenarProductos(ordenActual)
    } else {
        renderizarProductos()
    }
}

function resetearFiltros() {
    productosFiltrados = [...productosOriginales]
    
    const selectOrden = document.getElementById('ordenProductos')
    const precioMin = document.getElementById('precioMin')
    const precioMax = document.getElementById('precioMax')
    const precioMinLabel = document.getElementById('precioMinLabel')
    const precioMaxLabel = document.getElementById('precioMaxLabel')
    
    if (selectOrden) selectOrden.value = 'default'
    if (precioMin) precioMin.value = 0
    if (precioMax) precioMax.value = 20000
    if (precioMinLabel) precioMinLabel.textContent = '$0'
    if (precioMaxLabel) precioMaxLabel.textContent = '$20.000'
    
    renderizarProductos()
}

function renderizarProductos() {
    const container = document.querySelector('#products-container')
    if (!container) return
    
    container.innerHTML = productosFiltrados.map((producto) => `
        <div class="col">
            <div class="card card-product">
                <img src="${producto.image}" class="img-thumbnail" alt="${producto.title}">
                <div class="card-body">
                    <h5 class="card-title text-center fw-bold">${producto.title}</h5>
                    <p class="card-text lh-base text-center">${producto.description}</p>
                </div>

                <div class="card-footer">
                    <div class="row text-center">
                        <div class="col mt-2">
                            ${producto.descuento && producto.precioOriginal ? `
                                <p class="price price-rezero">$${producto.precioOriginal.toLocaleString()}</p>
                                <p class="price fw-bold">$${producto.precio.toLocaleString()} (-${Math.round((1 - producto.precio / producto.precioOriginal) * 100)}%) 🔥</p>
                            ` : `
                                <p class="price fw-bold">$${producto.precio.toLocaleString()}</p>
                            `}
                        </div>

                        <div class="col ${producto.descuento ? 'mt-5' : 'mt-1'}">
                            <input type="number" id="${producto.id}" class="form-control text-center" min="0" max="99" placeholder="0">
                        </div>
                    </div>

                    <div class="text-center my-2">
                        <button type="button" class="btn btn-outline-success" onclick="agregarAlCarrito('${producto.title.replace(/'/g, "\\'")}', '${producto.id}', ${producto.precio}, '${producto.image}')">
                            <i class="bi bi-cart-plus"></i> Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('')
    
    actualizarContador()
}

function actualizarContador() {
    const contador = document.getElementById('contadorResultados')
    if (contador) {
        contador.textContent = `${productosFiltrados.length} producto${productosFiltrados.length !== 1 ? 's' : ''} encontrado${productosFiltrados.length !== 1 ? 's' : ''}`
    }
}

export { productosFiltrados }