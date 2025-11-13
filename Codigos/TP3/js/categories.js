import { categoriesComponent, generarProductos } from "../components/categoriesComp.js"

window.addEventListener('load', () => {
    const categoriesContainer = document.querySelector('#categories-section')
    
    if (!categoriesContainer) return
    
    const pageTitle = document.title
    console.log('Página detectada:', pageTitle)
    
    // Si es Home, mostrar cards de categorías
    if (pageTitle === 'Home' || pageTitle === 'Home - Kaburi Store') {
        categoriesContainer.innerHTML = categoriesComponent
    } 
    // Si es una página de categoría, generar productos
    else if (pageTitle === 'Mangas' || pageTitle === 'Merchandising' || pageTitle === 'Menu') {
        categoriesContainer.innerHTML = generarProductos(pageTitle)
    }
    // Si no se reconoce la página
    else {
        console.warn('Página no reconocida:', pageTitle)
    }
})