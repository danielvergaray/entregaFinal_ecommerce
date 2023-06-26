let productos = [

    { id: 10, nombre: "Galleta Oreo sabor vainilla", categoria: "DULCES", precioUnitario: 5.90, linkImagen: "oreoVainilla.png" },
    { id: 15, nombre: "Bombones de chocolate", categoria: "DULCES", precioUnitario: 8.50, linkImagen:"bombonesRellenos.png" },
    { id: 20, nombre: "Doritos clasicos de queso", categoria: "SALADOS", precioUnitario: 3.80, linkImagen: "doritos.png" },
    { id: 25, nombre: "Inka Chips", categoria: "SALADOS", precioUnitario: 2.50, linkImagen: "inkaChips.png" },
    { id: 30, nombre: "Almendras tostadas", categoria: "SALUDABLES", precioUnitario: 10.50, linkImagen: "almendras.png" },
    { id: 35, nombre: "Nueces peladas", categoria: "SALUDABLES", precioUnitario: 12.80, linkImagen: "nuecesPeladas.png" },

]


//contenedorProductos.createElements
let contenedorProductos= document.getElementById("contenedorProductos")

creacionTarjetaProductos(productos)



function creacionTarjetaProductos(arrayProductos){
    arrayProductos.forEach(cadaProducto => {
    
        let elementoCreado= document.createElement("div")
        elementoCreado.innerHTML= `<h2>${cadaProducto.nombre}</h2>
        <img src="./imagenes/${cadaProducto.linkImagen}"</img>
        <h3>ONLINE:  $ ${cadaProducto.precioUnitario}  </h3>
        <button>Agregar al carrito</button>
        ` 
        contenedorProductos.appendChild(elementoCreado)

    
    
        // Agrego clases
        contenedorProductos.classList.add("contenedorProductos")
        elementoCreado.classList.add("contenedorCadaProducto")
    })
}


