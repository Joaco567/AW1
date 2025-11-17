if (!sessionStorage.getItem('visitaInicial')) {
    localStorage.setItem('usuarioLogeado', 'false')
    sessionStorage.setItem('visitaInicial', 'true')
    console.log('🔄 Estado de login reiniciado')
}

setTimeout(() => {
    window.location.href = './pages/pagina/home.html'
}, 250)