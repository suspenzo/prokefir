let nombreUsuario = "";

// === NUEVA FUNCIÓN: Iniciar el chat con nombre ===
function iniciarChat() {
    const input = document.getElementById('InputNombre');
    nombreUsuario = input.value.trim();

    if (nombreUsuario === "") {
        alert("¡Por favor escribe tu nombre para entrar al chat! 😊");
        return;
    }

    // Ocultar pantalla de bienvenida
    document.getElementById('Bienvenida').style.display = 'none';
    
    // Mostrar el chat real
    document.getElementById('ChatPrincipal').style.display = 'block';
    
    // Poner el nombre arriba
    document.getElementById('NombreMostrado').innerHTML = 
        `<strong>¡Hola ${nombreUsuario}! 🥛🤍</strong><br>Estás chateando con el experto en kéfir`;

    // Activar el campo de mensaje y el botón
    document.getElementById('Mensaje').disabled = false;
    document.querySelector('#Entrada button').disabled = false;
    document.getElementById('Mensaje').focus();

    // Mensaje de bienvenida del bot
    const mensajes = document.getElementById('Mensajes');
    mensajes.innerHTML = `<div><strong>KéfirBot 🤍:</strong> ¡Hola ${nombreUsuario}! 😊<br>Bienvenido/a al mundo del kéfir de leche y de agua.<br>¿En qué te puedo ayudar hoy?</div>`;
    mensajes.scrollTop = mensajes.scrollHeight;
}

// === EL RESTO DEL CÓDIGO DEL BOT (todo lo que ya tenías) ===
function EnviaMensaje() {
    if (!nombreUsuario) return; // seguridad extra

    const nuevomensa = document.getElementById('Mensaje').value.trim();
    if (nuevomensa === "") return;

    const mensajes = document.getElementById('Mensajes');
    
    // Mensaje del usuario
    mensajes.innerHTML += `<div><strong>${nombreUsuario}:</strong> ${nuevomensa}</div>`;
    
    // Respuesta del bot
    const respuesta = respuestaBot(nuevomensa.toLowerCase(), nombreUsuario);
    setTimeout(() => {
        mensajes.innerHTML += `<div><strong>KéfirBot 🤍:</strong> ${respuesta}</div>`;
        mensajes.scrollTop = mensajes.scrollHeight;
    }, 600);

    document.getElementById('Mensaje').value = '';
    mensajes.scrollTop = mensajes.scrollHeight;
}

// Aquí pega TODA la función respuestaBot() que ya tenías antes (la larga con todas las respuestas de kéfir)
// No la vuelvo a copiar para no alargar, pero déjala exactamente igual que en mi mensaje anterior.

function respuestaBot(texto, usuario) {
    texto = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (texto.includes("hola") || texto.includes("buenas") || texto.includes("saludos")) {
        return `¡Hola de nuevo ${usuario}! 😊 ¿Qué duda sobre el kéfir tienes hoy?`;
    }
    // ... (todo el resto de respuestas que ya tenías)
    // (pega aquí todo el switch o los if que ya estaban)
    // Al final la respuesta por defecto:
    return `¡Buena pregunta ${usuario}! 😄 Sobre kéfir puedo ayudarte con beneficios, cómo hacerlo, dónde conseguir nódulos, recetas, segunda fermentación, etc.<br><br>¡Pregúntame lo que quieras!`;
}