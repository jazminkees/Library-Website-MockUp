from pydantic import BaseModel, Field, EmailStr, field_validator, SecretStr
from fastapi import status
from typing import Optional, List
from fastapi.exceptions import HTTPException

class Categoria(BaseModel):
    id: Optional[int] = None
    nombre: str = Field(min_length=5, max_length=30)
    descripcion: str = Field(min_length=5, max_length=100)
    
    class Config:
        json_scheme_extra = {
            "example": {
                "id": 1,
                "nombre": "Categoria 1",
                "descripcion": "Esta es la categoria 1, va de prueba"
            }
        }