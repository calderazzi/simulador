
//Ingreso
const ingresar = document.getElementById("ingresar");
ingresar.addEventListener(`click`, ()=> {
  const nombreIngresado = document.getElementById("nombre").value;
  const passwordIngresado = document.getElementById("password").value;
  arrayUsuarios.forEach(usuario => {
    if(nombreIngresado.toLowerCase() == usuario.nombre && passwordIngresado == usuario.clave) {
      Ingresar();
    }else {
      Swal.fire(
        'Loguin incorrecto!',
        'Vuelva a intetnarlo',
        'error'
      );
    };
  });
});
//Si es correcto, ingresar.
function Ingresar() {
  Swal.fire(
    'Loguin correcto!',
    '',
    'success'
  );
  document.getElementById("form").style.display = "none";
  document.getElementById("articulos").style.display = "block";
  let checked = document.getElementById("articulos");
  checked = addEventListener("change", Radios, false);
};
//Leer los radios.
function Radios() {
  let radios = document.querySelector(`input[name="prioridad"]:checked`);
  if(radios.value == "productos") {
    MostrarProductos();
  } else if (radios.value == "stock menor a mayor") {
    OrdenarStock();
  } else {
    OrdenarPrecio();
  };
};
//Muestra los productos.
function MostrarProductos() {
    let listaProd = document.getElementById("listaArticulos");
    listaProd.innerHTML = "";
    arrayProductos.forEach(prod => { 
      let div = document.createElement(`div`);
      div.className = `content`;
      div.innerHTML = `<p>Cod: ${prod.codigo} - ${prod.stock} ${prod.nombre} ${prod.precio} </p>`;
      listaProd.appendChild(div);
    });
};
//Ordena de menor a mayor según el stock.
function OrdenarStock() {
  let nuevoArray = arrayProductos.sort(((a,b)=> a.stock - b.stock));
  let listaProd = document.getElementById("listaArticulos");
  listaProd.innerHTML = "";
  nuevoArray.forEach(prod => {
    let div = document.createElement(`div`);
      div.className = `content`;
      div.innerHTML = `<p>Hay ${prod.stock} ${prod.nombre} en stock.</p>`;
      listaProd.appendChild(div);
});
};
//Ordena de menor a mayor según el precio.
function OrdenarPrecio() {
  let nuevoArray = arrayProductos.sort(((a,b)=> a.precio - b.precio));
  let listaProd = document.getElementById("listaArticulos");
  listaProd.innerHTML = "";
  nuevoArray.forEach(prod => {
    let div = document.createElement(`div`);
      div.className = `content`;
      div.innerHTML = `<p>${prod.stock} ${prod.nombre} $${prod.precio}</p>`;
      listaProd.appendChild(div);
  });
};