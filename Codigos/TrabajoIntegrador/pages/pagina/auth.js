// ---------- REGISTRO ----------
export function registrarUsuario(event) {
    event.preventDefault()

    const nombre = document.getElementById("txtNombre").value.trim()
    const apellido = document.getElementById("txtApellido").value.trim()
    const email = document.getElementById("txtEmail").value.trim()
    const password = document.getElementById("txtPassword").value.trim()
    const fecha = document.getElementById("txtFecha").value

    if (!nombre || !apellido || !email || !password || !fecha) {
        alert("Por favor, complete todos los campos.")
        return
    }

    const usuarios = JSON.parse(sessionStorage.getItem("usuarios")) || []

    const emailExistente = usuarios.find(user => user.email === email)
    if (emailExistente) {
        alert("Este email ya está registrado. Por favor, usa otro.")
        return
    }

    const nuevoUsuario = { nombre, apellido, email, password, fecha }
    
    usuarios.push(nuevoUsuario)
    
    sessionStorage.setItem("usuarios", JSON.stringify(usuarios))
    
    sessionStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario))
    sessionStorage.setItem("usuarioLogeado", "true")

    window.location.href = "./home.html"
}

// ---------- LOGIN ----------
export function iniciarSesion(event) {
    event.preventDefault()

    const email = document.getElementById("txtEmail").value.trim()
    const password = document.getElementById("txtPassword").value.trim()

    const usuarios = JSON.parse(sessionStorage.getItem("usuarios")) || []

    if (usuarios.length === 0) {
        alert("No hay usuarios registrados. Por favor, registre una cuenta primero.")
        return
    }

    const usuarioEncontrado = usuarios.find(
        user => user.email === email && user.password === password
    )

    if (usuarioEncontrado) {
        sessionStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado))
        sessionStorage.setItem("usuarioLogeado", "true")
        window.location.href = "./home.html"
    } else {
        alert("Email o contraseña incorrectos.")
    }
}

// ---------- CERRAR SESIÓN ----------
export function cerrarSesion() {
    sessionStorage.removeItem("usuarioActual")
    sessionStorage.removeItem("usuarioLogeado")
    window.location.href = "./login.html"
}
