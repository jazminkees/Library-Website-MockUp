from fastapi import APIRouter, Depends, Path, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from config.database import Session
from models.prestamo import Prestamo as PrestamoModel
from schemas.prestamo import Prestamo
from services.prestamo import PrestamoService
from middlewares.jwt_bearer import JWTBearer
from fastapi.encoders import jsonable_encoder

prestamo_router = APIRouter()

@prestamo_router.get('/prestamos', tags=['prestamos'], response_model=List[Prestamo], status_code=200, dependencies=[Depends(JWTBearer())])
def get_prestamos() -> List[Prestamo]:
    db = Session()
    result = PrestamoService(db).get_prestamos()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@prestamo_router.get('/prestamos/{id}', tags=['prestamos'], response_model=Prestamo, dependencies=[Depends(JWTBearer())])
def get_prestamo(id: int = Path(..., ge=1, le=2000)) -> Prestamo:
    db = Session()
    result = PrestamoService(db).get_prestamo(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@prestamo_router.get('/prestamos/usuario/{usuario_id}', tags=['prestamos'], response_model=List[Prestamo], dependencies=[Depends(JWTBearer())])
def get_prestamo_by_usuario(usuario_id: int) -> List[Prestamo]:
    db = Session()
    result = PrestamoService(db).get_prestamo_by_usuario(usuario_id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "Prestamos no encontrados para este usuario"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@prestamo_router.get('/prestamos/activos/{usuario_id}', tags=['prestamos'], response_model=List[Prestamo], dependencies=[Depends(JWTBearer())])
def get_prestamo_activo(usuario_id: int) -> List[Prestamo]:
    db = Session()
    result = PrestamoService(db).get_prestamo_activo(usuario_id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No hay prestamos activos para este usuario"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@prestamo_router.post('/prestamos', tags=['prestamos'], response_model=dict, status_code=201, dependencies=[Depends(JWTBearer())])
def create_prestamo(prestamo: Prestamo) -> dict:
    db = Session()
    try:
        PrestamoService(db).create_prestamo(prestamo)
        return JSONResponse(status_code=201, content={"message": "Se ha registrado el prestamo."})
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@prestamo_router.put('/prestamos/{id}', tags=['prestamos'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def update_prestamo(id: int, prestamo: Prestamo) -> dict:
    db = Session()
    result = PrestamoService(db).get_prestamo(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    
    try:
        PrestamoService(db).update_prestamo(id, prestamo)
        return JSONResponse(status_code=200, content={"message": "Se ha modificado el prestamo."})
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@prestamo_router.delete('/prestamos/{id}', tags=['prestamos'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def delete_prestamo(id: int) -> dict:
    db = Session()
    result: PrestamoModel = db.query(PrestamoModel).filter(PrestamoModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se encontró"})
    PrestamoService(db).delete_prestamo(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado el prestamo."})
