// ---------- REGISTRO ----------
export function registrarUsuario(event) {
    event.preventDefault() // evita que se recargue el formulario

    const nombre = document.getElementById("txtNombre").value.trim()
    const apellido = document.getElementById("txtApellido").value.trim()
    const email = document.getElementById("txtEmail").value.trim()
    const password = document.getElementById("txtPassword").value.trim()
    const fecha = document.getElementById("txtFecha").value

    if (!nombre || !apellido || !email || !password || !fecha) {
        alert("Por favor, complete todos los campos.")
        return
    }

    // guardar usuario en localStorage
    const usuario = { nombre, apellido, email, password, fecha }
    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario))
    localStorage.setItem("usuarioLogeado", "true")

    window.location.href = "./home.html"
}

// ---------- LOGIN ----------
export function iniciarSesion(event) {
    event.preventDefault()

    const email = document.getElementById("txtEmail").value.trim()
    const password = document.getElementById("txtPassword").value.trim()

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"))

    if (!usuarioGuardado) {
        alert("No hay usuarios registrados. Por favor, registre una cuenta primero.")
        return
    }

    if (email === usuarioGuardado.email && password === usuarioGuardado.password) {
        localStorage.setItem("usuarioLogeado", "true")
        window.location.href = "./home.html"
    } else {
        alert("Email o contraseña incorrectos.")
    }
}
