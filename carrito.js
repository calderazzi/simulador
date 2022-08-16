setTimeout(function(){
document.getElementById("principio").style.display = "none";
document.getElementById("barra").style.display = "none";
document.getElementById("nav").style.display = "flex";
document.getElementById("body").style.backgroundImage = "radial-gradient(rgb(123, 18, 18), black)"

let carrito = [];
const listaProductos = document.getElementById(`container`);
const listaCarrito = document.getElementById(`carro`);
const precioTotal = document.getElementById(`total`);

mostrarProductos();
verificarCargar();

function mostrarProductos() {
  arrayProductos.forEach(prod => { 
    let div = document.createElement(`div`);
    div.className = `container`;
    div.innerHTML = `<div id="card${prod.codigo}" class="articulo">
                      <div class="nombre"><h2>${prod.nombre}</h2></div>
                      <img id="imagen${prod.codigo}" class="imagen" src="${prod.imagen}">
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
                    </div>`;
  listaProductos.appendChild(div); 
  let btnAgregar = document.getElementById(`btn${prod.codigo}`)
  btnAgregar.addEventListener(`click`,()=> {
    agregarCarrito(prod.codigo);
    sinStock(prod.codigo);
  })
  })
}

function agregarCarrito(prod) {
  let estaEnCarrito = carrito.find(product => product.codigo == prod);
  if(estaEnCarrito) {
    let stockCard = document.getElementById(`stockCard${estaEnCarrito.codigo}`).innerText;
    if(stockCard > 0) {
    estaEnCarrito.cantidad++;
    precioNuevo = estaEnCarrito.cantidad * estaEnCarrito.precio;
    document.getElementById(`cantidad${estaEnCarrito.codigo}`).innerHTML = `<p id="cantidad${estaEnCarrito.cantidad}">${estaEnCarrito.cantidad}</p>`
    document.getElementById(`precioCarro${estaEnCarrito.codigo}`).innerHTML = `<p id="precioCarro${estaEnCarrito.codigo}">$${precioNuevo}</p>`
    carrito.push(estaEnCarrito);
    mermarStock(estaEnCarrito);
    sumarCarrito()
    guardar();
    }
  }else{
    let contenedor = document.createElement(`div`);
    contenedor.setAttribute("id", "contenedor");
    contenedor.innerHTML = ""
    listaCarrito.appendChild(contenedor);
    let productoAgregar = arrayProductos.find(item=> item.codigo == prod);
    productoAgregar.cantidad = 1;
    carrito.push(productoAgregar);
    crearBotones()
    document.getElementById(`esconder`).style.display = "flex";
    mermarStock(productoAgregar)
    mostrarcarrito(productoAgregar);
    guardar();
  }
}

function crearBotones() {
  if(carrito.length == 1) {
    document.getElementById("iconoCarrito").style.color = "red"
    let div = document.createElement(`div`);
      div.innerHTML = `<button id="btnEliminarPedido"><a href="index.html">Borrar Pedido</a></button>`;
      listaCarrito.appendChild(div); 
      let borrarCarro = document.getElementById(`btnEliminarPedido`);
  borrarCarro.addEventListener(`click`,()=> {
    borrarCarrito();
    actualizarStock();
  })
    let divcomprar = document.createElement(`div`);
      divcomprar.innerHTML = `<button id="btnComprar"><a href="#body">COMPRAR</button></a></button>`;
      listaCarrito.appendChild(divcomprar); 
      let comprar = document.getElementById(`btnComprar`);
  comprar.addEventListener(`click`,()=> {
    comprarCarrito();
  })  
  }
}

function mermarStock(productoAgregar) {
  let stockCard = document.getElementById(`stockCard${productoAgregar.codigo}`).innerText;
  stockCard--;
  document.getElementById(`stockCard${productoAgregar.codigo}`).innerText = stockCard;
} 
function sumarStock(productoAgregar) {
  let stockCard = document.getElementById(`stockCard${productoAgregar.codigo}`).innerText;
  stockCard++;
  document.getElementById(`stockCard${productoAgregar.codigo}`).innerText = stockCard;
  if(stockCard == 1) {
    conStock(productoAgregar);
  }
} 

function mostrarcarrito(productoAgregar) {
  let div = document.createElement(`div`);
  div.setAttribute("id", "list");
  div.innerHTML = `<img id="imgCarro" src="${productoAgregar.imagen}">  <p id="cantidad${productoAgregar.codigo}">${productoAgregar.cantidad}</p>  ${productoAgregar.nombre} <p id="code">||Código: ${productoAgregar.codigo}||</p> -- <p id="precioCarro${productoAgregar.codigo}">$${productoAgregar.precio}</p> <button class="btnEliminar" id="btnEliminar${productoAgregar.codigo}"><i class="fa-solid fa-trash-can"></i></button>`
  document.getElementById("contenedor").appendChild(div);
  sumarCarrito();
  eliminarProducto(productoAgregar);
}

function eliminarProducto(productoAgregar) {
  let btnEliminar = document.getElementById(`btnEliminar${productoAgregar.codigo}`);
  btnEliminar.addEventListener(`click`,()=> {
    if(productoAgregar.cantidad > 1){
      productoAgregar.cantidad--;
      let precioNuevo = productoAgregar.cantidad * productoAgregar.precio;
      document.getElementById(`cantidad${productoAgregar.codigo}`).innerHTML = `<p id="cantidad${productoAgregar.cantidad}">${productoAgregar.cantidad}</p>`
      document.getElementById(`precioCarro${productoAgregar.codigo}`).innerHTML = `<p id="precioCarro${productoAgregar.codigo}">$${precioNuevo}</p>`
      precioTotal.innerText = precioTotal.innerText - productoAgregar.precio;
      document.getElementById(`total`).innerHTML = `<p id="total">${precioTotal.innerText}</p>`
      sumarStock(productoAgregar);
    }else{
      carrito = carrito.filter(item => item.codigo !== productoAgregar.codigo);
      document.getElementById(`cantidad${productoAgregar.codigo}`).innerHTML = `<p id="cantidad${productoAgregar.cantidad}">${productoAgregar.cantidad}</p>`
      btnEliminar.parentElement.remove();
      sumarStock(productoAgregar);
      sumarCarrito();
    }
  })
}

function sumarCarrito() {
  contadorCarro()
  precioTotal.innerText = carrito.reduce((acc,num)=> acc + num.precio, 0);
  let tot = document.getElementById("total").innerText;
  if(tot == 0) {
    document.getElementById("iconoCarrito").style.color = "white"
    document.getElementById(`esconder`).style.display = "none";
    let elimPedido = document.getElementById("btnEliminarPedido");
    let botonComprar = document.getElementById("btnComprar");
    elimPedido.parentElement.remove();
    botonComprar.parentElement.remove();
  }
}

function comprarCarrito() {
  alert("Gracias por su compra!!!")
  borrarCarrito();
}

function borrarCarrito() {
  localStorage.clear();
  document.getElementById('contenedor').innerHTML = '';
  carrito = [];
  sumarCarrito();
}

function sinStock(prod) {
  let cant = document.getElementById(`stockCard${prod}`).innerText;
  if(cant == 0) {
    document.getElementById(`card${prod}`).style.backgroundColor = "grey";
    document.getElementById(`card${prod}`).style.border = "10px solid grey";
    document.getElementById(`imagen${prod}`).style.filter = "grayscale(1)";
    document.getElementById(`codigo${prod}`).style.backgroundColor = "grey";
    document.getElementById(`codigo${prod}`).style.border = "none";
    document.getElementById(`sinStock${prod}`).style.display = "block";
  }
  }
  function conStock(prod){
    document.getElementById(`card${prod.codigo}`).style.backgroundColor = "rgba(250, 59, 25, 0.213)";
    document.getElementById(`card${prod.codigo}`).style.border = "10px solid red";
    document.getElementById(`imagen${prod.codigo}`).style.filter = "none";
    document.getElementById(`codigo${prod.codigo}`).style.backgroundColor = "rgb(164, 21, 21)";
    document.getElementById(`codigo${prod.codigo}`).style.border = "1px solid red";
    document.getElementById(`sinStock${prod.codigo}`).style.display = "none";
  }

function actualizarStock() {
  location.reload();
}

function guardar() {
    localStorage.setItem("carroOlvidado",JSON.stringify(carrito));
}

function verificarCargar() {
  let arrayCarrito = JSON.parse(localStorage.getItem("carroOlvidado"));
  if(arrayCarrito) {
    alert(`TU CARRITO TE ESPERA!!!
  COMPRALO AHORA!!`)
    for(elemento of arrayCarrito ) {
     agregarCarrito(elemento.codigo);
    }
  }
}

function contadorCarro() {
  let cantidadCarro = carrito.length
  console.log(cantidadCarro);
  document.getElementById("contador").innerText = cantidadCarro;
}


},1900);