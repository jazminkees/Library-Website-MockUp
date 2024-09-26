from fastapi import APIRouter
from fastapi import Depends, Path, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import Session
from models.categoria import Categoria as CategoriaModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.categoria import CategoriaService
from schemas.categoria import Categoria
from utils.jwt_manager import create_token

categoria_router = APIRouter()

@categoria_router.get('/categorias', tags=['categorias'], response_model=List[Categoria], status_code=200, dependencies=[Depends(JWTBearer())])
def get_categorias() -> List[Categoria]:
    db = Session()
    result = CategoriaService(db).get_categorias()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@categoria_router.get('/categorias/{id}', tags=['categorias'], response_model=Categoria, dependencies=[Depends(JWTBearer())])
def get_categoria_by_id(id: int = Path(ge=1, le=2000)) -> Categoria:
    db = Session()
    result = CategoriaService(db).get_categoria_by_id(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "La categoría no se ha encontrado."})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@categoria_router.post('/categorias', tags=['categorias'], response_model=dict, status_code=201, dependencies=[Depends(JWTBearer())])
def create_categoria(categoria: Categoria) -> dict:
    db = Session()
    CategoriaService(db).create_categoria(categoria)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado la categoría con éxito."})


@categoria_router.put('/categorias/{id}', tags=['categorias'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def update_categoria(id: int, categoria: Categoria)-> dict:
    db = Session()
    result = CategoriaService(db).get_categoria_by_id(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No se ha encontrado la categoría."})
    
    CategoriaService(db).update_categoria(id, categoria)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado la categoría con éxito."})


@categoria_router.delete('/categorias/{id}', tags=['categorias'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def delete_categoria(id: int)-> dict:
    db = Session()
    result: CategoriaModel = db.query(CategoriaModel).filter(CategoriaModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se ha encontrado la categoría."})
    CategoriaService(db).delete_categoria(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado la categoría con éxito."})
