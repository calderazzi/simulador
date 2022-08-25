let carrito = []; //Array carrito de compras.
let carritoStorage = [];
const listaCarrito = document.getElementById(`carro`); //Contenedor lista del carrito.
const precioTotal = document.getElementById(`total`); //Precio total del carrito.
let contador = document.getElementById("contador").innerText;

function AgregarCarrito(prod) {
  let estaEnCarrito = carrito.find(product => product.codigo === prod); //Buscar en el carrito el producto.
  if(estaEnCarrito) { //Si esta...
    let precioCard = document.getElementById(`precio${prod}`).innerText; //Traer precio.
    let stockCard = document.getElementById(`stockCard${prod}`).innerText; //Traer el stock del producto.
    if(stockCard > 0) { //Si hay stock...
    estaEnCarrito.cantidad++; //agregamos 1.
    estaEnCarrito.precio += Number(precioCard); //Sumamos el precio.
    document.getElementById(`cantidad${estaEnCarrito.codigo}`).innerHTML = `<p id="cantidad${estaEnCarrito.cantidad}">${estaEnCarrito.cantidad}</p>`; //Cambiar la cantidad del producto.
    document.getElementById(`precioCarro${estaEnCarrito.codigo}`).innerHTML = `<p id="precioCarro${estaEnCarrito.codigo}">$${estaEnCarrito.precio}</p>`; //Cambiar el sub total del producto.
    MermarStock(estaEnCarrito); 
    SumarCarrito(); 
    carritoStorage.push(estaEnCarrito);
    GuardarStorage(); 
    SinStock(estaEnCarrito.codigo); 
    ContadorCarrito();

    }
  }else{ //Si no esta en el carrito.
    let contenedor = document.createElement(`div`); //Creación de div.
    contenedor.setAttribute("id", "contenedor"); //Id al div.
    listaCarrito.appendChild(contenedor); //Agregamos un hijo en el contenedor.
    let productoAgregar = arrayProductos.find(item=> item.codigo == prod); //Buscamos el producto en el array de productos.
    productoAgregar.cantidad = 1; //Ingresar su cantidad.
    carrito.push(productoAgregar); //Agregar el producto al carrito.
    CrearBotones(); //Crear los botones del carrito.
    document.getElementById(`esconder`).style.display = "flex"; //Mostrar el total.
    MermarStock(productoAgregar); 
    MostrarCarrito(productoAgregar); 
    carritoStorage.push(productoAgregar);
    GuardarStorage(); 
    ContadorCarrito();
  }
}

function CrearBotones() {
  if(carrito.length == 1) { //si tiene 1 producto.
    document.getElementById("iconoCarrito").style.color = "blue" //pintar el carrito.
    let divBorrar = document.createElement(`div`); //Crer un div.
      divBorrar.innerHTML = `<button id="btnEliminarPedido">Borrar Pedido</button>`; //Crear el bóton de eliminar todo el pedido.
      listaCarrito.appendChild(divBorrar);  //Agregar el botón a la lista del carrito.
      let borrarTodoCarro = document.getElementById(`btnEliminarPedido`); //Id botón eliminar.
    borrarTodoCarro.addEventListener(`click`,()=> { //Escucha del botón borrar.
      Swal.fire({ //Sweet alert al borrar todo el carrito.
        title: 'Estas seguro?',
        text: 'Vas a borrar todo el carrito!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          BorrarCarrito();
          ActualizarStock();
          Swal.fire({
            title: 'Confirmado!',
            showConfirmButton: false,
            timer: 1500,
            icon: 'success'
          })
        }      
      })   
    })
    let divcomprar = document.createElement(`div`); //Creación div.
    divcomprar.innerHTML = `<button id="btnComprar">COMPRAR</button></button>`; //Creación botón comprar carrito.
    listaCarrito.appendChild(divcomprar); //Agregar botón al carrito.
    let comprar = document.getElementById(`btnComprar`); //Id botón comprar.
    comprar.addEventListener(`click`,()=> { //Escucha del botón comprar.
      Swal.fire( //Sweet alert al comprar el carrito.
        'Gracias x su compra!',
        'CBU: 14300017133003874820011',
        'success'
      )
      ComprarCarrito(); 
    })  
  }  
}

function MostrarCarrito(productoAgregar) { 
  let div = document.createElement(`div`); //Creación de div.
  div.setAttribute("id", "list"); //Id del div.
  div.innerHTML = `<img id="imgCarro" src="${productoAgregar.imagen}">  <p id="cantidad${productoAgregar.codigo}">${productoAgregar.cantidad}</p>  ${productoAgregar.nombre}<p id="precioCarro${productoAgregar.codigo}">$${productoAgregar.precio}</p> <button class="btnEliminar" id="btnEliminar${productoAgregar.codigo}"><i class="fa-solid fa-trash-can"></i></button>`; //Creación de la estructura html del producto en el carrito.
  document.getElementById("contenedor").appendChild(div); //Creación de un hijo en el contenedor.
  SumarCarrito();
  EliminarProducto(productoAgregar); 
}

function EliminarProducto(productoAgregar) {
  let btnEliminar = document.getElementById(`btnEliminar${productoAgregar.codigo}`); //Id del boton eliminar producto.
  btnEliminar.addEventListener(`click`,()=> { //Escucha del botón eliminar.
    if(productoAgregar.cantidad > 1){ //Si la cantidad es mayor a 1...
      let precioCard = document.getElementById(`precio${productoAgregar.codigo}`).innerText;
      productoAgregar.cantidad--; //Merma 1 producto.
      productoAgregar.precio -= precioCard;
      document.getElementById(`cantidad${productoAgregar.codigo}`).innerHTML = `<p id="cantidad${productoAgregar.cantidad}">${productoAgregar.cantidad}</p>`; //Cambio de la cantidad en el carrito.
      document.getElementById(`precioCarro${productoAgregar.codigo}`).innerHTML = `<p id="precioCarro${productoAgregar.codigo}">$${productoAgregar.precio}</p>`; //Cambio del subtotal en el carrito.
      SumarStock(productoAgregar);
      SumarCarrito();
      ContadorMermaCarrito();
    }else{ //Si es menor a 1...
      carrito = carrito.filter(item => item.codigo !== productoAgregar.codigo); //Filtrar todos los productos que no sean el que se va a eliminar.
      btnEliminar.parentElement.remove(); //Eliminar el div que contiene el producto.
      SumarStock(productoAgregar);
      SumarCarrito();
      ContadorMermaCarrito();
    }
  })
}

function SumarCarrito() {
  precioTotal.innerText = carrito.reduce((acc,num)=> acc + num.precio, 0); //Suma del precio total del carrito.
  let tototalCarrito = document.getElementById("total").innerText; //Agregar el total.
  if(tototalCarrito == 0) { //Si es igual a 0...
    document.getElementById("iconoCarrito").style.color = "rgb(14, 46, 14)" //Volver el carrito al color original.
    document.getElementById(`esconder`).style.display = "none"; //Esconder el precio.
    let elimPedido = document.getElementById("btnEliminarPedido"); //Id botón eliminar pedido.
    let botonComprar = document.getElementById("btnComprar"); //Id botón comprar pedido.
    elimPedido.parentElement.remove(); 
    botonComprar.parentElement.remove(); 
    location.hash = "#"; //Cerrar carrito.
  }
}

function ComprarCarrito() {
  BorrarCarrito();
  location.hash = "#"; //Cerrar carrito.
}

function BorrarCarrito() {
  localStorage.clear(); //Borrar el storage.
  document.getElementById('contenedor').innerHTML = ''; //Borrar el contenedor del carrito.
  carrito = []; //Borrar el carrito.
  SumarCarrito();
}

function ContadorCarrito() {
  contador++;
  document.getElementById("contador").innerText = contador;
}
function ContadorMermaCarrito(){
  contador--;
  document.getElementById("contador").innerText = contador;
}

function GuardarStorage() {
  localStorage.setItem("carroOlvidado",JSON.stringify(carritoStorage)); //Guarda en storage.
}

function VerificarCargar() {
  let arrayCarrito = JSON.parse(localStorage.getItem("carroOlvidado")); //Trae el carrito de la storage.
  if(arrayCarrito) { //Si hay algo...
    const Toast = Swal.mixin({ //Sweet alert tu carrito espera.
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toastify({
      text: 'Tu carrito te espera!',
      duration: 1900,
      position: 'right',
      gravity: "top"
  }).showToast()

    //Agregar al carrito el array de storage
    CrearBotones();

    for(elemento of arrayCarrito ) {
      AgregarCarrito(elemento.codigo);
    }
  }
  setTimeout(function(){
    localStorage.clear();
  },1900);
}
