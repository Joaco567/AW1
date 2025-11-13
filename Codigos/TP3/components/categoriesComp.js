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

const productosMangas = [
    {
        title: 'Re:Zero - Empezar de cero en un mundo diferente Vol. 1',
        description: 'Morir una y otra vez para salvar a quienes amas. Subaru enfrenta un destino cruel en un mundo de magia.',
        image: 'https://cdnx.jumpseller.com/honnoto-store/image/18079011/re_zero_1.jpg?1661550447',
        precio: 3999,
        precioOriginal: 7999,
        descuento: true,
        id: 'cantidad1'
    },
    {
        title: 'Jojo\'s Bizarre Adventure P.1 Vol.1',
        description: 'La legendaria saga de los Joestar comienza. Acompañá a Jonathan en su épica batalla contra Dio Brando.',
        image: 'https://th.bing.com/th/id/R.fc09c2518bbb9fd87d38350a4eb75699?rik=DRianP8%2fQfM1%2fQ&riu=http%3a%2f%2fomegacenter.es%2fblog%2fwp-content%2fuploads%2f2017%2f06%2fjojophantomblood01definitivo.jpg&ehk=YRBaAgoWAAHfWvnrqvGH0Zp7K5yJ4t6CGRLvqZaNjqw%3d&risl=&pid=ImgRaw&r=0',
        precio: 7999,
        descuento: false,
        id: 'cantidad2'
    },
    {
        title: 'Dr. Stone Vol. 1',
        description: 'La humanidad petrificada por milenios. Senku despierta para reconstruir la civilización desde cero con ciencia.',
        image: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974702619/dr-stone-vol-1-9781974702619_hr.jpg',
        precio: 8500,
        descuento: false,
        id: 'cantidad3'
    },
    {
        title: 'Neon Genesis Evangelion Vol. 1',
        description: 'Shinji Ikari debe pilotar un Eva para salvar a la humanidad de misteriosos seres llamados Ángeles.',
        image: 'https://th.bing.com/th/id/R.618279f0a8ec04603b4efebdf6c1e3c9?rik=kxJbklIaai1oSg&riu=http%3a%2f%2facdn.mitiendanube.com%2fstores%2f002%2f087%2f383%2fproducts%2fevangeliondeluxe_01-5685dab048cb0db66616989614055403-640-0.jpg&ehk=s6tVdU8qA5rCb8x17pUTSpHvSY4KR4U9FLmeTC3%2fnk0%3d&risl=&pid=ImgRaw&r=0',
        precio: 8500,
        descuento: false,
        id: 'cantidad4'
    }
]

const productosMerch = [
    {
        title: 'Llavero Peluche Marvel Spider-Man',
        description: 'El trepa muros favorito de todos en formato peluche. Perfecto para llevar a tu héroe a todos lados.',
        image: 'https://th.bing.com/th/id/R.6a6f0e0bf31eb8f259e45635811f895a?rik=w1SwcX9M%2f5KOIQ&pid=ImgRaw&r=0',
        precio: 5299,
        descuento: false,
        id: 'cantidad1'
    },
    {
        title: 'Taza / Tazón Lilo & Stitch - Stitch',
        description: 'Ohana significa familia. Disfrutá tu bebida favorita con el alien más adorable del universo.',
        image: 'https://acdn-us.mitiendanube.com/stores/001/989/991/products/76ab90c8-49ae-40d6-a387-f27ca383dd9f-removebg-preview-fd15378d793df7dfa517398235153379-1024-1024.webp',
        precio: 11999,
        descuento: false,
        id: 'cantidad2'
    },
    {
        title: 'Cuadro Diorama Super Mario Bros',
        description: 'Revive la nostalgia de los 8 bits. Una obra de arte pixelada para decorar tu espacio gamer.',
        image: 'https://acdn-us.mitiendanube.com/stores/001/989/991/products/mario-bros-1-2-y-3-1-62ee97ddb97a7eccb217459581942065-1024-1024.webp',
        precio: 14999,
        descuento: false,
        id: 'cantidad3'
    }
]
const productosMenu = [
        {
        title: 'Lata Gaseosa Fanta de Chucky Sabor Chucky Punch 350ml',
        description: 'Edición limitada de terror. El sabor que te hará gritar... ¡de lo delicioso que está!',
        image: 'https://www.coca-cola.com/content/dam/onexp/br/pt/offerings/fanta-halloween-25/offering/prelaunch/productochuckydesk.png',
        precio: 3250,
        descuento: false,
        id: 'cantidad1'
    },
    {
        title: 'Lata Gaseosa Fanta de Freddy Fazbear Sabor Naranja 350ml',
        description: 'Five nights, un sabor. La gaseosa oficial de Freddy\'s Pizza. Edición coleccionable.',
        image: 'https://www.coca-cola.com/content/dam/onexp/br/pt/offerings/fanta-halloween-25/offering/prelaunch/naranjad.png',
        precio: 3250,
        descuento: false,
        id: 'cantidad2'
    },
    {
        title: 'Galletas Pokémon Sabor Chocolate',
        description: 'Atrápalos a todos... y comételos. Galletas con diseños de tus Pokémon favoritos.',
        image: 'https://acdn-us.mitiendanube.com/stores/001/989/991/products/pokemon_galletitas_rellenas_core-a87ee17305c708a9df17570179235757-1024-1024.webp',
        precio: 4470,
        descuento: false,
        id: 'cantidad3'
    },
        {
        title: 'Pocky Sabor Frambuesa y Arandano',
        description: 'El snack japonés que conquista el mundo. Palitos crocantes cubiertos con crema de frutas del bosque.',
        image: 'https://acdn-us.mitiendanube.com/stores/001/989/991/products/ara-cutting-600x600-jpg-removebg-preview-46dba60e577a20e26e17236673784999-1024-1024.webp',
        precio: 5630,
        descuento: false,
        id: 'cantidad4'
    },
    {
        title: 'Ramen / Fideos Instantáneos Pack Buldak Sabor Pollo Super Picante 140g',
        description: 'El desafío picante de Corea. ¿Te animás a probar los fideos más infernales del mundo? 🔥',
        image: 'https://acdn-us.mitiendanube.com/stores/001/989/991/products/rojo-a15365563c57950756172417223-6f7bddf9a2348e674917256605314463-1024-1024.webp',
        precio: 5120,
        descuento: false,
        id: 'cantidad5'
    }
]

// Mapa de productos por página
const productosPorPagina = {
    'Mangas': productosMangas,
    'Merchandising': productosMerch,
    'Menu': productosMenu
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

/* Generador de productos para páginas de categorías */
export function generarProductos(nombrePagina) {
    const productos = productosPorPagina[nombrePagina]
    
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