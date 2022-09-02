
let carrito = [];
let carritoStorage = [];
const listaCarrito = document.getElementById(`carro`);
const precioTotal = document.getElementById(`total`);
let contador = document.getElementById("contador").innerText;
//Agregando el producto al carrito si no existe, sino lo sumamos.
function AgregarCarrito(code) {
  let estaEnCarrito = carrito.find(producto => producto.codigo === code);
  if(estaEnCarrito) {
    let precioCard = document.getElementById(`precio${code}`).innerText;
    let stockCard = document.getElementById(`stockCard${code}`).innerText;
    if(stockCard > 0) {
      estaEnCarrito.cantidad++;
      estaEnCarrito.precio += Number(precioCard);
      document.getElementById(`cantidad${estaEnCarrito.codigo}`).innerHTML = `<p id="cantidad${estaEnCarrito.cantidad}">${estaEnCarrito.cantidad}</p>`;
      document.getElementById(`precioCarro${estaEnCarrito.codigo}`).innerHTML = `<p id="precioCarro${estaEnCarrito.codigo}">$${estaEnCarrito.precio}</p>`;
      Actualizacion(estaEnCarrito);
    };
  }else{
    let contenedor = document.createElement(`div`);
    contenedor.setAttribute("id", "contenedor");
    listaCarrito.appendChild(contenedor);
    let productoAgregar = arrayProductos.find(item=> item.codigo === code);
    productoAgregar.cantidad = 1;
    carrito.push(productoAgregar);
    CrearBotones();
    document.getElementById(`esconder`).style.display = "flex";
    Actualizacion(productoAgregar);
    MostrarCarrito(productoAgregar)
  };
};
//Actualizacion para reducir código repetido.
function Actualizacion(producto) {
  SumarCarrito(); 
  carritoStorage.push(producto);
  GuardarStorage(); 
  SinStock(producto.codigo); 
  ContadorCarrito();
  MermarStock(producto); 
};
//Creación de botones.
function CrearBotones() {
  if(carrito.length == 1) {
    document.getElementById("iconoCarrito").style.color = "blue";
    let divBorrar = document.createElement(`div`);
      divBorrar.innerHTML = `<button id="btnEliminarPedido">Borrar Pedido</button>`;
      listaCarrito.appendChild(divBorrar); 
      let borrarTodoCarro = document.getElementById(`btnEliminarPedido`); 
    borrarTodoCarro.addEventListener(`click`,()=> {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'Vas a borrar todo el carrito!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!'
      }).then((result) => {
        if(result.isConfirmed) {
          BorrarCarrito();
          ActualizarStock();
          Swal.fire({
            title: 'Confirmado!',
            showConfirmButton: false,
            timer: 1500,
            icon: 'success'
          });
        };  
      }); 
    });
    let divcomprar = document.createElement(`div`);
    divcomprar.innerHTML = `<button id="btnComprar">COMPRAR</button></button>`;
    listaCarrito.appendChild(divcomprar);
    let comprar = document.getElementById(`btnComprar`);
    comprar.addEventListener(`click`,()=> {
      Swal.fire(
        'Gracias x su compra!',
        'CBU: 14300017133003874820011',
        'success'
      );
      ComprarCarrito(); 
    });
  };
};
//Crear carrito.
function MostrarCarrito(productoAgregar) { 
  let div = document.createElement(`div`);
  div.setAttribute("id", "list");
  div.innerHTML = `<img id="imgCarro" src="${productoAgregar.imagen}">
                   <p id="cantidad${productoAgregar.codigo}">${productoAgregar.cantidad}</p>
                   <p>${productoAgregar.nombre}</p>
                   <p id="precioCarro${productoAgregar.codigo}">$${productoAgregar.precio}</p>
                   <button class="btnEliminar" id="btnEliminar${productoAgregar.codigo}"><i class="fa-solid fa-trash-can"></i></button>`;
  document.getElementById("contenedor").appendChild(div);
  SumarCarrito();
  EliminarProducto(productoAgregar); 
}
//Eliminar productos del carrito.
function EliminarProducto(productoAgregar) {
  let btnEliminar = document.getElementById(`btnEliminar${productoAgregar.codigo}`);
  btnEliminar.addEventListener(`click`,()=> {
    if(productoAgregar.cantidad > 1) {
      let precioCard = document.getElementById(`precio${productoAgregar.codigo}`).innerText;
      productoAgregar.cantidad--;
      productoAgregar.precio -= precioCard;
      document.getElementById(`cantidad${productoAgregar.codigo}`).innerHTML = `<p id="cantidad${productoAgregar.cantidad}">${productoAgregar.cantidad}</p>`;
      document.getElementById(`precioCarro${productoAgregar.codigo}`).innerHTML = `<p id="precioCarro${productoAgregar.codigo}">$${productoAgregar.precio}</p>`;
      ActualizarEliminar(productoAgregar);
    }else{
      carrito = carrito.filter(item => item.codigo !== productoAgregar.codigo);
      btnEliminar.parentElement.remove();
      ActualizarEliminar(productoAgregar);
    };
  });
};
//Actualizacion para reducir codigo en eliminar.
function ActualizarEliminar(producto) {
  SumarStock(producto);
  SumarCarrito();
  ContadorMermaCarrito();
};
//Suma del carrito.
function SumarCarrito() {
  precioTotal.innerText = carrito.reduce((acc,num)=> acc + num.precio, 0);
  let tototalCarrito = document.getElementById("total").innerText;
  if(tototalCarrito == 0) {
    document.getElementById("iconoCarrito").style.color = "rgb(14, 46, 14)";
    document.getElementById(`esconder`).style.display = "none";
    let elimPedido = document.getElementById("btnEliminarPedido");
    let botonComprar = document.getElementById("btnComprar");
    elimPedido.parentElement.remove(); 
    botonComprar.parentElement.remove(); 
    location.hash = "#";
  };
};
//Comprar carrito.
function ComprarCarrito() {
  BorrarCarrito();
  location.hash = "#";
};
//Borrar todo el carrito.
function BorrarCarrito() {
  localStorage.clear();
  document.getElementById('contenedor').innerHTML = '';
  carrito = [];
  SumarCarrito();
};
//Sumador del numero de productos en carrito.
function ContadorCarrito() {
  contador++;
  document.getElementById("contador").innerText = contador;
};
//Resta del numero de productos en carrito.
function ContadorMermaCarrito(){
  contador--;
  document.getElementById("contador").innerText = contador;
};
//Guardar en el storage el carrito.
function GuardarStorage() {
  localStorage.setItem("carroOlvidado",JSON.stringify(carritoStorage));
};
//Carga del storage al carrito.
function VerificarCargar() {
  let arrayCarrito = JSON.parse(localStorage.getItem("carroOlvidado"));
  if(arrayCarrito) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    Toastify({
      text: 'Tu carrito te espera!',
      duration: 1900,
      position: 'right',
      gravity: "top"
  }).showToast()
    CrearBotones();
    for(elemento of arrayCarrito ) {
      AgregarCarrito(elemento.codigo);
    };
  };
  setTimeout(function(){
    localStorage.clear();
  },1900);
};
