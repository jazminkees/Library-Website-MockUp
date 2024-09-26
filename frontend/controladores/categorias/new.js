import { categoriasServices } from "/servicios/categorias-servicios.js";


const htmlAmCategorias = `
<div class="card card-dark card-outline">
	
	<form  class="needs-validation frmAmCategoria "   enctype="multipart/form-data">
	
		<div class="card-header">
               
			<div class="col-md-8 offset-md-2">	
               
				<!--=====================================
                Nombre
                ======================================-->
				
				<div class="form-group mt-5">
					
					<label>Nombre</label>

					<input 
					type="text" 
					class="form-control"
					pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}"
					onchange="validateJS(event,'text')"
					name="nombre"
                    id="categoriaNombre"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>

				<!--=====================================
                Descripcion
                ======================================-->

				<div class="form-group mt-2">
					
					<label>Descripción</label>

					<input 
					type="text" 
					class="form-control"
					onchange="validateJS(event,'text')"
					name="descripcion"
                    id="categoriaDescripcion"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>

		</div>

		<div class="card-footer">
			
			<div class="col-md-8 offset-md-2">
	
				<div class="form-group mt-3">

					<a href="#/categorias" class="btn btn-light border text-left">Cancelar</a>
					
					<button type="submit" class="btn bg-dark float-right">Guardar</button>

				</div>

			</div>

		</div>


	</form>


</div> `;
var formulario='';
var txtNombre='';
var txtDescripcion = '';
let catId=0;

export async function newRegister(){
    let d = document;
    
    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Categoría';
	d.querySelector('.contenidoTituloSec').innerHTML += 'Agregar';
   
    crearFormulario();

    formulario = d.querySelector(".frmAmCategoria")
    formulario.addEventListener("submit", guardar);
	
}

export async function editRegister(id){
    let d = document;
    catId = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Categoría';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Editar';
    crearFormulario();

    formulario = d.querySelector(".frmAmCategoria")
    formulario.addEventListener("submit", modificar);
    let categoria =  await categoriasServices.listar(id);

    txtNombre.value= categoria.nombre;
    txtDescripcion.value = categoria.descripcion


}

function crearFormulario(){
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Categorias";
    d.querySelector('.rutaMenu').setAttribute('href',"#/categorias");

    let cP =d.getElementById('contenidoPrincipal');
    cP.innerHTML =  htmlAmCategorias;
    
    var script = document.createElement( "script" );
    script.type = "text/javascript";
    script.src = '../controladores/validaciones.js';
    cP.appendChild(script);
    
    txtNombre= d.getElementById('categoriaNombre');
	txtDescripcion = d.getElementById('categoriaDescripcion');

}

function guardar(e) {
   
    e.preventDefault();
   console.log()
   const formData = new FormData(e?.target); //es un objeto que permite transf un formulario en objeto js
		const values = Object.fromEntries(formData); // Todos los campos del formulario.
	console.log(values)
  
   categoriasServices.crear(values.nombre, values.descripcion)
         .then(respuesta => {

             formulario.reset();
             window.location.href = "#/categorias";

         })
         .catch(error => console.log(error))        

}   
//window.guardar = guardar 

function modificar(e) {
   
    e.preventDefault();
	console.log()
	const formData = new FormData(e?.target); //es un objeto que permite transf un formulario en objeto js
		 const values = Object.fromEntries(formData); // Todos los campos del formulario.
	 console.log(values)
	 //id,nombre, email, password,rol
    categoriasServices.editar(catId, values.nombre, values.descripcion)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/categorias";

        })
        .catch(error => console.log(error))        

}   