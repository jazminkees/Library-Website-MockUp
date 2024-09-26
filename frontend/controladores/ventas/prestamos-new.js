import { prestamosServices } from "../../servicios/prestamos-servicios.js";

const htmlAmPrestamos = `
<div class="card card-dark card-outline">
    <form class="needs-validation frmAmPrestamo" novalidate>
        <div class="card-header">
            <div class="col-md-8 offset-md-2">
                <div class="form-group mt-5">
                    <label>Libro ID</label>
                    <input type="number" class="form-control" name="libro_id" id="prestamoLibroId" required>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>
                </div>
                <div class="form-group mt-2">
                    <label>Usuario ID</label>
                    <input type="number" class="form-control" name="usuario_id" id="prestamoUsuarioId" required>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>
                </div>
                <div class="form-group mt-2">
                    <label>Fecha Préstamo</label>
                    <input type="date" class="form-control" name="fecha_prestamo" id="prestamoFechaPrestamo" required>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>
                </div>
                <div class="form-group mt-2">
                    <label>Fecha Devolución</label>
                    <input type="date" class="form-control" name="fecha_devolucion" id="prestamoFechaDevolucion" required>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="col-md-8 offset-md-2">
                <div class="form-group mt-3">
                    <a href="#/prestamos" class="btn btn-light border text-left">Cancelar</a>
                    <button type="submit" class="btn bg-dark float-right">Guardar</button>
                </div>
            </div>
        </div>
    </form>
</div> `;

var formulario = '';
var txtLibroId = '';
var txtUsuarioId = '';
var txtFechaPrestamo = '';
var txtFechaDevolucion = '';
let prestamoId = 0;

export async function newRegister() {
    let d = document;
    d.querySelector('.contenidoTitulo').innerHTML = 'Nuevo Préstamo';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Nuevo Préstamo";
    d.querySelector('.rutaMenu').setAttribute('href', "#/newPrestamo");
    let cP = d.getElementById('contenidoPrincipal');

    cP.innerHTML = htmlAmPrestamos;

    formulario = d.querySelector('.frmAmPrestamo');
    txtLibroId = d.querySelector('#prestamoLibroId');
    txtUsuarioId = d.querySelector('#prestamoUsuarioId');
    txtFechaPrestamo = d.querySelector('#prestamoFechaPrestamo');
    txtFechaDevolucion = d.querySelector('#prestamoFechaDevolucion');

    formulario.addEventListener('submit', guardar);
}

export async function editRegister(id) {
    let d = document;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Préstamo';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Editar Préstamo";
    d.querySelector('.rutaMenu').setAttribute('href', "#/editPrestamo");
    let cP = d.getElementById('contenidoPrincipal');

    cP.innerHTML = htmlAmPrestamos;

    formulario = d.querySelector('.frmAmPrestamo');
    txtLibroId = d.querySelector('#prestamoLibroId');
    txtUsuarioId = d.querySelector('#prestamoUsuarioId');
    txtFechaPrestamo = d.querySelector('#prestamoFechaPrestamo');
    txtFechaDevolucion = d.querySelector('#prestamoFechaDevolucion');

    prestamoId = id;
    let prestamo = await prestamosServices.listar(id);

    txtLibroId.value = prestamo.libro_id;
    txtUsuarioId.value = prestamo.usuario_id;
    txtFechaPrestamo.value = prestamo.fecha_prestamo;
    txtFechaDevolucion.value = prestamo.fecha_devolucion;

    formulario.addEventListener('submit', guardar);
}

async function guardar(e) {
    e.preventDefault();
    let prestamo = {
        libro_id: parseInt(txtLibroId.value, 10),
        usuario_id: parseInt(txtUsuarioId.value, 10),
        fecha_prestamo: txtFechaPrestamo.value,
        fecha_devolucion: txtFechaDevolucion.value
    };

    try {
        if (prestamoId === 0) {
            await prestamosServices.crear(prestamo);
            Swal.fire({
                title: 'Préstamo creado',
                text: 'El préstamo se ha creado exitosamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "#/prestamos";
            });
        } else {
            await prestamosServices.editar(prestamoId, prestamo);
            Swal.fire({
                title: 'Préstamo actualizado',
                text: 'El préstamo se ha actualizado exitosamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "#/prestamos";
            });
        }
    } catch (error) {
        console.error('Error al guardar el préstamo:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al guardar el préstamo.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}
