// script.js
let stars = document.getElementsByClassName("star");
let output = document.getElementById("output");
let currentRating = 0;

function gfg(n) {
    remove();
    currentRating = n;

    let cls = "";
    if (n == 1) cls = "one";
    else if (n == 2) cls = "two";
    else if (n == 3) cls = "three";
    else if (n == 4) cls = "four";
    else cls = "five";

    for (let i = 0; i < n; i++) {
        stars[i].textContent = "★";
        stars[i].className = "star filled " + cls;
    }
    for (let i = n; i < 5; i++) {
        stars[i].textContent = "☆";
        stars[i].className = "star";
    }

    output.innerText = "Rating is: " + n + "/5";
}

function remove() {
    for (let i = 0; i < 5; i++) {
        stars[i].textContent = "☆";
        stars[i].className = "star";
    }
}

function submitRating() {
    if (currentRating === 0) {
        alert("Por favor, selecciona una calificación antes de enviar");
        return;
    }

    const messages = {
        1: "Lamentamos que no te haya gustado",
        2: "Gracias por tu opinión. ¡Trabajaremos para mejorar!",
        3: "¡Gracias! Aceptamos el desafío de llegar a más estrellas",
        4: "¡Genial! Casi perfecto, gracias por tu apoyo",
        5: "¡INCREÍBLE! Gracias por las 5 estrellas, nos haces muy felices"
    };

    output.innerHTML = `
        <strong>${messages[currentRating]}</strong><br><br>
        <span style="font-size: 2.2rem;">Gracias por tus ${"★".repeat(currentRating)}${"☆".repeat(5-currentRating)}</span>
    `;

    // Desactivar estrellas
    for (let star of stars) {
        star.style.pointerEvents = "none";
    }

    // Cambiar botones
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("closeBtn").style.display = "inline-block";
}

function closeRating() {
    location.reload();   // Recarga la página (o puedes ocultar el widget si lo prefieres)
}

// Efecto hover (previsualización)
for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener("mouseover", function () {
        if (currentRating !== 0) return;
        remove();
        let n = i + 1;
        let cls = n === 1 ? "one" : n === 2 ? "two" : n === 3 ? "three" : n === 4 ? "four" : "five";
        for (let j = 0; j < n; j++) {
            stars[j].textContent = "★";
            stars[j].className = "star filled " + cls;
        }
    });

    stars[i].addEventListener("mouseout", function () {
        if (currentRating !== 0) return;
        remove();
        if (currentRating > 0) gfg(currentRating);
    });
}