const categories = [
    {
        title: 'Artículos de Mangas',
        description: 'Descubrí historias épicas y aventuras inolvidables. Desde clásicos hasta los últimos estrenos.',
        image: 'https://th.bing.com/th/id/R.7f6e6073a754a8571d22b57dcf2d00a3?rik=%2bYRo4W5pb4x3%2fQ&pid=ImgRaw&r=0',
        link: '../categorias/mangas.html'
    },
    {
        title: 'Artículos de Merchandising',
        description: 'Figuras, peluches, tazas y más. Todo lo que necesitás para mostrar tu pasión por tus series favoritas.',
        image: 'https://images.nintendolife.com/c91e6b8af98a0/fangamer.900x.jpg',
        link: '../categorias/merch.html'
    },
    {
        title: 'Artículos de Comidas y Bebidas',
        description: 'Sabores directos de Japón y Corea. Snacks, ramen, bebidas y dulces que no encontrás en otros lados.',
        image: 'https://img.freepik.com/premium-vector/japanese-cuisine-menu-cover-design-japan-food_8071-35831.jpg?w=2000',
        link: '../categorias/menu.html'
    }
]

export async function cargarProductosDesdeJSON(categoria) {
    try {
        const response = await fetch(`../../data/${categoria}.json`)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const productos = await response.json()
        return productos
    } catch (error) {
        console.error(`Error cargando productos de ${categoria}:`, error)
        return []
    }
}

export let productosMangas = []
export let productosMerch = []
export let productosMenu = []

export async function inicializarProductos() {
    productosMangas = await cargarProductosDesdeJSON('mangas')
    productosMerch = await cargarProductosDesdeJSON('merch')
    productosMenu = await cargarProductosDesdeJSON('menu')
    
    console.log('Productos cargados:', {
        mangas: productosMangas.length,
        merch: productosMerch.length,
        menu: productosMenu.length
    })
}

const productosPorCategoria = {
    'Mangas': 'mangas',
    'Merchandising': 'merch',
    'Menu': 'menu'
}

/* Home: Cards de categorías */
export const categoriesComponent = `
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4 my-5 mx-2 justify-content-center">
    ${categories.map(cat => `
        <div class="col">
            <div class="card card-home">
                <img src="${cat.image}" class="img-thumbnail" alt="${cat.title}">
                <div class="card-body">
                    <h5 class="card-title text-center fw-bold">${cat.title}</h5>
                    <p class="card-text lh-base text-center">${cat.description}</p>
                </div>
                <div class="card-footer">
                    <div class="text-center my-2">
                        <a href="${cat.link}" class="btn btn-outline-warning my-3">
                            <i class="bi bi-bag-heart-fill mx-2"></i> Ir a comprar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('')}
</div>
`

/* Home: Categorias de Productos Destacados */

export async function generarProductos(nombrePagina) {
    const categoriaArchivo = productosPorCategoria[nombrePagina]
    
    if (!categoriaArchivo) {
        return '<p class="text-center text-muted my-5">Categoría no encontrada.</p>'
    }
    
    const productos = await cargarProductosDesdeJSON(categoriaArchivo)
    
    if (!productos || productos.length === 0) {
        return '<p class="text-center text-muted my-5">No se encontraron productos para esta categoría.</p>'
    }

    return `
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4 my-5 mx-2 justify-content-center">
        ${productos.map((producto, index) => `
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
        `).join('')}
    </div>
    `
}