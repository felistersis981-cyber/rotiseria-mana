
const listaProductos = [
    { id: 1, nombre: "Vianda Mediterránea", precio: 4200, imagen: "recursos/vianda.jpg" },
    { id: 2, nombre: "Salmón Teriyaki", precio: 5800, imagen: "recursos/salmon.jpg" },
    { id: 3, nombre: "Pizza Muzzarella", precio: 3500, imagen: "recursos/pizza-home.jpg" }
];

let carrito = JSON.parse(localStorage.getItem('carrito_mana')) || [];


function agregarAlCarrito(idRecibido) {

    const productoEncontrado = listaProductos.find(p => p.id === idRecibido);
    
     carrito.push(productoEncontrado);
    
     actualizarMemoria();
}


function actualizarMemoria() {

    localStorage.setItem('carrito_mana', JSON.stringify(carrito));

    const contadorVisual = document.getElementById('cart-count');
    if (contadorVisual) {
        contadorVisual.innerText = carrito.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contadorVisual = document.getElementById('cart-count');
    if (contadorVisual) {
        contadorVisual.innerText = carrito.length;
    }
});