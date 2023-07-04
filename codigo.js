
creacionTarjetaProductos(funcionProductos())
creacionFiltrosCategorias(funcionProductos())
busquedaPorEnter (funcionProductos())

function funcionProductos (){
    let productos = [

        { id: 10, nombre: "Galleta Oreo", categoria: "DULCES", precioUnitario: 5.90, linkImagen: "oreoVainilla.png" },
        { id: 15, nombre: "Bombones", categoria: "DULCES", precioUnitario: 8.50, linkImagen: "bombonesRellenos.png" },
        { id: 20, nombre: "Doritos salados", categoria: "SALADOS", precioUnitario: 3.80, linkImagen: "doritos.png" },
        { id: 25, nombre: "Inka Chips salados", categoria: "SALADOS", precioUnitario: 2.50, linkImagen: "inkaChips.png" },
        { id: 30, nombre: "Almendras", categoria: "SALUDABLES", precioUnitario: 10.50, linkImagen: "almendras.png" },
        { id: 35, nombre: "Nueces peladas", categoria: "SALUDABLES", precioUnitario: 12.80, linkImagen: "nuecesPeladas.png" },
    
    
    ]
    return productos
}






/*************************************************** CREACION BOTONES FILTROS ********************** */

function creacionFiltrosCategorias(arrayProductos) {
    let categorias = ["TODOS"]
    arrayProductos.forEach(producto => {
        if (!categorias.includes(producto.categoria)) { // Se hace esto para evitar que se repitan categorias
            categorias.push(producto.categoria)
        }

    })

    let contenedorFiltrosCategorias = document.getElementById("contenedorFiltrosCategorias")

    categorias.forEach(categoria => {
        let botonCategoria = document.createElement("button")
        botonCategoria.id = categoria
        botonCategoria.innerText = categoria
        contenedorFiltrosCategorias.appendChild(botonCategoria)

        botonCategoria.classList.add("categoriasFiltrado")

        let botonCapturado = document.getElementById(categoria)
        botonCapturado.addEventListener("click", (e) => creacionTarjetaProductosPorCategorias(e.target.id, arrayProductos))

    })

}






/*************************************************** CREACION DE PRODUCTOS ********************** */



function creacionTarjetaProductos(arrayProductos) {
    let contenedorProductos = document.getElementById("contenedorProductos")
    let PaginaNoEncontrada = document.getElementById("PaginaNoEncontrada")
    contenedorProductos.innerHTML = ""

    PaginaNoEncontrada.classList.add("oculto")
    contenedorProductos.classList.remove("oculto")

    arrayProductos.forEach(cadaProducto => {

        let elementoCreado = document.createElement("div")
        elementoCreado.innerHTML = `<h2>${cadaProducto.nombre}</h2>
        <img class="imagenesCatalogo" src="./imagenes/${cadaProducto.linkImagen}"</img>
        <h3>ONLINE:  $ ${cadaProducto.precioUnitario}</h3>
        <div class="productos__containerBoton"><button id="${cadaProducto.id}">Agregar</button></div>`
        contenedorProductos.appendChild(elementoCreado)



        // Agrego clases
        contenedorProductos.classList.add("contenedorProductos")
        elementoCreado.classList.add("contenedorCadaProducto")
        //elementoCreado.img.classList.add("imagenesCatalogo")

        let botonAgregarAlCarrito= document.getElementById("cadaProducto.id")
        botonAgregarAlCarrito.addEventListener("click", () => carritoCompras(funcionProductos (), botonAgregarAlCarrito))
    })
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////



/* ************************************************** BUSQUEDA DE PRODUCTOS *************************/

function busquedaPorEnter () {



let input = document.getElementById("inputBusqueda")
let boton = document.getElementById("botonBusqueda")
boton.addEventListener("click",buscarPorLupa)


/* ***** BUSQUEDA CON LA TECLA ENTER *************************/

input.addEventListener("keypress", (e) => {
    let keyCode = e.keyCode
    if (keyCode == 13) {
        e.preventDefault() // Para que no me lance erro 405

        let productosFiltrados = funcionProductos ().filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()))
        if (productosFiltrados.length >= 1) {
            filtrarYMostrar(funcionProductos (), input.value)
            //console.log("hay prodd");

        } else {

            productoNoEncontrado(funcionProductos ())
        }


    }
})
}
function buscarPorLupa (){
    console.log("lupa")
    let input = document.getElementById("inputBusqueda")
    let productosFiltrados = funcionProductos ().filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()))
    if(productosFiltrados.length >= 1){
        
        filtrarYMostrar(funcionProductos (), input.value)
    } else {
        productoNoEncontrado(funcionProductos())
        
    }
}

function filtrarYMostrar(arrayProductos, valorFiltro) {
    let productosFiltrados = arrayProductos.filter(producto => producto.nombre.toLowerCase().includes(valorFiltro.toLowerCase()))
    creacionTarjetaProductos(productosFiltrados)
    


}

///////////////////////////////////////////////////////////////////////////////////////////////////////


/* ************************************************** PRODUCTO NO ENCONTRADO *************************/

function productoNoEncontrado(arrayProductos) {
    
    let contenedorProductos = document.getElementById("contenedorProductos")
    let PaginaNoEncontrada = document.getElementById("PaginaNoEncontrada")

    contenedorProductos.classList.add("oculto")



    //let elementoCreado = document.createElement("div")
    PaginaNoEncontrada.innerHTML = `<img class="imagenesCatalogo" src="./imagenes/productoNoEncontrado.jpg"</img>
        <h2>Producto no encontrado</h2>
        <button type="button" id="botonProductoNoEncontrado">Regresar</button></div>`
    //contenedorProductos.appendChild(elementoCreado)



    // Agrego clases
    PaginaNoEncontrada.classList.add("contenedorProductos")
    PaginaNoEncontrada.classList.remove("oculto")
    //contenedorProductos.classList.add("contenedorPaginaNoEncontrada")
    //elementoCreado.img.classList.add("imagenesCatalogo")

    let botonProductoNoEncontrado = document.getElementById("botonProductoNoEncontrado")

    botonProductoNoEncontrado.addEventListener("click", () => creacionTarjetaProductos(arrayProductos))

}



///////////////////////////////////////////////////////////////////////////////////////////////////////

/* ************************************************** FILTRAR POR CATEGORIA *************************/

/* let filtroDulce = productos.filter(prod => prod.categoria === 'DULCES')
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
}) */

/* let categoriasFiltros = document.getElementsByClassName("categoriasFiltrado")
for (const categoriaFiltro of categoriasFiltros) {  // USO FOR OF YA QUE ADDEVENELISTENER SOLAMENTE SE AGREGA A ELEMENTOS INDIVUDUALES Y GETELEMENTSBYCLASSNAME DEVUELVE UN LISTADO
    categoriaFiltro.addEventListener("click", creacionTarjetaProductosPorCategorias)
} */

function creacionTarjetaProductosPorCategorias(id, productos) {
    //let opcion = e.target.value
    let elementosFiltrados = productos.filter(producto => producto.categoria === id)
    //console.log(e.target.value)
    if (id === "TODOS") {
        creacionTarjetaProductos(funcionProductos ())

    } else {

        creacionTarjetaProductos(elementosFiltrados)
    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////

/*************************************************** CREACION DE PRODUCTOS ********************** */

function carritoCompras (arrayProductos, idProducto){
    let carritoCompras= []

    let productoSeleccionado= arrayProductos.find((producto)=> producto.id===idProducto)

    console.log(productoSeleccionado)



}
