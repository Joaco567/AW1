import { generarProductosDestacados } from '../components/featuredproductsComp.js'

window.addEventListener('load', async () => {
    const destacadosContainer = document.querySelector('#destacados-section')
    
    if (!destacadosContainer) return
    
    const usuarioLogeado = sessionStorage.getItem('usuarioLogeado')
    
    if (usuarioLogeado !== 'true') {
        // Si NO está logeado, mostrar mensaje invitando a iniciar sesión
        destacadosContainer.innerHTML = `
            <div class="container-fluid">
                <div class="text-center mb-4 mt-5 py-2" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px;">
                    <h3 class="text-white fw-bold">
                        <i class="bi bi-star-fill me-2"></i>
                        PRODUCTOS DESTACADOS
                        <i class="bi bi-star-fill ms-2"></i>
                    </h3>
                </div>
                
                <div class="card bg-dark border-primary mx-2 mb-5">
                    <div class="card-body text-center py-5">
                        <i class="bi bi-lock-fill text-primary" style="font-size: 4rem;"></i>
                        <h4 class="mt-4 mb-3">Inicia sesión para ver productos destacados</h4>
                        <p class="text-muted mb-4">
                            Descubrí ofertas exclusivas, nuevos lanzamientos y productos recomendados especialmente para vos.
                        </p>
                        <div class="d-flex gap-3 justify-content-center">
                            <a href="../pagina/login.html" class="btn btn-primary btn-lg">
                                <i class="bi bi-box-arrow-in-right me-2"></i>
                                Iniciar Sesión
                            </a>
                            <a href="../pagina/signup.html" class="btn btn-outline-primary btn-lg">
                                <i class="bi bi-person-plus me-2"></i>
                                Registrarse
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `
        return
    }
    
    // Si está logeado, cargar productos destacados
    destacadosContainer.innerHTML = `
        <div class="text-center my-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3">Cargando productos destacados...</p>
        </div>
    `
    
    try {
        // Generar y mostrar productos destacados
        const productosHTML = await generarProductosDestacados()
        destacadosContainer.innerHTML = productosHTML
    } catch (error) {
        console.error('Error cargando productos destacados:', error)
        destacadosContainer.innerHTML = `
            <div class="alert alert-danger text-center" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                Error al cargar productos destacados. Por favor, recarga la página.
            </div>
        `
    }
})