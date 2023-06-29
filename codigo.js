let productos = [

    { id: 10, nombre: "Galleta Oreo", categoria: "DULCES", precioUnitario: 5.90, linkImagen: "oreoVainilla.png" },
    { id: 15, nombre: "Bombones", categoria: "DULCES", precioUnitario: 8.50, linkImagen: "bombonesRellenos.png" },
    { id: 20, nombre: "Doritos salados", categoria: "SALADOS", precioUnitario: 3.80, linkImagen: "doritos.png" },
    { id: 25, nombre: "Inka Chips salados", categoria: "SALADOS", precioUnitario: 2.50, linkImagen: "inkaChips.png" },
    { id: 30, nombre: "Almendras", categoria: "SALUDABLES", precioUnitario: 10.50, linkImagen: "almendras.png" },
    { id: 35, nombre: "Nueces peladas", categoria: "SALUDABLES", precioUnitario: 12.80, linkImagen: "nuecesPeladas.png" },

]


creacionTarjetaProductos(productos)





/*************************************************** CREACION DE PRODUCTOS ********************** */

let contenedorProductos = document.getElementById("contenedorProductos")

function creacionTarjetaProductos(arrayProductos) {
    let contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""

    arrayProductos.forEach(cadaProducto => {

        let elementoCreado = document.createElement("div")
        elementoCreado.innerHTML = `<h2>${cadaProducto.nombre}</h2>
        <img class="imagenesCatalogo" src="./imagenes/${cadaProducto.linkImagen}"</img>
        <h3>ONLINE:  $ ${cadaProducto.precioUnitario}</h3>
        <div class="productos__containerBoton"><button>Agregar</button></div>`
        contenedorProductos.appendChild(elementoCreado)



        // Agrego clases
        contenedorProductos.classList.add("contenedorProductos")
        elementoCreado.classList.add("contenedorCadaProducto")
        //elementoCreado.img.classList.add("imagenesCatalogo")
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////



/* ************************************************** BUSQUEDA DE PRODUCTOS *************************/

let input = document.getElementById("inputBusqueda")
let boton = document.getElementById("botonBusqueda")
boton.addEventListener("click", () => filtrarYMostrar (productos, input.value))

window.addEventListener("keypress", (e) => {
    if(e.key == 10){
        filtrarYMostrar (productos, input.value)
    }
})


function filtrarYMostrar(arrayProductos, valorFIltro) {
    let productosFiltrados = arrayProductos.filter(producto => producto.nombre.toLowerCase().includes(valorFIltro.toLowerCase()))
    creacionTarjetaProductos(productosFiltrados)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////


/* ************************************************** FILTRAR POR CATEGORIA *************************/

let filtroDulce = productos.filter(prod => prod.categoria === 'DULCES')
let filtroSalado = productos.filter(prod => prod.categoria === 'SALADOS')
let filtroSaludables = productos.filter(prod => prod.categoria === 'SALUDABLES')
let opcionesFiltrado = document.getElementById("ulBtn")
opcionesFiltrado.addEventListener("click", (e) => {
    let datoId = e.target.id
    switch (datoId) {
        case 'DULCES':
            creacionTarjetaProductos(filtroDulce)
            break;
        case 'SALADOS':
            creacionTarjetaProductos(filtroSalado)
            break;
        case 'SALUDABLES':
            creacionTarjetaProductos(filtroSaludables)
            break;
        default:
            creacionTarjetaProductos(productos)
            break;

    }
})
