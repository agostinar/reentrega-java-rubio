// Clase Persona
class Persona {
    constructor(nombre, notas) {
        this.nombre = nombre;
        this.notas = notas;
    }

    calcularPromedio() {
        let suma = this.notas.reduce((total, nota) => total + nota, 0);
        return suma / this.notas.length;
    }

    encontrarNotaMaxima() {
        return Math.max(...this.notas);
    }

    filtrarNotasMayores(valor) {
        return this.notas.filter(nota => nota > valor);
    }
}

// Función para mostrar mensajes de error
function mostrarError(elemento, mensaje) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = mensaje;
    elemento.insertAdjacentElement("afterend", errorDiv);
}

// Función para limpiar mensajes de error
function limpiarErrores() {
    const errores = document.querySelectorAll(".error");
    errores.forEach(error => error.remove());
}

// Función para mostrar la sección de inicio de sesión y ocultar otras secciones
function mostrarInicioSesion() {
    document.getElementById("registro").style.display = "none";
    document.getElementById("calculadora").style.display = "none";
    document.getElementById("inicioSesionForm").style.display = "block";
}

// Función para mostrar la sección de la calculadora y ocultar otras secciones
function mostrarCalculadora() {
    document.getElementById("registro").style.display = "none";
    document.getElementById("inicioSesionForm").style.display = "none";
    document.getElementById("calculadora").style.display = "block";
}

// Función para manejar el envío del formulario de inicio de sesión
document.getElementById("inicioSesionForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const usuarioSesion = document.getElementById("usuarioSesion").value;
    const contrasenaSesion = document.getElementById("contrasenaSesion").value;

    // Validación de inicio de sesión
    if (usuarioSesion.trim() === "" || contrasenaSesion.trim() === "") {
        // Si el nombre de usuario o la contraseña están en blanco, muestra un mensaje de error
        alert("Por favor, ingrese tanto el nombre de usuario como la contraseña.");
        return; // Evita que el formulario se envíe si la validación falla
    }

    // Verificar las credenciales con los usuarios almacenados localmente
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioAutenticado = usuariosRegistrados.find(user => user.nombreUsuario === usuarioSesion && user.contrasena === contrasenaSesion);

    if (usuarioAutenticado) {
        // Autenticación exitosa
        alert("Inicio de sesión exitoso.");
        mostrarCalculadora();
    } else {
        // Autenticación fallida
        alert("Nombre de usuario o contraseña incorrectos.");
    }
});

// Función para manejar el envío del formulario de registro
document.getElementById("registroForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const nombreUsuarioRegistro = document.getElementById("nombreUsuarioRegistro").value;
    const contrasenaRegistro = document.getElementById("contrasena").value;

    // Validación de registro
    if (nombreUsuarioRegistro.trim() === "" || contrasenaRegistro.trim() === "") {
        // Si el nombre de usuario o la contraseña están en blanco, muestra un mensaje de error
        alert("Por favor, ingrese tanto el nombre de usuario como la contraseña.");
        return; // Evita que el formulario se envíe si la validación falla
    }

    // Verificar si el usuario ya está registrado
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioExistente = usuariosRegistrados.find(user => user.nombreUsuario === nombreUsuarioRegistro);

    if (usuarioExistente) {
        // Usuario ya registrado
        alert("Este nombre de usuario ya está registrado. Por favor, elija otro.");
    } else {
        // Registro exitoso
        const nuevoUsuario = { nombreUsuario: nombreUsuarioRegistro, contrasena: contrasenaRegistro };
        usuariosRegistrados.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        mostrarInicioSesion();
    }
});

// Función para manejar el clic en el botón de cerrar sesión
document.getElementById("cerrarSesionBtn").addEventListener("click", function () {
    document.getElementById("registro").style.display = "block"; // Muestra el formulario de registro
    document.getElementById("inicioSesionForm").style.display = "block"; // Muestra el formulario de inicio de sesión
    document.getElementById("calculadora").style.display = "none"; // Oculta la calculadora
});

