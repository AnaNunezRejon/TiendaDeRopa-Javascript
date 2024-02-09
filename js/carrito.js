
let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar")

let botonesEliminar = document.querySelector("#carrito-producto-eliminar")

function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0){

    
        contenedorCarritoVacio.classList.add("disabled")//ocultar
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto =>{
            const div = document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
                    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>${producto.titulo}</small>
                        <h3>Sudadera1</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>${producto.cantidad}</small>
                        <p>1</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>${producto.precio}</small>
                        <p>30€</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `
            contenedorCarritoProductos.append(div)
        })
        
    }else{
    
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    }
    
    actualizarBotonesEliminar()
    actualizarTotal()

}

cargarProductosCarrito()


function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

    botonesEliminar.forEach(boton=>{
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id

    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
    productosEnCarrito.splice(index,1)
    cargarProductosCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click",vaciarCarrito)
function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito()

}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc,producto)=> acc +(producto.precio * producto.cantidad),0)
    total.innerText = `${totalCalculado}€`;
}


botonComprar.addEventListener("click",comprarCarrito)
function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")

}
