/**ESTE COMPONENTE SE ENCARGA DE MOSTRAR EL DETALLE DE UN PRODUCTO */
import { vehiculosServices } from "../../../servicios/vehiculos-servicios.js";
import { reservasServices } from "../../../servicios/reservas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";

export async function vistaVehiculo(){
    /**1-En esta función se deben capturar los elementos html: .carrusel, .seccionProducto, .seccionLogin. Para luego 
     * blanquear su contenido. 
     * 2-Se deberá capturar el elemento .vistaProducto.
     * 3-Se deberá llamar a la función leerParametro para recuperar de la url el idProducto. 
     * 4-Luego se deberán leer los datos del producto indentificado con el idProducto recuperado.
     * 5-Llamar a la función htmlVistaProducto.
     * 6-El resultado de la función deberá asignarse al elemento .vistaProducto capturado previamente.
     * 7-Se deberá capturar el elemento html correspondiente al anchor btnComprar y enlazar el evento click a la función registrarCompra.  
    */
    let d = document;
    let res;
    let carrusel = d.querySelector(".carrusel");
    let seccionVehiculos = d.querySelector(".seccionVehiculos");
    let vistaVehiculo = d.querySelector(".vistaVehiculo");
    carrusel.innerHTML = "";
    let seccionLogin = d.querySelector(".seccionLogin");
    seccionLogin.innerHTML = "";
    seccionProductos.innerHTML = "";
    let idProducto = leerParametro();
    
    res = await vehiculosServices.listar(idVehiculo);
   
    
    vistaVehiculo.innerHTML =  htmlVistaVehiculo(res.id, res.marca, res.modelo, res.anio, res.capacidad, res.categoria_id);
    /*Se debe capturar el boton commprar y el input cantidad*/

    let btnComprar = d.getElementById("btnComprar");
    

    btnComprar.addEventListener("click", registrarCompra);
}

function htmlVistaVehiculo(id, marca, modelo, anio, capacidad, categoria_id) {
    /**1- ESTA FUNCION RECIBE COMO PARAMETRO los siguiente datos id, nombre, descripcion, precio e imagen del producto */
    /**2- A ESTOS PARAMETROS LOS CONCATENA DENTRO DEL CODIGO CORRESPONDIENTE AL COMPONENTE vistaProducto ( ASSETS/MODULOS/vistaProducto.html)*/
    /**3- POR ULTIMO DEVUELVE LA CADENA RESULTANTE. */
    /**4- SE RECUERDA QUE PARA PODER HACER LA INTERPOLACION DE CADENAS ${NOMBRE_VARIABLE} EL TEXTO DEBE ESTAR ENTRE LAS COMILLAS ` `. 
     *  
     *  ejemplo
     *   let titulo = 'Señora';  
     *   let cadena = `Hola, ${titulo} Claudia  en que podemos ayudarla`;
     *   
    */
    let cad=
            `
           
            <div class="texto">
                <p id="nameVehiculo" data-idVehiculo=${id}>${modelo}</p>

                <p id="descripcionVehiculo">${marca}</p>

                <p id="anioVehiculo">${anio}</p>

                <div class="form-group">
                    <label for="cantidadVehiculo">Cantidad</label>
                    <input type="number" step="1" min ="1" value="1" id="cantidadVehiculo">
                </div>

                <a id="btnComprar" >Reservar</a>
            </div>`;
    return cad;
}
function leerParametro(){
    // Captura el idProducto de la dirección URL enviada por la página que llama
    const words = new URLSearchParams(window.location.search);
    let cad = words.get("idVehiculo");
    if (!cad) return null;
    return cad.trim();
}


async function registrarReserva(){
    /**1-Esta función es la encargada de procesar el evento click del anchor btnComprar.
     * 2-Luego deberá recuperar con la función getUsuarioAutenticado presente en el módulo login.js el objeto session
     * 3-Si la propiedad autenticado del objeto session es falso, el usuario no ha iniciado sesión, y se deberá emitir 
     *   una alerta que comunique al usuario que antes de realizar una compra debe haber iniciado sesión y salir de la 
     * ejecución de la función.
     * 4-Si la propiedad autenticado es true la ejecución continua.
     * 5-En este punto se deben almacenar los datos necesario para registrar la venta.
     * 5-Necesitamos idUsuario, emailUsuario, idProducto, nameProducto, cantidad y fecha.
     * 6-Los dos primeros los extraemos del objeto session.
     * 7-El resto de los datos los capturamos desde el objeto document utilizando los id: nameProducto, cantidadProducto. 
     *   El idProducto lo recuperamos desde el atributo data-idproducto y a fecha la obtenemos desde la fecha del sistema con
     *   el objeto Date() de javascript.
     * 8-Una vez reunido todos los datos necesarios llamamos a la función ventasServices.crear pasando lo parámetros obtenidos. 
     * 9-Luego de registrar la venta utilizando el objeto location.replace("tienda.html") renderizamos nuevamente la página 
     *   dejando el sitio en el estado inicial.
     * 10-Finalmente emitimos una alerta con la leyenda "Compra finalizada."
     *     
     */
    let d = document;
    let session = getUsuarioAutenticado();
    if(! session.autenticado){
        alert("Antes de reservar debe iniciar sesión")
        return;
    }
    let cantidad = d.getElementById("cantidadVehiculo").value;
   // let anchorLogin = d.querySelector(".login a['data-emailUsuario']");
    let idUsuario = session.idUsuario
    //let emailUsuario = anchorLogin.getAttribute("emailUsuario");
    let emailUsuario = session.email;
    let nameVehiculo= d.getElementById("nameProducto") ;
    let idVehiculo = nameVehiculo.getAttribute("data-idVehiculo");
    let fecha = new Date()
    fecha = formatearFecha(fecha)
    let res = await reservasServices.crear(idVehiculo, idUsuario, fecha_reserva, fecha_devolucion);
    location.replace("tienda.html");
    alert('Reserva realizada');
}

function formatearFecha(date){
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10){
      return(`${year}-0${month}-${day}`)
    }else{
      return(`${year}-${month}-${day}`)
}
}