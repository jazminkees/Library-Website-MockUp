const url = "http://127.0.0.1:8000/categorias";


async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl,{
        method: 'GET', //agregue methood
        headers: {
            "accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token') 
        }
    })
    .then(respuesta => respuesta.json());
}

async function crear(nombre, descripcion) {
    console.log(nombre, descripcion) //agregue id, nombre, descrip
    return await fetch(url, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token') //agregue autho...
        },
        body: JSON.stringify({
            nombre: nombre,//agregado
            descripcion: descripcion
        })
    })
    .then(respuesta => respuesta.json());
}

async function editar(id, nombre, descripcion) { //agregue nombre

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token') //agregado
        },
        body: JSON.stringify({
            id: id, // agregado
            nombre: nombre, // agregado
            descripcion: descripcion
        })
    })
    .then(respuesta => respuesta.json());
}

async function borrar(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE',
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json", //agregado
                "Authorization": "Bearer " + localStorage.getItem('token') //agregado
            }
       })
       .then(respuesta => respuesta.json());
}

export const categoriasServices = {
    listar,
    crear,
    editar,
    borrar
}