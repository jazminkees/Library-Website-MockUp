import { usuariosServices } from "../../servicios/usuarios-servicios.js";
import { prestamosServices } from "../../servicios/prestamos-servicios.js";
import { librosServices } from "../../servicios/libros-servicios.js";
import { categoriasServices } from "../../servicios/categorias-servicios.js";
const htmlHome = 
` <div class="row" >
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-info">
            <div class="inner">
            <h3 id="indPrestamos">150</h3>

            <p>Prestamos</p>
            </div>
            <div class="icon">
                <i class="ion ion-bag"></i>
            </div>
            <a href="#/prestamos" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-warning">
            <div class="inner">
            <h3 id="indUsuarios">44</h3>

            <p>Usuarios Registrados</p>
            </div>
            <div class="icon">
            <i class="ion ion-person-add"></i>
            </div>
            <a href="#/usuarios" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-green">
            <div class="inner">
            <h3 id="indCategorias">44</h3>

            <p>Categorias</p>
            </div>
            <div class="icon">
            <i class="ion ion-person-add"></i>
            </div>
            <a href="#/categorias" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-danger">
            <div class="inner">
            <h3 id="indLibros">65</h3>

            <p>Libros</p>
            </div>
            <div class="icon">
            <i class="ion ion-pie-graph"></i>
            </div>
            <a href="#/libros" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <!-- ./col -->
</div>`

export async function Home(){
    let d = document
    let res='';
    d.querySelector('.contenidoTitulo').innerHTML = 'Home';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Home";
    d.querySelector('.rutaMenu').setAttribute('href',"#/home");
    let cP =d.getElementById('contenidoPrincipal');
           
     
    cP.innerHTML =  htmlHome;
     
    let indPrestamos = d.getElementById ("indPrestamos");
    let indCategorias = d.getElementById ("indCategorias");
    let indUsuarios = d.getElementById ("indUsuarios");
    let indLibros = d.getElementById ("indLibros");

    res = await usuariosServices.listar();
    //CANTIDAD DE USUARIOS
    indUsuarios.innerHTML = res.length;
    
    //CANTIDAD DE PRESTAMOS
    res= await prestamosServices.listar();
    indPrestamos.innerHTML = res.length;

    //CANTIDAD DE CATEGORIAS
    res= await categoriasServices.listar();
    indCategorias.innerHTML = res.length;

    //CANTIDAD DE LIBROS
    res= await librosServices.listar() ;
    indLibros.innerHTML = res.length;
}
