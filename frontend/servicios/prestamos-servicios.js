const url = "http://127.0.0.1:8000/prestamos";

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
    .then(respuesta => respuesta.json());
}

async function crear(prestamo) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(prestamo)
    })
    .then(respuesta => respuesta.json());
}

async function editar(id, prestamo) {
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(prestamo)
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

export const prestamosServices = {
    listar,
    crear,
    editar,
    borrar,
};
