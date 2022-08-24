
let ingresar = document.getElementById("ingresar");

ingresar.addEventListener(`click`, ()=> {
  let nombreIngresado = document.getElementById("nombre").value;
  let passwordIngresado = document.getElementById("password").value;
  arrayUsuarios.forEach(usuario => {
    if(nombreIngresado == usuario.nombre && passwordIngresado == usuario.clave) {
      Ingresar();
    }else {
      Swal.fire(
        'Loguin incorrecto!',
        'Vuelva a intetnarlo',
        'error'
      )
    }
  })
})

function Ingresar() {
  Swal.fire(
    'Loguin correcto!',
    '',
    'success'
  )
  document.getElementById("form").style.display = "none"
  document.getElementById("articulos").style.display = "block"
  
  let checked = document.getElementById("articulos");
  checked = addEventListener("change", Radios, false);
  // radios = document.querySelector(`input[name="prioridad"]:checked`);
}

function Radios() {
  let radios = document.querySelector(`input[name="prioridad"]:checked`);
  if(radios.value == "productos") {
    Buscar();
  } else if (radios.value == "stock menor a mayor") {
    OrdenarStock();
  } else {
    OrdenarPrecio();
  }
}

function Buscar() {
    let listaProd = document.getElementById("listaArticulos");
    listaProd.innerHTML = "";
    arrayProductos.forEach(prod => { 
      let div = document.createElement(`div`);
      div.className = `content`;
      div.innerHTML = `<p>Cod: ${prod.codigo} - ${prod.stock} ${prod.nombre} ${prod.precio} </p>`
      listaProd.appendChild(div);
    })
  
}
function OrdenarStock() {
  let nuevoArray = arrayProductos.sort(((a,b)=> a.stock - b.stock));
  let listaProd = document.getElementById("listaArticulos");
  listaProd.innerHTML = "";
  nuevoArray.forEach(prod => {
    let div = document.createElement(`div`);
      div.className = `content`;
      div.innerHTML = `<p>Hay ${prod.stock} ${prod.nombre} en stock.</p>`
      listaProd.appendChild(div);
})
}

function OrdenarPrecio() {
  let nuevoArray = arrayProductos.sort(((a,b)=> a.precio - b.precio));
  let listaProd = document.getElementById("listaArticulos");
  listaProd.innerHTML = "";
  nuevoArray.forEach(prod => {
    let div = document.createElement(`div`);
      div.className = `content`;
      div.innerHTML = `<p>${prod.stock} ${prod.nombre} $${prod.precio}</p>`
      listaProd.appendChild(div);
  })

}