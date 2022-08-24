//Tiempo de espera mostrando imagen.
setTimeout(function(){
document.getElementById("principio").style.display = "none"; //Sacando la imagen de entrada.
document.getElementById("barra").style.display = "none"; //Ocultando barra de carga.
document.getElementById("nav").style.display = "flex"; //Mostrando Navegación.
document.getElementById("body").style.backgroundImage = "radial-gradient(rgb(35, 35, 142), rgb(23, 170, 94))" //Cambiando el background del body.

const listaProductos = document.getElementById(`container`); //Contenedor de las tarjetas.

MostrarProductos(); 
VerificarCargar(); 

function MostrarProductos() {
  arrayProductos.forEach(prod => { 
    let div = document.createElement(`div`);
    div.className = `container`; //clase.
    div.innerHTML = `<div id="card${prod.codigo}" class="articulo">
                      <div class="nombre"><h2>${prod.nombre}</h2></div>
                      <div class="cont">
                      <img id="imagen${prod.codigo}" class="imagen" src="${prod.imagen}"><p class="descripcion">Descripción: ${prod.descripcion}</p>
                      </div>
                      <div class="sinStock" id="sinStock${prod.codigo}">SIN STOCK</div>
                      <div class="stock" id="stockCard${prod.codigo}">${prod.stock}</div>
                      <div class="precio">
                        <h3 class="pre">Precio: $</h3>
                        <h3 class="pre">${prod.precio}</h3>
                      </div>
                      <div id="codigo${prod.codigo}" class="codigo">
                        <h4>Código</h4>  
                        <h4>${prod.codigo}</h4>
                      </div>
                        <button id="btn${prod.codigo}" class="button"><span>AGREGAR</span></button>
                      </div>
                    </div>`; //Creando la tarjeta en el html.
  listaProductos.appendChild(div); //Agregando el div en la lista de productos.
  let btnAgregar = document.getElementById(`btn${prod.codigo}`); //Id boton de agregar.
  btnAgregar.addEventListener(`click`,()=> { //Escucha del boton agregar.
    AgregarCarrito(prod.codigo); 
    SinStock(prod.codigo); 
  })
  })
}

},1900);