
funcionProductos()
//creacionTarjetaProductos(funcionProductos())


//abrirCarrito()

function funcionProductos() {
    let productos = [

        { id: 10, nombre: "Galleta Oreo", categoria: "DULCES", precioUnitario: 5.90, linkImagen: "oreoVainilla.png" },
        { id: 15, nombre: "Bombones", categoria: "DULCES", precioUnitario: 8.50, linkImagen: "bombonesRellenos.png" },
        { id: 20, nombre: "Doritos salados", categoria: "SALADOS", precioUnitario: 3.80, linkImagen: "doritos.png" },
        { id: 25, nombre: "Inka Chips salados", categoria: "SALADOS", precioUnitario: 2.50, linkImagen: "inkaChips.png" },
        { id: 30, nombre: "Almendras", categoria: "SALUDABLES", precioUnitario: 10.50, linkImagen: "almendras.png" },
        { id: 35, nombre: "Nueces peladas", categoria: "SALUDABLES", precioUnitario: 12.80, linkImagen: "nuecesPeladas.png" },


    ]
    
    creacionTarjetaProductos(productos)
    creacionFiltrosCategorias(productos)
    busquedaProducto(productos)
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
    contenedorFiltrosCategorias.innerHTML = "" // Para que no se dupliquen las categorias

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
    let pantallaCarrito = document.getElementById("pantallaCarrito")
    contenedorProductos.innerHTML = ""

    PaginaNoEncontrada.classList.add("oculto")
    contenedorProductos.classList.remove("oculto")
    //pantallaCarrito.classList.add("oculto")

    arrayProductos.forEach(cadaProducto => {

        let elementoCreado = document.createElement("div")
        elementoCreado.innerHTML = `<h2>${cadaProducto.nombre}</h2>
        <img class="imagenesCatalogo" src="./imagenes/${cadaProducto.linkImagen}"</img>
        <h3>ONLINE:  $ ${cadaProducto.precioUnitario}</h3>
        <div class="productos__containerBoton"><button id=${cadaProducto.id}>Agregar</button></div>`
        contenedorProductos.appendChild(elementoCreado)



        // Agrego clases
        contenedorProductos.classList.add("contenedorProductos")
        elementoCreado.classList.add("contenedorCadaProducto")
        //elementoCreado.img.classList.add("imagenesCatalogo")

        
    })
    let botonAgregarAlCarrito = document.getElementById( contenedorProductos.id)
    botonAgregarAlCarrito.addEventListener("click", (e) => carritoCompras(e, arrayProductos))
}

///////////////////////////////////////////////////////////////////////////////////////////////////////



/* ************************************************** BUSQUEDA DE PRODUCTOS *************************/

function busquedaProducto(arrayProductos) {



    let input = document.getElementById("inputBusqueda")
    let boton = document.getElementById("botonBusqueda")
    boton.addEventListener("click", () => buscarPorLupa (arrayProductos))


    /* ***** BUSQUEDA CON LA TECLA ENTER *************************/

    input.addEventListener("keypress", (e) => {
        let keyCode = e.keyCode
        if (keyCode == 13) {
            e.preventDefault() // Para que no me lance erro 405

            let productosFiltrados = arrayProductos.filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()))
            if (productosFiltrados.length >= 1) {
                filtrarYMostrar(arrayProductos, input.value)
                //console.log("hay prodd");

            } else {

                productoNoEncontrado(arrayProductos)
            }


        }
    })
}
function buscarPorLupa(arrayProductos) {
    
    let input = document.getElementById("inputBusqueda")
    let productosFiltrados = arrayProductos.filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()))
    if (productosFiltrados.length >= 1) {

        filtrarYMostrar(arrayProductos, input.value)
    } else {
        productoNoEncontrado(arrayProductos)

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



function creacionTarjetaProductosPorCategorias(id, arrayProductos) {
    //let opcion = e.target.value
    let elementosFiltrados = arrayProductos.filter(producto => producto.categoria === id)
    //console.log(e.target.value)
    if (id === "TODOS") {
        creacionTarjetaProductos(arrayProductos)

    } else {

        creacionTarjetaProductos(elementosFiltrados)
    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////

/*************************************************** CARRITO DE COMPRAS ********************** */

function carritoCompras(e, arrayProductos) {
    let carritoCompras = []
    
    //let carritoComprasJSON= localStorage.setItem('carritoJson', JSON.stringify(carritoCompras))

    //let carritoJSON= JSON.parse(localStorage.getItem("carritoCompras"))

   /*  if(carritoJSON){
        carritoCompras=carritoJSON
    } */

    let idProducto = e.target.id
    //console.log(e.target.id)
    let productoSeleccionado = arrayProductos.find((producto => producto.id === Number(idProducto)))

    //console.log(productoSeleccionado)

    carritoCompras.push({
        nombre: productoSeleccionado.nombre,
        cantidad: productoSeleccionado.cantidad,
        precioUnitario: productoSeleccionado.precioUnitario,
        linkImagen: productoSeleccionado.linkImagen
    })
    

    let iconoCarrito = document.getElementById("iconoCarrito")
    iconoCarrito.addEventListener("click",()=> mostrarCarrito (carritoCompras))
    //localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras))
    //console.log("abrirCArrito")

}

function abrirCarrito() {
    
}

function mostrarCarrito(arrayCarritoCompras) {
    
    //let iconoCarrito = document.getElementById("pantallaCarrito")
    let patallaDelCarrito = document.getElementById("pantallaCarrito")

    arrayCarritoCompras.forEach(producto => {
        patallaDelCarrito.innerHTML+= `<h2>${producto.nombre}</h2>
        <h3>${producto.precioUnitario}</h3>
        <img class="imagenesCatalogo" src="./imagenes/${producto.linkImagen}"</img>`
    })
    
    /* let contenedorPantallaCarrito = document.createElement("div")

    iconoCarrito.classList.remove("oculto")
    iconoCarrito.classList.add("iconoCarrito") */

    

    /* contenedorPantallaCarrito.innerHTML = `<h1>Bienvenido al carrito</h1>
    
    `
    patallaDelCarrito.appendChild(contenedorPantallaCarrito) */
}
