
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
  Buscar();
}

function Buscar() {
  let articulos = document.getElementById("articulos");
  articulos.addEventListener(`click`, ()=> {
    let listaProd = document.getElementById("listaArticulos");
    arrayProductos.forEach(prod => { 
      let div = document.createElement(`div`);
      div.className = `content`;
      div.innerHTML = `<p>Hay ${prod.stock} ${prod.nombre} en stock.</p>`
      listaProd.appendChild(div);
    })
  })
}

