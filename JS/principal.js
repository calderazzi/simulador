//Tiempo de espera mostrando imagen.
setTimeout(function(){
document.getElementById("principio").style.display = "none"; //Sacando la imagen de entrada.
document.getElementById("barra").style.display = "none"; //Ocultando barra de carga.
document.getElementById("nav").style.display = "flex"; //Mostrando Navegación.
document.getElementById("body").style.backgroundImage = "radial-gradient(rgb(35, 35, 142), rgb(23, 170, 94))" //Cambiando el background del body.
document.getElementById("containerInputs").style.display = "block"
let listaProductos = document.getElementById(`container`); //Contenedor de las tarjetas.

MostrarProductos(arrayProductos);
const nombreProductoAgregar = document.getElementById(`nombreProductoBuscar`);
nombreProductoAgregar.addEventListener(`input`, () => {
  let encontrados = arrayProductos.filter(({nombre}) => {
    return nombre.toLowerCase().includes(nombreProductoAgregar.value.toLowerCase());
  });
  MostrarProductos(encontrados);
});

const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener(`click`, ()=> {
  let desde = document.getElementById("desde").value;
  let hasta = document.getElementById("hasta").value;
  if(desde == 0 || hasta == 0) {
    MostrarProductos(arrayProductos)
  }
  let encontrados = arrayProductos.filter(({precio})=> {
    return Number(precio) >= desde && Number(precio) <= hasta;
  });
  MostrarProductos(encontrados);
})

function MostrarProductos(array) {
  listaProductos.innerHTML = "";
  if(array.length === 0) {
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
    })
    Toastify({
      text: 'No hay productos!',
      duration: 1900,
      position: 'left',
      gravity: "top"
  }).showToast()
    MostrarProductos(arrayProductos);
  }
  array.forEach(({codigo, nombre, imagen, descripcion, stock, precio}) => {
    // arrayProductos.forEach(prod => { 
      let div = document.createElement(`div`);
      div.className = `container`; //clase.
      div.innerHTML = `<div id="card${codigo}" class="articulo">
                        <div class="nombre"><h2>${nombre}</h2></div>
                        <div class="cont">
                        <img id="imagen${codigo}" class="imagen" src="${imagen}"><p class="descripcion">Descripción: ${descripcion}</p>
                        </div>
                        <div class="sinStock" id="sinStock${codigo}">SIN STOCK</div>
                        <div class="stock" id="stockCard${codigo}">${stock}</div>
                        <div class="precio">
                          <h3 class="pre">Precio: $</h3>
                          <h3 class="pre" id="precio${codigo}">${precio}</h3>
                        </div>
                        <div id="codigo${codigo}" class="codigo">
                          <h4>Código</h4>  
                          <h4>${codigo}</h4>
                        </div>
                          <button id="btn${codigo}" class="button"><span>AGREGAR</span></button>
                        </div>
                      </div>`; //Creando la tarjeta en el html.
    listaProductos.appendChild(div); //Agregando el div en la lista de productos.
    let btnAgregar = document.getElementById(`btn${codigo}`); //Id boton de agregar.
    btnAgregar.addEventListener(`click`,()=> { //Escucha del boton agregar.
      AgregarCarrito(codigo); 
      SinStock(codigo); 
    // })
    })
  })
}
VerificarCargar(); 


},1900);