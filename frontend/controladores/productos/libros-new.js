import { librosServices } from "../../servicios/libros-servicios.js";

const htmlAmLibros = `
<div class="card card-dark card-outline">
	<form class="needs-validation frmAmLibro" enctype="multipart/form-data">
		<div class="card-header">
			<div class="col-md-8 offset-md-2">
				<div class="form-group mt-5">
					<label>Titulo</label>
					<input type="text" class="form-control" pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ0-9 ]{1,}" name="titulo" id="libroTitulo" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				<div class="form-group mt-2">
					<label>Autor</label>
					<input type="text" class="form-control" name="autor" id="libroAutor" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				<div class="form-group mt-2">
					<label>Año</label>
					<input type="number" class="form-control" name="anio" id="libroAnio" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				<div class="form-group mt-2">
					<label>Isbn</label>
					<input type="text" class="form-control" name="isbn" id="libroIsbn" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">El ISBN debe tener exactamente 13 dígitos.</div>
				</div>
				<div class="form-group mt-2">
					<label>Editorial</label>
					<input type="text" class="form-control" name="editorial" id="libroEditorial" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				<div class="form-group mt-2">
					<label>Categoria_id</label>
					<input type="number" class="form-control" name="categoria_id" id="libroCategoria_id" required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
				<div class="form-group mt-2">
					<label>Prestado</label>
					<input type="checkbox" class="form-control" name="prestado" id="libroPrestado">
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Please fill out this field.</div>
				</div>
			</div>
		</div>
		<div class="card-footer">
			<div class="col-md-8 offset-md-2">
				<div class="form-group mt-3">
					<a href="#/libros" class="btn btn-light border text-left">Cancelar</a>
					<button type="submit" class="btn bg-dark float-right">Guardar</button>
				</div>
			</div>
		</div>
	</form>
</div> `;

var formulario = '';
var txtTitulo = '';
var txtAutor = '';
var txtAnio = '';
var txtIsbn = '';
var txtEditorial = '';
var txtCategoria_id = '';
var txtPrestado = '';
let libroId = 0;

export async function newRegister() {
	let d = document;

	d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Libro';
	d.querySelector('.contenidoTituloSec').innerHTML += 'Agregar';

	crearFormulario();

	formulario = d.querySelector(".frmAmLibro");
	formulario.addEventListener("submit", guardar);
	d.getElementById('libroIsbn').addEventListener('change', validateISBN); // Añadir el evento de cambio
}

export async function editRegister(id) {
	let d = document;
	libroId = id;
	d.querySelector('.contenidoTitulo').innerHTML = 'Editar Libro';
	d.querySelector('.contenidoTituloSec').innerHTML += 'Editar';
	crearFormulario();

	formulario = d.querySelector(".frmAmLibro");
	formulario.addEventListener("submit", modificar);
	d.getElementById('libroIsbn').addEventListener('change', validateISBN); // Añadir el evento de cambio
	let libro = await librosServices.listar(id);

	txtTitulo.value = libro.titulo;
	txtAutor.value = libro.autor;
	txtAnio.value = libro.anio;
	txtIsbn.value = libro.isbn;
	txtEditorial.value = libro.editorial;
	txtCategoria_id.value = libro.categoria_id;
	txtPrestado.checked = libro.prestado;
}

function crearFormulario() {
	let d = document;
	d.querySelector('.rutaMenu').innerHTML = "Libros";
	d.querySelector('.rutaMenu').setAttribute('href', "#/libros");

	let cP = d.getElementById('contenidoPrincipal');
	cP.innerHTML = htmlAmLibros;

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = '../controladores/validaciones.js';
	cP.appendChild(script);

	txtTitulo = d.getElementById('libroTitulo');
	txtAutor = d.getElementById('libroAutor');
	txtAnio = d.getElementById('libroAnio');
	txtIsbn = d.getElementById('libroIsbn');
	txtEditorial = d.getElementById('libroEditorial');
	txtCategoria_id = d.getElementById('libroCategoria_id');
	txtPrestado = d.getElementById('libroPrestado');
}

function validateISBN(event) {
	const input = event.target;
	const isbn = input.value;
	if (!/^\d{13}$/.test(isbn)) {
		input.setCustomValidity("El ISBN debe tener exactamente 13 dígitos.");
	} else {
		input.setCustomValidity("");
	}
	input.reportValidity();
}

async function guardar(e) {
	e.preventDefault();
	const formData = new FormData(e?.target);
	const values = Object.fromEntries(formData.entries());
	values.prestado = formData.has('prestado'); // Convertir el valor del checkbox a booleano
	console.log("Datos enviados:", values); // Verificar los datos enviados

	librosServices.crear(values.titulo, values.autor, values.anio, values.isbn, values.editorial, values.categoria_id, values.prestado)
		.then(respuesta => {
			formulario.reset();
			Swal.fire({
				title: 'Libro guardado',
				text: 'El libro se ha guardado exitosamente.',
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
				text: 'Hubo un problema al guardar el libro.',
				icon: 'error',
				confirmButtonText: 'OK'
			});
		});
}

async function modificar(e) {
	e.preventDefault();
	const formData = new FormData(e?.target);
	const values = Object.fromEntries(formData.entries());
	values.prestado = formData.has('prestado'); // Convertir el valor del checkbox a booleano

	librosServices.editar(libroId, values.titulo, values.autor, values.anio, values.isbn, values.editorial, values.categoria_id, values.prestado)
		.then(respuesta => {
			formulario.reset();
			Swal.fire({
				title: 'Libro actualizado',
				text: 'El libro se ha actualizado exitosamente.',
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
				text: 'Hubo un problema al actualizar el libro.',
				icon: 'error',
				confirmButtonText: 'OK'
			});
		});
}
