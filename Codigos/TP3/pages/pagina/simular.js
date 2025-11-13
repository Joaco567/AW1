function simularLogin(servicio) {
    if (!servicio) {
        alert('Error: No se especificó el servicio')
        return
    }

    const modalHTML = `
        <div class="modal fade" id="authModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center py-4">
                        <div class="spinner-border text-primary mb-3" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <h5>Conectando con ${servicio}</h5>
                        <p class="text-muted">Serás redirigido en un momento...</p>
                    </div>
                </div>
            </div>
        </div>
    `

    document.body.insertAdjacentHTML('beforeend', modalHTML)
    const modal = new bootstrap.Modal(document.getElementById('authModal'))
    modal.show()

    setTimeout(() => {
        localStorage.setItem("usuarioLogeado", "true")
        window.location.href = './home.html'
    }, 2000)
}

