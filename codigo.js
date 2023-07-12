
funcionProductos()


function funcionProductos() {
    let productos = [

        { id: 10, nombre: "Galleta Oreo", categoria: "DULCES", precioUnitario: 5.00, linkImagen: "oreoVainilla (2).png" },
        { id: 15, nombre: "Bombones", categoria: "DULCES", precioUnitario: 8.00, linkImagen: "bombonesRellenos.png" },
        { id: 20, nombre: "Doritos salados", categoria: "SALADOS", precioUnitario: 4.00, linkImagen: "doritos.png" },
        { id: 25, nombre: "Inka Chips salados", categoria: "SALADOS", precioUnitario: 2.50, linkImagen: "inkaChips.png" },
        { id: 30, nombre: "Almendras", categoria: "SALUDABLES", precioUnitario: 10.50, linkImagen: "almendras.png" },
        { id: 35, nombre: "Nueces peladas", categoria: "SALUDABLES", precioUnitario: 12.50, linkImagen: "nuecesPeladas.png" },


    ]
    let carrito = []
    let carritoJSON = JSON.parse(localStorage.getItem("carrito"))

    /* let carrito = carritoJSON ? carritoJSON : [] */

    if (carritoJSON) {
        carrito = carritoJSON
    }

    renderizarCarrito(carrito) // Para que me aparezca el carrito con lo que tiene almacenado
    let contenedorProductos = document.getElementById("contenedorProductos")

    creacionTarjetaProductos(productos, carrito, contenedorProductos)
    creacionFiltrosCategorias(productos, carrito, contenedorProductos)
    busquedaProducto(productos, carrito, contenedorProductos)

    let botonFinalizarCompra = document.getElementById("finalizarCompra")
    botonFinalizarCompra.addEventListener("click", () => finalizarCompra(carrito))
}

function finalizarCompra(carrito) {
    /* let botonFinalizarCompra= document.getElementById("finalizarCompra")
    botonFinalizarCompra.addEventListener("click", finalizarProyecto) */

    let carritoFisico = document.getElementById("pantallaCarrito")
    carritoFisico.innerHTML = ""
    localStorage.clear()
    carrito.splice(0, carrito.length) // Para que se borre el carrito cuandi finalice la compra
    renderizarCarrito(carrito)
}

function finalizarProyecto() {
    let carritoFisico = document.getElementById("contenedorCarrito")
    let botonFinalizarCompra = document.getElementById("finalizarCompra")
    carritoFisico.innerHTML = `<h1>Gracias por su compra </h1>`
    botonFinalizarCompra.classList.add("oculto")

}

function renderizarCarrito(carritoJSON) {
    let carritoFisico = document.getElementById("pantallaCarrito")
    carritoFisico.innerHTML = ""

    carritoFisico.innerHTML = `<h1 class="pantallaCarritoTitulo">Su carrito contiene los siguientes productos </h1>`

    carritoJSON.forEach(({ nombre, precioUnitario, unidades, subtotal, linkImagen, id }) => {
        let elementoDelCarrito = document.createElement("div")
        elementoDelCarrito.classList.add("elementoDelCarrito")
        elementoDelCarrito.innerHTML += `
       
        <img class="imagenesCatalogo" src="./imagenes/${linkImagen}"</img>
        <div class="contenedorDescripcionProductosCarrito">
            <div class="descripcionProductosCarrito">
                <p>${nombre}</p>
                <p>Cantidad: ${unidades} und</p>
                <p>Precio Unitario:  $ ${precioUnitario}</p>
                <p>Total: $ ${subtotal}</p>
            </div>

            <div class="contenedorEliminarProductosCarrito"> 
                <i class="fa-solid fa-xmark X" id="${id}"></i>
            </div>
        </div>
        
        
      `
        carritoFisico.appendChild(elementoDelCarrito)

        elementoDelCarrito.classList.add("contenedorProductos")

        let idElementoAEliminar= document.getElementById(`${id}`)
        idElementoAEliminar.addEventListener("click", (e) => eliminarProductoDelCarrito(carritoJSON, e ))

    })
    let botonFinalizarCompra = document.getElementById("finalizarCompra")
    botonFinalizarCompra.addEventListener("click", finalizarProyecto)

    let salirDelCarrito = document.getElementById("salirDeCarrito")
    salirDelCarrito.addEventListener("click", mostrarOcultar)

    //let botonEliminarProducto = document.querySelector(".X")
    
    



}

function eliminarProductoDelCarrito(carrito, e) {
    let idProducto = e.target.id
   // console.log(idProducto)
    //console.log(carrito)
    //let productoAEliminarEncontrado= carrito.find(elementoEnCarrito =>  elementoEnCarrito.id ===idProducto)
    
    let productoAEliminarEncontrado= carrito.findIndex(producto => producto.id === Number(idProducto))

    if (productoAEliminarEncontrado !== -1) {
        carrito.splice(productoAEliminarEncontrado, 1)
        localStorage.setItem('carrito', JSON.stringify(carrito)) // Para que se actualice el localStorage sin los elementos eliminados
    }

    renderizarCarrito(carrito)
}

function agregarAlCarrito(e, arrayProductos, carrito) {


    let idProducto = e.target.id
    //console.log(e.target.id)
    let productoSeleccionado = arrayProductos.find((producto => producto.id === Number(idProducto)))
    let posicionProductoEnCarrito = carrito.findIndex(producto => producto.id === Number(idProducto))

    //console.log(productoSeleccionado)

    if (posicionProductoEnCarrito !== -1) {
        carrito[posicionProductoEnCarrito].unidades++
        carrito[posicionProductoEnCarrito].subtotal = carrito[posicionProductoEnCarrito].unidades * carrito[posicionProductoEnCarrito].precioUnitario

    } else {
        carrito.push({
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            //cantidad: productoSeleccionado.cantidad,
            precioUnitario: productoSeleccionado.precioUnitario,
            unidades: 1,
            subtotal: productoSeleccionado.precioUnitario,
            linkImagen: productoSeleccionado.linkImagen
        })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)




}



let botonCarrito = document.getElementById("iconoCarrito")
botonCarrito.addEventListener("click", mostrarOcultar)


function mostrarOcultar() {
    let padreContenedor = document.getElementById("main__containerId")
    let carrito = document.getElementById("contenedorCarrito")
    padreContenedor.classList.toggle("cortina")
    carrito.classList.toggle("oculto")
}


/*************************************************** CREACION BOTONES FILTROS ********************** */

function creacionFiltrosCategorias(arrayProductos, carrito, contenedorProductos) {
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
        botonCapturado.addEventListener("click", (e) => creacionTarjetaProductosPorCategorias(e.target.id, arrayProductos, carrito, contenedorProductos))

    })

}






/*************************************************** CREACION DE PRODUCTOS ********************** */



function creacionTarjetaProductos(arrayProductos, carrito, contenedorProductos) {

    let PaginaNoEncontrada = document.getElementById("PaginaNoEncontrada")
    //let pantallaCarrito = document.getElementById("pantallaCarrito")
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
    arrayProductos.forEach(producto => {

        let botonAgregarAlCarrito = document.getElementById(producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarAlCarrito(e, arrayProductos, carrito))
        botonAgregarAlCarrito.addEventListener("click", alertaProductoAgregado)
    })

}

///////////////////////////////////////////////////////////////////////////////////////////////////////


/* ************************************************** BUSQUEDA DE PRODUCTOS *************************/

function busquedaProducto(arrayProductos, carrito, contenedorProductos) {



    let input = document.getElementById("inputBusqueda")
    let boton = document.getElementById("botonBusqueda")
    boton.addEventListener("click", () => buscarPorLupa(arrayProductos, carrito, contenedorProductos))


    /* ***** BUSQUEDA CON LA TECLA ENTER *************************/

    input.addEventListener("keypress", (e) => {
        let keyCode = e.keyCode
        if (keyCode == 13) {
            e.preventDefault() // Para que no me lance erro 405

            let productosFiltrados = arrayProductos.filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()))
            if (productosFiltrados.length >= 1) {
                filtrarYMostrar(arrayProductos, input.value, carrito, contenedorProductos)
                //console.log("hay prodd");

            } else {

                productoNoEncontrado(arrayProductos, carrito, contenedorProductos)
            }


        }
    })
}
function buscarPorLupa(arrayProductos, carrito, contenedorProductos) {

    let input = document.getElementById("inputBusqueda")
    let productosFiltrados = arrayProductos.filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()))
    if (productosFiltrados.length >= 1) {

        filtrarYMostrar(arrayProductos, input.value, carrito, contenedorProductos)
    } else {
        productoNoEncontrado(arrayProductos, carrito, contenedorProductos)

    }
}

function filtrarYMostrar(arrayProductos, valorFiltro, carrito, contenedorProductos) {
    let productosFiltrados = arrayProductos.filter(producto => producto.nombre.toLowerCase().includes(valorFiltro.toLowerCase()))
    creacionTarjetaProductos(productosFiltrados, carrito, contenedorProductos)



}

///////////////////////////////////////////////////////////////////////////////////////////////////////


/* ************************************************** PRODUCTO NO ENCONTRADO *************************/

function productoNoEncontrado(arrayProductos, carrito, contenedorProductos) {

    //let contenedorProductos = document.getElementById("contenedorProductos")
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

    botonProductoNoEncontrado.addEventListener("click", () => creacionTarjetaProductos(arrayProductos, carrito, contenedorProductos))

}



///////////////////////////////////////////////////////////////////////////////////////////////////////

/* ************************************************** FILTRAR POR CATEGORIA *************************/



function creacionTarjetaProductosPorCategorias(id, arrayProductos, carrito, contenedorProductos) {
    //let opcion = e.target.value
    let elementosFiltrados = arrayProductos.filter(producto => producto.categoria === id)
    //console.log(e.target.value)
    if (id === "TODOS") {
        creacionTarjetaProductos(arrayProductos, carrito, contenedorProductos)

    } else {

        creacionTarjetaProductos(elementosFiltrados, carrito, contenedorProductos)
    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////
function alertaProductoAgregado() {

    Toastify({
        text: "Producto agregado exitosamente",
        className: "info",
        duration: 1000,
        style: {
            background: "black",
        }
    }).showToast();
}





