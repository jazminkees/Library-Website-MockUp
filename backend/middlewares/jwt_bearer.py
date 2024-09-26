from fastapi.security import HTTPBearer
from fastapi import Request, HTTPException
from services.usuario import UsuarioService
from utils.jwt_manager import create_token, validate_token
from models.usuario import Usuario as UsuarioModel
from config.database import Session


def get_user(user:list, email:str):
    for item in user:
        if item.email == email:
            return item


class JWTBearer(HTTPBearer):
    async def __call__(self, request: Request):
        auth = await super().__call__(request)
        data = validate_token(auth.credentials)
        db = Session()
        usuariosDb: UsuarioModel = UsuarioService(db).get_usuarios()
        for item in usuariosDb:
            if item.email == data['email']:
                return
        raise HTTPException(status_code=403, detail="Las credenciales son inválidas.")
