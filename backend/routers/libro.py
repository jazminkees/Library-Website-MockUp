from fastapi import APIRouter
from fastapi import Depends, Path, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import Session
from models.libro import Libro as LibroModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.libro import LibroService
from schemas.libro import Libro
from utils.jwt_manager import create_token

libro_router = APIRouter()

@libro_router.get('/libros', tags=['libros'], response_model=List[Libro], status_code=200)
def get_libros() -> List[Libro]:
    db = Session()
    result = LibroService(db).get_libros()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@libro_router.get('/libros/{id}', tags=['libros'], response_model=Libro, dependencies=[Depends(JWTBearer())])
def get_libro(id: int = Path(ge=1, le=2000)) -> Libro:
    db = Session()
    result = LibroService(db).get_libro(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "libro no encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@libro_router.get("/libros/prestamos/{prestamo}", tags=['libros'], response_model=List[Libro], dependencies=[Depends(JWTBearer())])
def get_libro_by_prestamo(prestamo: bool) -> List[Libro]:
    db = Session()
    result = LibroService(db).get_libro_by_prestamo(prestamo)
    if not result:
        return JSONResponse(status_code=404, content={'message': "libro no encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@libro_router.get('/libros/titulo/{titulo}', tags=['libros'], response_model=List[Libro], dependencies=[Depends(JWTBearer())])
def get_libro_by_titulo(titulo: str) -> List[Libro]:
    db = Session()
    result = LibroService(db).get_libro_by_titulo(titulo)
    if not result:
        return JSONResponse(status_code=404, content={'message': "libro no encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@libro_router.get('/libros/autor/{autor}', tags=['libros'], response_model=List[Libro], dependencies=[Depends(JWTBearer())])
def get_libro_by_autor(autor: str) -> List[Libro]:
    db = Session()
    result = LibroService(db).get_libro_by_autor(autor)
    if not result:
        return JSONResponse(status_code=404, content={'message': "libro no encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@libro_router.get('/libros/categoria/{categoria_id}', tags=['libros'], response_model=List[Libro], dependencies=[Depends(JWTBearer())])
def get_libro_by_categoria(categoria_id: int) -> List[Libro]:
    db = Session()
    result = LibroService(db).get_libro_by_categoria(categoria_id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "libro no encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@libro_router.post('/libros', tags=['libros'], response_model=dict, status_code=201, dependencies=[Depends(JWTBearer())])
def create_libro(libro: Libro) -> dict:
    db = Session()
    # hay que verificar si el id está duplicado para saber si está prestado
    LibroService(db).create_libro(libro)
    return JSONResponse(status_code=201, content={"message": "El libro se ha registrado con éxito."})

@libro_router.put('/libros/{id}', tags=['libros'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def update_libro(id: int, libro: Libro)-> dict:
    db = Session()
    result = LibroService(db).get_libro(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "libro no encontrado"})
    
    LibroService(db).update_libro(id, libro)
    return JSONResponse(status_code=200, content={"message": "El libro se ha modificado con éxito."})

@libro_router.delete('/libros/{id}', tags=['libros'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def delete_libro(id: int)-> dict:
    db = Session()
    result: LibroModel = db.query(LibroModel).filter(LibroModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "libro no encontrado"})
    LibroService(db).delete_libro(id)
    return JSONResponse(status_code=200, content={"message": "El libro se ha eliminado con éxito."})