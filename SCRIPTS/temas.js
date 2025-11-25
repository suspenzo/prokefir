// Aplicar modo guardado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("tema");

    if (savedTheme === "oscuro") {
        document.documentElement.classList.add("oscuro");
    }
});

// Cambiar tema al presionar botón
document.getElementById("toggle-theme").addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("oscuro");

    // Guardar preferencia
    localStorage.setItem("tema", isDark ? "oscuro" : "claro");
});

