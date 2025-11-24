// Productos con los precios REALES que muestras en tu HTML
const productos = [
    { id: 1, nombre: "Yogurt de Kéfir 500ml", precio: 20 },
    { id: 2, nombre: "Yogurt de Kéfir 1Lt.", precio: 35 },
    { id: 3, nombre: "Granos de Kéfir Pack 6 bottellas de 500ml", precio: 100 },  // como dice tu HTML
    { id: 4, nombre: "Granos de Kéfir", precio: 80 }                           // como dice tu HTML
];

let carrito = [];

// Elementos del DOM
const botonesAgregar = document.querySelectorAll('.card-producto button');
const contadorCarrito = document.getElementById('contador-carrito');
const verCarritoBtn = document.getElementById('ver-carrito');

// 1. Añadir funcionalidad a TODOS los botones "Añadir al carrito" que ya tienes
botonesAgregar.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const id = index + 1;                    // porque tus productos van en orden 1,2,3,4
        agregarAlCarrito(id);
    });
});

// 2. Función para agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarContador();
}

// 3. Actualizar el número del carrito en el header
function actualizarContador() {
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorCarrito.textContent = total;
}

// 4. Mostrar modal (usa el que ya tenías o uno básico si no existe)
function mostrarCarrito() {
    let mensaje = "¡Hola! Quiero pedir:\n\n";
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += `${item.nombre} × ${item.cantidad} = Bs ${subtotal}\n`;
    });

    mensaje += `\nTOTAL: Bs ${total}`;

    // CAMBIA AQUÍ TU NÚMERO REAL (formato Bolivia: 591XXXXXXX)
    const numeroWhatsApp = "59171234567";   // ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←
    
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    // Vaciamos el carrito después de enviar
    carrito = [];
    actualizarContador();
}

// 5. Evento del botón grande del header
verCarritoBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
    } else {
        mostrarCarrito();
    }
});

// Inicializar contador
actualizarContador();