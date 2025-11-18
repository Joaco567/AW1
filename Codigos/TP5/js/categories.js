import { categoriesComponent, generarProductos } from "../components/categoriesComp.js"

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
        
        const productosHTML = await generarProductos(pageTitle)
        categoriesContainer.innerHTML = productosHTML
    }

    else {
        console.warn('Página no reconocida:', pageTitle)
    }
})