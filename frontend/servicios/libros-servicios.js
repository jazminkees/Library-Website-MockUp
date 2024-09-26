const url = "http://127.0.0.1:8000/libros";

async function listar(id) {
    let cadUrl;
    if (isNaN(id))
        cadUrl = url;
    else
        cadUrl = url + "/" + id;
    return await fetch(cadUrl, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        console.log("Datos recibidos:", data); // Log para verificar la respuesta
        return data;
    })
    .catch(error => console.error('Error:', error));
}

async function crear(titulo, autor, anio, isbn, editorial, categoria_id, prestado) {
    console.log()
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
            titulo: titulo,
            autor: autor,
            anio: anio,
            isbn: isbn,
            editorial: editorial,
            categoria_id: categoria_id,
            prestado: prestado
        })
    })
    .then(respuesta => respuesta.json());
}

async function editar(id, titulo, autor, anio, isbn, editorial, categoria_id, prestado) {
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({
                titulo: titulo,
                autor: autor,
                anio: anio,
                isbn: isbn,
                editorial: editorial,
                categoria_id: categoria_id,
                prestado: prestado
            })
        })
        .then(respuesta => respuesta.json());
}

async function borrar(id) {
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then(respuesta => respuesta.json());
}

async function listarPorCategoria(idCategoria) {
    const newUrl = new URL(url + '/');
    newUrl.searchParams.append('idCategoria', idCategoria);
    return await fetch(newUrl)
        .then(respuesta => respuesta.json());
}


export const librosServices = {
    listar,
    crear,
    editar,
    borrar,
    listarPorCategoria,
}
