import { cargarProductosDesdeJSON } from './categoriesComp.js';

function generarCardProducto(producto) {
    return `
        <div class="col">
            <div class="card card-product h-100">
                <img src="${producto.image}" class="img-thumbnail" alt="${producto.title}">
                <div class="card-body">
                    <h5 class="card-title text-center fw-bold">${producto.title}</h5>
                    <p class="card-text lh-base text-center">${producto.description}</p>
                </div>

                <div class="card-footer">
                    <div class="row text-center">
                        <div class="col mt-2">
                            ${producto.descuento && producto.precioOriginal ? `
                                <p class="price price-rezero mb-1">$${producto.precioOriginal.toLocaleString()}</p>
                                <p class="price fw-bold mb-0">$${producto.precio.toLocaleString()} (-${Math.round((1 - producto.precio / producto.precioOriginal) * 100)}%) 🔥</p>
                            ` : `
                                <p class="price fw-bold mb-0">$${producto.precio.toLocaleString()}</p>
                            `}
                        </div>

                        <div class="col ${producto.descuento ? 'mt-4' : 'mt-1'}">
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
    `;
}

export async function generarProductosDestacados() {

    const [productosMangas, productosMerch, productosMenu] = await Promise.all([
        cargarProductosDesdeJSON('mangas'),
        cargarProductosDesdeJSON('merch'),
        cargarProductosDesdeJSON('menu')
    ]);

    return `
<div class="container-fluid">
    <!-- Header de Productos Destacados -->
    <div class="text-center mb-4 mt-5 py-2" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px;">
        <h3 class="text-white fw-bold">
            <i class="bi bi-star-fill me-2"></i>
            PRODUCTOS DESTACADOS
            <i class="bi bi-star-fill ms-2"></i>
        </h3>
    </div>

    <!-- Grid de secciones -->
    <div class="row row-cols-1 row-cols-lg-2 g-4 mb-5 mx-2">
        
        <!-- Sección Mangas -->
        <div class="col">
            <div class="card bg-dark border-warning h-100">
                <div class="card-header bg-warning text-dark text-center">
                    <h5 class="mb-0">
                        <i class="bi bi-book-fill me-2"></i>
                        MANGAS
                    </h5>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-1 row-cols-xl-2 row-cols-xxl-3 g-3 justify-content-center">
                        ${productosMangas.slice(0, 3).map(prod => generarCardProducto(prod)).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- Sección Merchandising -->
        <div class="col">
            <div id="merch-destacados" class="card bg-dark border-info h-100">
                <div class="card-header bg-info text-dark text-center">
                    <h5 class="mb-0">
                        <i class="bi bi-controller me-2"></i>
                        MERCHANDISING
                    </h5>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-1 row-cols-xl-2 row-cols-xxl-3 g-3 justify-content-center">
                        ${productosMerch.slice(0, 3).map(prod => generarCardProducto(prod)).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- Sección Comida y Bebida -->
        <div class="col-lg-12">
            <div class="card bg-dark border-success h-100">
                <div class="card-header bg-success text-dark text-center">
                    <h5 class="mb-0">
                        <i class="bi bi-cup-straw me-2"></i>
                        COMIDA Y BEBIDA
                    </h5>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 justify-content-center">
                        ${productosMenu.slice(0, 3).map(prod => generarCardProducto(prod)).join('')}
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
`;
}