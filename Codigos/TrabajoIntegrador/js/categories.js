import { categoriesComponent, generarProductos } from "../components/categoriesComp.js"
import { filterComponent } from "../components/filterComp.js"
import { inicializarFiltros } from "./filter.js"

window.addEventListener('load', async () => {
    const categoriesContainer = document.querySelector('#categories-section')
    
    if (!categoriesContainer) return
    
    const pageTitle = document.title
    console.log('Página detectada:', pageTitle)
    
    if (pageTitle === 'Home' || pageTitle === 'Home - Kaburi Store') {
        categoriesContainer.innerHTML = categoriesComponent
    } 
    else if (pageTitle === 'Mangas' || pageTitle === 'Merchandising' || pageTitle === 'Menu') {
        categoriesContainer.innerHTML = `
            <div class="text-center my-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-3">Cargando productos...</p>
            </div>
        `
        
        const productos = await obtenerProductosParaFiltros(pageTitle)
        
        categoriesContainer.innerHTML = `
            ${filterComponent}
            <div id="products-container" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4 my-5 mx-2 justify-content-center"></div>
        `
        
        if (productos && productos.length > 0) {
            inicializarFiltros(productos)
        }
    }
    else {
        console.warn('Página no reconocida:', pageTitle)
    }
})

async function obtenerProductosParaFiltros(nombrePagina) {
    const { cargarProductosDesdeJSON } = await import("../components/categoriesComp.js")
    
    const mapeo = {
        'Mangas': 'mangas',
        'Merchandising': 'merch',
        'Menu': 'menu'
    }
    
    const categoria = mapeo[nombrePagina]
    if (categoria) {
        return await cargarProductosDesdeJSON(categoria)
    }
    return []
}