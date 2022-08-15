setTimeout(function(){
document.getElementById("principio").style.display = "none";
document.getElementById("nav").style.display = "flex";
document.getElementById("body").style.backgroundImage = "radial-gradient(rgb(123, 18, 18), black)"

let carrito = [];
const listaProductos = document.getElementById(`container`);
const listaCarrito = document.getElementById(`carro`);
const precioTotal = document.getElementById(`total`);

mostrarProductos();

function mostrarProductos() {
  arrayProductos.forEach(prod => { 
    let div = document.createElement(`div`);
    div.className = `container`;
    div.innerHTML = `<div id="card" class="articulo">
                      <div class="nombre"><h2>${prod.nombre}</h2></div>
                      <img class="imagen" src="${prod.imagen}">
                      <div class="stock" id="stockCard${prod.codigo}">${prod.stock}</div>
                      <div class="precio">
                        <h3 class="pre">Precio: $</h3>
                        <h3 class="pre">${prod.precio}</h3>
                      </div>
                      <div class="codigo">
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
    mermarStock(estaEnCarrito)
    sumarCarrito();
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
  }
}

function crearBotones() {
  if(carrito.length == 1) {
    document.getElementById("iconoCarrito").style.color = "red"
    let div = document.createElement(`div`);
      div.innerHTML = `<button id="btnEliminarPedido">Borrar Pedido</button>`;
      listaCarrito.appendChild(div); 
      let borrarCarro = document.getElementById(`btnEliminarPedido`);
  borrarCarro.addEventListener(`click`,()=> {
    borrarCarrito();
    actualizarStock();
  })
    let divcomprar = document.createElement(`div`);
      divcomprar.innerHTML = `<button id="btnComprar">COMPRAR</button>`;
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
} 

function mostrarcarrito(productoAgregar) {
  let div = document.createElement(`div`);
  div.setAttribute("id", "list");
  div.innerHTML = `<img id="imgCarro" src="${productoAgregar.imagen}">  <p id="cantidad${productoAgregar.codigo}">${productoAgregar.cantidad}</p>  ${productoAgregar.nombre} <p id="code">||Código: ${productoAgregar.codigo}||</p> -- <p id="precioCarro${productoAgregar.codigo}">$${productoAgregar.precio}</p> <button class="btnEliminar" id="btnEliminar${productoAgregar.codigo}">X</button>`
  document.getElementById("contenedor").appendChild(div);
  sumarCarrito();
  eliminarProducto(productoAgregar)
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
  document.getElementById('contenedor').innerHTML = '';
  carrito = [];
  sumarCarrito();
}

function actualizarStock() {
  location.reload();
}
},1500);