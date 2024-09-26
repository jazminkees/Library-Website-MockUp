import { prestamosServices } from "../../servicios/prestamos-servicios.js";
import { newRegister as newPrestamo } from "./prestamos-new.js";
import { editRegister as editPrestamo } from "./prestamos-new.js";

const htmlPrestamos = `
<div class="card">
   <div class="card-header">
   
   <h3 class="card-title"> 
       <a class="btn bg-dark btn-sm btnAgregarPrestamo" href="#/newPrestamo">Agregar Préstamo</a>
   </h3>

   </div>

   <!-- /.card-header -->
   <div class="card-body">            
   <table id="prestamosTable" class="table table-bordered table-striped tablePrestamo" width="100%">
       <thead>
           <tr>
           <th>#</th>
           <th>Libro</th>
           <th>Usuario</th>
           <th>Fecha Préstamo</th>
           <th>Fecha Devolución</th>
           <th>Acciones</th>
           </tr>
       </thead>
   
   </table>
   </div>
   <!-- /.card-body -->
</div> `;

export async function Prestamos() {
    let d = document;
    let res = '';
    d.querySelector('.contenidoTitulo').innerHTML = 'Prestamos';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Prestamos";
    d.querySelector('.rutaMenu').setAttribute('href', "#/prestamos");
    let cP = d.getElementById('contenidoPrincipal');

    try {
        res = await prestamosServices.listar();
        res.forEach(element => {
            element.libro_nombre = element.libro.titulo; // Asumiendo que el título del libro está en el campo `titulo` de `libro`
            element.usuario_nombre = element.usuario.nombre; // Usar solo el campo `nombre` de `usuario`
            element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarPrestamo' href='#/editPrestamo' data-idPrestamo='" + element.id + "'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarPrestamo' href='#/delPrestamo' data-idPrestamo='" + element.id + "'><i class='fas fa-trash'></i></a></div>";
        });
        cP.innerHTML = htmlPrestamos;
        llenarTabla(res);

        let btnAgregar = d.querySelector(".btnAgregarPrestamo");
        btnAgregar.addEventListener("click", agregar);
    } catch (error) {
        console.error("Error al listar préstamos:", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al listar los préstamos.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

function enlazarEventos(oSettings){
    let d = document;
    let btnEditar = d.querySelectorAll(".btnEditarPrestamo");
    let btnBorrar = d.querySelectorAll(".btnBorrarPrestamo");
    for(let i = 0; i < btnEditar.length; i++){
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    } 
}

function agregar(){
    newPrestamo();
}

function editar(){
    let id = parseInt(this.getAttribute('data-idPrestamo'), 10);
    editPrestamo(id);
}

async function borrar(){
    let id = parseInt(this.getAttribute('data-idPrestamo'), 10);
    let borrar = 0;
    await Swal.fire({
        title: 'Está seguro que desea eliminar el registro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `Cancelar`,
        focusDeny: true
    }).then((result) => {
        if (result.isConfirmed) {
            borrar = 1;
        } else if (result.isDenied) {
            borrar = 0;
            Swal.fire('Se canceló la eliminación', '', 'info');
        }
    });
    if (borrar === 1) {
        try {
            await prestamosServices.borrar(id);
            Swal.fire({
                title: 'Préstamo eliminado',
                text: 'El préstamo se ha eliminado exitosamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "#/prestamos";
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el préstamo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

function llenarTabla(res){ 
    let dtable = new DataTable('#prestamosTable', {
        responsive: true,
        data: res,
        columns: [
            { data: 'id' },
            { data: 'libro_nombre' }, // Mostrar el nombre del libro
            { data: 'usuario_nombre' }, // Mostrar el nombre completo del usuario
            { data: 'fecha_prestamo' },
            { data: 'fecha_devolucion' },
            { data: 'action', "orderable": false }
        ],
        fnDrawCallback: function (oSettings) {
            enlazarEventos(oSettings);
        },
        deferRender: true,
        retrieve: true,
        processing: true,
        language: {
            sProcessing: "Procesando...",
            sLengthMenu: "Mostrar _MENU_ registros",
            sZeroRecords: "No se encontraron resultados",
            sEmptyTable: "Ningún dato disponible en esta tabla",
            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix: "",
            sSearch: "Buscar:",
            sUrl: "",
            sInfoThousands: ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior"
            },
            oAria: {
                sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
}
