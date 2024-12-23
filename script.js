var swiper = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

var swiper = new Swiper(".mySwiper-2", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        520: {
            slidesPerView: 2
        },
        950: {
            slidesPerView: 3
        }
    }
});

// Carrito
const carrito = document.getElementById('carrito');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    document.querySelector('#productos'.addEventListener('click')), function(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            e.preventDefault();  // Evita que se recargue la página
            const elemento = e.target.closest('.producto');
            leerDatosElemento(elemento);
        }
    };

    // Eliminar producto del carrito
    carrito.addEventListener('click', eliminarElemento);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
           <img src="${elemento.imagen}" width=100> 
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row);

    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    productosCarrito.push(elemento);
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

function eliminarElemento(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar')) {
        const fila = e.target.parentElement.parentElement;
        const productoId = e.target.getAttribute('data-id');

        // Eliminar producto visualmente
        fila.remove();

        // Eliminar producto del carrito en localStorage
        let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);
        localStorage.setItem('carrito', JSON.stringify(productosCarrito));
    }
}

function vaciarCarrito() {
    // Vaciar carrito visualmente
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    // Vaciar carrito en localStorage
    localStorage.removeItem('carrito');
}

document.addEventListener('DOMContentLoaded', function() {
    let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    productosCarrito.forEach(producto => {
        insertarCarrito(producto);
    });
});


// Validación para campos completos

document.getElementById('formulario').addEventListener('submit', function(event) {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !correo || !mensaje) {
    event.preventDefault();
    alert('Por favor, completa todos los campos antes de enviar.');
    }
});
