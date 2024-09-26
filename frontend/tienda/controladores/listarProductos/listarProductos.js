import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { vehiculosServices } from "../../../servicios/vehiculos-servicios.js";

function htmlCategoria(id, categoria) {
    let cad = 
                `<div class="categorias" data-idCategoria="${id}">
                    <h1 class="categoria">${categoria}</h1>
                    <div class="Vehículos">

                        <!-- Acá listan los productos-->
                        <p class="item-vehiculo">Sin productos.</p>
                    </div>
                </div>            
                `;
    return cad; 
}

function htmlItemVehiculo(id, modelo, marca) {
    let cad = 
                `<div class="item-vehiculo">

                <p class="vehiculo_nombre" name="Megane">${modelo}</p>
                <p class="vehiculo_marca">${marca}</p>
            
                <a href="?idVehiculo=${id}#vistaVehiculo" type="button" class="vehiculo_enlace" >Ver Vehículo</a>
            
            </div>`;
    return cad; 

}

async function asignarVehiculo(id) {
    let d = document;
    let cad = "";
    let resVehiculo = await vehiculosServices.listarPorCategoria(id);

    resVehiculo.forEach(vehiculo => {
        cad += htmlItemVehiculo(vehiculo.id, vehiculo.marca, vehiculo.modelo, vehiculo.matricula, vehiculo.anio, vehiculo.categoria_id, vehiculo.capacidad);
    });
        
    let itemVehiculo = d.querySelector("[data-idCategoria='"+ id + "'] .vehiculos");
    itemVehiculo.innerHTML = cad; 
} 

export async function listarVehiculos() {
    let d = document;
     let resCat;

     let listaVehiculos = d.querySelector(".seccionVehiculos");

     listaVehiculos.innerHTML = "";
     resCat =  await categoriasServices.listar();

     resCat.forEach(element => {
        listaVehiculos.innerHTML += htmlCategoria(element.id, element.nombre, element.descripcion);
        asignarProducto(element.id);
     })
     
}