//Api del clima.
const apiKey = `dcacea55e6bce077bd20412a0dc1c31f`;
const fetchData = position => {
  const {latitude, longitude} = position.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => setWeatherData(data))
};
const setWeatherData = data => {
  let temperatura = document.getElementById("temperatura");
  temperatura.innerHTML = `La Temperatura en ${data.name} es de ${data.main.temp}°`
  if(Number(data.main.temp) > 16) {
    Swal.fire({
      title: 'Lindo día para comprar productos de verano!',
      showConfirmButton: false,
      timer: 2500,
      icon: 'success'
    });
  }else {
    Swal.fire({
      title: 'Que frío! A comprar productos de invierno!',
      showConfirmButton: false,
      timer: 2500,
      icon: 'success'
    });
  };
};
const onLoad = ()=> {
  navigator.geolocation.getCurrentPosition(fetchData);
};
let listaProductos = document.getElementById(`container`);
//Api de github.
fetch('https://api.github.com/users/calderazzi')
    .then((resp) => resp.json())
    .then((data) => {
      let avatar = document.getElementById("avatar");
      avatar.innerHTML = `<img class="avatar" src="${data.avatar_url}">`;
    }).catch(error=> {
          Swal.fire("error");
      });
  //Traer productos de la base de datos.
const retornarProductos =() => {
  return new Promise((resolve) => {
    setTimeout(()=> {
      document.getElementById("principio").style.display = "none";
      document.getElementById("barra").style.display = "none";
      document.getElementById("nav").style.display = "flex";
      document.getElementById("body").style.backgroundImage = "radial-gradient(rgb(35, 35, 142), rgb(23, 170, 94))"
      document.getElementById("containerInputs").style.display = "block"
      resolve(arrayProductos);
    },3000);
  });
};
//Retornar los productos traidos de la base de datos.
retornarProductos().then((respuesta)=>{
  listadoDeProductos = respuesta;
  MostrarProductos(listadoDeProductos);
});
const nombreProductoAgregar = document.getElementById(`nombreProductoBuscar`);
nombreProductoAgregar.addEventListener(`input`, () => {
  let encontrados = listadoDeProductos.filter(({nombre}) => {
    return nombre.toLowerCase().includes(nombreProductoAgregar.value.toLowerCase());
  });
  MostrarProductos(encontrados);
});
//Busqueda por precio.
const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener(`click`, ()=> {
  let desde = document.getElementById("desde").value;
  let hasta = document.getElementById("hasta").value;
  Resetear();
  let encontrados = listadoDeProductos.filter(({precio})=> {
  return Number(precio) >= desde && Number(precio) <= hasta;
  });
  MostrarProductos(encontrados);
});
//Reseteado de la busqueda por precio.
function Resetear() {
  document.getElementById("desde").value = '';
  document.getElementById("hasta").value = '';
  const volver = document.getElementById("volver");
  volver.style.display = "contents";
  volver.addEventListener(`click`, ()=> {
    MostrarProductos(listadoDeProductos);
    volver.style.display = "none";
  });
};
//Muestra los productos.
function MostrarProductos(array) {
  listaProductos.innerHTML = "";
  if(array.length === 0) {
    document.getElementById("volver").style.display = "none";
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
      text: 'No hay productos!',
      duration: 1900,
      position: 'left',
      gravity: "top"
  }).showToast();
    MostrarProductos(listadoDeProductos);
  };
  array.forEach(({codigo, nombre, imagen, descripcion, stock, precio}) => {
    let div = document.createElement(`div`);
    div.className = `container`;
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
                    </div>`;
    listaProductos.appendChild(div);
    let btnAgregar = document.getElementById(`btn${codigo}`);
    btnAgregar.addEventListener(`click`,()=> {
      AgregarCarrito(codigo); 
      SinStock(codigo); 
    });
  });
  VerificarCargar();
};
