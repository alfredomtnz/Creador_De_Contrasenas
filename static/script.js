// Función para generar la contraseña
function generarPassword() {
    let longitud = document.getElementById("longitud").value;
    let mayusculas = document.getElementById("mayusculas").checked;
    let numeros = document.getElementById("numeros").checked;
    let simbolos = document.getElementById("simbolos").checked;

    let url = `/generar_password?longitud=${longitud}&mayusculas=${mayusculas}&numeros=${numeros}&simbolos=${simbolos}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Mostrar la contraseña generada
            let resultado = document.getElementById("resultado");
            resultado.classList.remove("show");
            setTimeout(() => {
                resultado.textContent = "Contraseña: " + data.password;
                resultado.classList.add("show");
                
                // Llamar a la función para evaluar la fuerza de la contraseña
                evaluarFuerza(data.password);
            }, 200);
        })
        .catch(error => console.error("Error:", error));
}

// Función para evaluar la fuerza de la contraseña
function evaluarFuerza(password) {
    let fuerza = calcularFuerza(password);
    let strengthBar = document.getElementById("strength-bar");
    let strengthText = document.getElementById("strength-text");

    // Configurar el medidor según la fuerza
    if (fuerza === "débil") {
        strengthBar.style.width = "33%";
        strengthBar.className = "weak";
        strengthText.textContent = "Fuerza: Débil";
    } else if (fuerza === "media") {
        strengthBar.style.width = "66%";
        strengthBar.className = "medium";
        strengthText.textContent = "Fuerza: Media";
    } else if (fuerza === "fuerte") {
        strengthBar.style.width = "100%";
        strengthBar.className = "strong";
        strengthText.textContent = "Fuerza: Fuerte";
    }
}

// Función para calcular la fuerza de la contraseña
function calcularFuerza(password) {
    let longitud = password.length;
    let mayusculas = /[A-Z]/.test(password);
    let numeros = /[0-9]/.test(password);
    let simbolos = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Criterios para determinar la fuerza
    if (longitud >= 12 && mayusculas && numeros && simbolos) {
        return "fuerte";
    } else if (longitud >= 8 && (mayusculas || numeros || simbolos)) {
        return "media";
    } else {
        return "débil";
    }
}
