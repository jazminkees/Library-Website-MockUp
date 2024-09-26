import { librosServices } from "../../servicios/libros-servicios.js";
import { newRegister } from "./libros-new.js";
import { editRegister } from "./libros-new.js";

var dtable;

const htmlLibros = `
<div class="card">
   <div class="card-header">
   
   <h3 class="card-title"> 
       <a class="btn bg-dark btn-sm btnAgregarLibro" href="#/newLibro">Agregar Libro</a>
   </h3>

   </div>

   <!-- /.card-header -->
   <div class="card-body">            
   <table id="librosTable" class="table table-bordered table-striped tableLibro" width="100%">
       <thead>
           <tr>
           <th>#</th>
           <th>Titulo</th>
           <th>Autor</th>
           <th>Año</th>
           <th>ISBN</th>
           <th>Editorial</th>
           <th>Categoría</th>
           <th>Prestado</th>
           <th>Acciones</th>
           </tr>
       </thead>
   
   </table>
   </div>
   <!-- /.card-body -->
</div> `;

export async function Libros() {
    let d = document;
    let res = '';
    d.querySelector('.contenidoTitulo').innerHTML = 'Libros';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Libros";
    d.querySelector('.rutaMenu').setAttribute('href', "#/libros");
    let cP = d.getElementById('contenidoPrincipal');
    
    try {
        res = await librosServices.listar();
        console.log("Datos para la tabla:", res); // Verificar los datos

        // Añadir el campo de acciones a cada elemento
        res.forEach(element => {
            element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarLibro' href='#/editLibro' data-idLibro='"+ element.id +"'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarLibro'href='#/delLibro' data-idLibro='"+ element.id +"'><i class='fas fa-trash'></i></a></div>";
        });

        console.log("Datos con acciones añadidas:", res); // Verificar datos con acciones
        cP.innerHTML = htmlLibros;
        llenarTabla(res);
        
        let btnAgregar = d.querySelector(".btnAgregarLibro");
        btnAgregar.addEventListener("click", agregar);
    } catch (error) {
        console.error("Error al listar libros:", error);
    }
}

function llenarTabla(res) {
    console.log("Datos pasados a DataTable:", res); // Verificar los datos que se pasan a DataTable
    dtable = new DataTable('#librosTable', {
        responsive: true,
        data: res,
        columns: [
            { data: 'id' },
            { data: 'titulo' },
            { data: 'autor' },
            { data: 'anio' },
            { data: 'isbn' },
            { data: 'editorial' },
            { data: 'categoria_id' },
            { data: 'prestado', "orderable": false },
            { data: 'action', "orderable": false } // Asegurarse de que 'action' se incluye en las columnas
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

function enlazarEventos() {
    let d = document;
    let btnEditar = d.querySelectorAll(".btnEditarLibro");
    let btnBorrar = d.querySelectorAll(".btnBorrarLibro");
    for(let i = 0; i < btnEditar.length; i++) {
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    } 
}

function agregar() {
    newRegister();
}

function editar() {
    let id = parseInt(this.getAttribute('data-idLibro'), 10);
    editRegister(id);
}

async function borrar() {
    let id = parseInt(this.getAttribute('data-idLibro'), 10);
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
        librosServices.borrar(id)
            .then(() => {
                Swal.fire({
                    title: 'Libro eliminado',
                    text: 'El libro se ha eliminado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = "#/libros";
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el libro.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }
}
