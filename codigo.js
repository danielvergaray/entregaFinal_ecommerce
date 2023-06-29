let productos = [

    { id: 10, nombre: "Galleta Oreo", categoria: "DULCES", precioUnitario: 5.90, linkImagen: "oreoVainilla.png" },
    { id: 15, nombre: "Bombones", categoria: "DULCES", precioUnitario: 8.50, linkImagen: "bombonesRellenos.png" },
    { id: 20, nombre: "Doritos salados", categoria: "SALADOS", precioUnitario: 3.80, linkImagen: "doritos.png" },
    { id: 25, nombre: "Inka Chips salados", categoria: "SALADOS", precioUnitario: 2.50, linkImagen: "inkaChips.png" },
    { id: 30, nombre: "Almendras", categoria: "SALUDABLES", precioUnitario: 10.50, linkImagen: "almendras.png" },
    { id: 35, nombre: "Nueces peladas", categoria: "SALUDABLES", precioUnitario: 12.80, linkImagen: "nuecesPeladas.png" },

]

let opcionesFiltrado = ["Dulces", "Salados", "Saludables", "Todos los productos"]

//contenedorProductos.createElements
let contenedorProductos = document.getElementById("contenedorProductos")
let contenedorOpcionesFiltrado = document.getElementById("opcionesFiltrado")

creacionTarjetaProductos(productos)
creacionBarraIzquierda(opcionesFiltrado, productos)



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




let input = document.getElementById("inputBusqueda")
let boton = document.getElementById("botonBusqueda")
boton.addEventListener("click", () => filtrarYMostrar(productos, input.value))


function filtrarYMostrar(arrayProductos, valorFIltro) {
    let productosFiltrados = arrayProductos.filter(producto => producto.nombre.includes(valorFIltro))
    creacionTarjetaProductos(productosFiltrados)
}

function creacionBarraIzquierda(opcionesFiltradoArray, productos) {
    opcionesFiltradoArray.forEach(opcion => {

        let ulCreadoFiltos = document.createElement("ul")
        ulCreadoFiltos.innerHTML = `
        <button type="button" class="menuFiltrado_opciones" id="categoriaFiltro" value=${productos.categoria}>${opcion}</button>`
        contenedorOpcionesFiltrado.appendChild(ulCreadoFiltos)

        // Agrego clases
        ulCreadoFiltos.classList.add("menuFiltrado_container")
        //elementoCreado.classList.add("contenedorCadaProducto")
    })
}

let categoria= document.getElementById("categoriaFiltro")
categoria.addEventListener("click",filtrarYMostrarPorCategoria )

function filtrarYMostrarPorCategoria (e){
    let productosFiltrados = productos.filter(producto => producto.categoria=== e.target.value)
    creacionTarjetaProductos(productosFiltrados)
    
}



/* function filtrar (){
    productosFiltrados.filtrar(producto => producto.categoria===) 
    alert("hola")
}


let botonesFiltros = document.getElementsByClassName("botonFiltro")
botonesFiltros.addEventListener("click", filtrar)

 let botonesFiltros = document.getElementsByClassName("botonFiltro")
for (const botonFiltro of botonesFiltros) {
  botonFiltro.addEventListener("click", filtrarYRenderizarPorCategoria)
}


function filtrarYRenderizarPorCategoria(e) {
    console.log(e)
    let elementosFiltrados = productos.filter(producto => producto.categoria === e.target.value)
    renderizar(elementosFiltrados)
  } */