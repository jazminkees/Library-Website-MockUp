import { usuariosServices } from "/servicios/usuarios-servicios.js";


const htmlAmUsuarios = `
<div class="card card-dark card-outline">
	
	<form  class="needs-validation frmAmUsuario "   enctype="multipart/form-data">
	
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
                    id="usuarioNombre"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>

				<!--=====================================
                Email
                ======================================-->

				<div class="form-group mt-2">
					
					<label>Email</label>

					<input 
					type="text" 
					class="form-control"
					onchange="validateJS(event,'text')"
					name="email"
                    id="usuarioEmail"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>

		


				<!--=====================================
                Contraseña
                ======================================-->

				<div class="form-group mt-2">
					
					<label>Password</label>

					<input 
					type="password" 
					class="form-control"
					onchange="validateJS(event,'pass')"
					name="password"
                    id="usuarioPassword" 
					required
					>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>


				<!--=====================================
	         Rol
                ======================================-->

                <div class="form-group mt-2">
					
					<label>Rol</label>

					<input 
					type="text" 
					class="form-control"
					onchange="validateJS(event,'text')"
					name="rol"
                    id="usuarioRol"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>


			
			</div>
		

		</div>

		<div class="card-footer">
			
			<div class="col-md-8 offset-md-2">
	
				<div class="form-group mt-3">

					<a href="#/usuarios" class="btn btn-light border text-left">Cancelar</a>
					
					<button type="submit" class="btn bg-dark float-right">Guardar</button>

				</div>

			</div>

		</div>


	</form>


</div> `;
var formulario='';
var txtNombre='';
var txtId='';
var txtEmail='';
var txtPass='';
var txtRol='';
let userId=0;

export async function newRegister(){
    let d = document;
    
    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Usuario';
	d.querySelector('.contenidoTituloSec').innerHTML += 'Agregar';
   
    crearFormulario();

    formulario = d.querySelector(".frmAmUsuario")
    formulario.addEventListener("submit", guardar);
	
}

export async function editRegister(id){
    let d = document;
    userId = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Usuario';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Editar';
    crearFormulario();

    formulario = d.querySelector(".frmAmUsuario")
    formulario.addEventListener("submit", modificar);
    let usuario =  await usuariosServices.listar(id);

    txtNombre.value= usuario.nombre;
    txtRol.value= usuario.rol;
	txtPass.value=usuario.password;
    txtEmail.value= usuario.email;

	

}

function crearFormulario(){
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Usuarios";
    d.querySelector('.rutaMenu').setAttribute('href',"#/usuarios");

    let cP =d.getElementById('contenidoPrincipal');
    cP.innerHTML =  htmlAmUsuarios;
    
    var script = document.createElement( "script" );
    script.type = "text/javascript";
    script.src = '../controladores/validaciones.js';
    cP.appendChild(script);
    
    txtNombre= d.getElementById('usuarioNombre');
	txtEmail= d.getElementById('usuarioEmail');
	txtPass=d.getElementById('usuarioPassword');
	txtRol= d.getElementById('usuarioRol');


}

function guardar(e) {
   
    e.preventDefault();
   console.log()
   const formData = new FormData(e?.target); //es un objeto que permite transf un formulario en objeto js
		const values = Object.fromEntries(formData); // Todos los campos del formulario.
	console.log(values)
  
   usuariosServices.crear(values.nombre, values.email, values.password,values.rol)
         .then(respuesta => {

             formulario.reset();
             window.location.href = "#/usuarios";

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
    usuariosServices.editar(userId, values.nombre,values.email,values.password,values.rol)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/usuarios";

        })
        .catch(error => console.log(error))        

}   