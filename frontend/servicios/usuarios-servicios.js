const url = "http://127.0.0.1:8000/usuarios";

//API-REST USUARIOS//

async function  login(usuario, password ){
    let cadUrl = "http://127.0.0.1:8000/login" 
    return await fetch(cadUrl, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-type": "application/json"
          },
        body: JSON.stringify({ email: usuario,
                               password: password  })  
        
        
    })
    .then(respuesta => respuesta.json())
    .catch(respuesta =>respuesta.json()) ;
}

async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl,{
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token') 
        }
    })
    .then(respuesta => respuesta.json());
}

async function crear(nombre, email,password, rol) {
    console.log()
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token') 
        },
        body: JSON.stringify({
            nombre: nombre,
            email: email,
            password:password,
            rol: rol
        })
    })
    .then(respuesta => respuesta.json())
}

async function editar(id,nombre, email, password,rol) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token') 
        },
        body: JSON.stringify({
            id,
            nombre: nombre,
            password:password,
            email: email,
            rol: rol
        })
    })
    .then(respuesta => respuesta.json())
}

async function borrar(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, 
        
        {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token') 
            }
       })
       .then(respuesta => respuesta.json())
}

export const usuariosServices = {
    login,
    listar,
    crear,
    editar,
    borrar
}