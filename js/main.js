// PRODUCTOS
const productos = [
    // Sudaderas
    {
        id: "sudadera-01",
        titulo: "Sudadera 01",
        imagen: "./img/sudaderas/01.jpg",
        categoria: {
            nombre: "Sudaderas",
            id: "sudaderas"
        },
        precio: 30
    },
    {
        id: "sudadera-02",
        titulo: "Sudadera 02",
        imagen: "./img/sudaderas/02.jpg",
        categoria: {
            nombre: "Sudaderas",
            id: "sudaderas"
        },
        precio: 30
    },
    {
        id: "sudadera-03",
        titulo: "Sudadera 03",
        imagen: "./img/sudaderas/03.jpg",
        categoria: {
            nombre: "Sudaderas",
            id: "sudaderas"
        },
        precio: 30
    },
    {
        id: "sudadera-04",
        titulo: "Sudadera 04",
        imagen: "./img/sudaderas/04.jpg",
        categoria: {
            nombre: "Sudaderas",
            id: "sudaderas"
        },
        precio: 30
    },
    {
        id: "sudadera-05",
        titulo: "Sudadera 05",
        imagen: "./img/sudaderas/05.jpg",
        categoria: {
            nombre: "Sudaderas",
            id: "sudaderas"
        },
        precio: 30
    },
    {
        id: "sudadera-06",
        titulo: "Sudadera 06",
        imagen: "./img/sudaderas/06.jpg",
        categoria: {
            nombre: "Sudaderas",
            id: "sudaderas"
        },
        precio: 30
    },
    {
        id: "sudadera-07",
        titulo: "Sudadera 07",
        imagen: "./img/sudaderas/07.jpg",
        categoria: {
            nombre: "Sudaderas",
            id: "sudaderas"
        },
        precio: 30
    },
    {
        id: "sudadera-08",
        titulo: "Sudadera 08",
        imagen: "./img/sudaderas/08.jpg",
        categoria: {
            nombre: "Sudaderas",
            id: "sudaderas"
        },
        precio: 30
    },
    // Camisetas
    {
        id: "camiseta-01",
        titulo: "Camiseta 01",
        imagen: "./img/camisetas/01.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 20
    },
    {
        id: "camiseta-02",
        titulo: "Camiseta 02",
        imagen: "./img/camisetas/02.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 20
    },
    {
        id: "camiseta-03",
        titulo: "Camiseta 03",
        imagen: "./img/camisetas/03.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 20
    },
    {
        id: "camiseta-04",
        titulo: "Camiseta 04",
        imagen: "./img/camisetas/04.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 20
    },
    // Accesorios
    {
        id: "accesorio-01",
        titulo: "Accesorio 01",
        imagen: "./img/accesorios/01.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 30
    },
    {
        id: "accesorio-02",
        titulo: "Accesorio 02",
        imagen: "./img/accesorios/02.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 15
    },
    {
        id: "accesorio-03",
        titulo: "Accesorio 03",
        imagen: "./img/accesorios/03.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 60
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos")
const botonCategoria = document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito")

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML =
            `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <div class="producto-texto">
                        <p class="producto-precio">${producto.precio}€</p>
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                    </div>
                    <div class="producto-boton">
                        <button class="producto-agregar" id="${producto.id}">Agregar</button>
                    </div>
                </div>
        `;

        contenedorProductos.append(div)
    })

    actualizarBotonesAgregar()
}

cargarProductos(productos)

botonCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonCategoria.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton)
        } else {
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos)
        }

    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

let productosEnCarrito

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS)
    actualizarNumerito()
} else {
    productosEnCarrito = []
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id

    const productoAgregado = productos.find(producto => producto.id === idBoton)

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++
    } else { //si no:
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado)
    }

    actualizarNumerito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito
}