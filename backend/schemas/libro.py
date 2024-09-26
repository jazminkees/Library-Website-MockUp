from pydantic import BaseModel, Field, EmailStr, field_validator, SecretStr, constr
from fastapi import status
from typing import Optional, List,Annotated
from fastapi.exceptions import HTTPException


ISBN13 = Annotated[str, constr(pattern=r'^\d{13}$')] # se crea un tipo de dato string de 13 dígitos

class Libro(BaseModel):
    id: Optional[int] = None
    titulo: str = Field(min_length=3, max_length=100)
    autor: str = Field(min_length=5, max_length=100)
    anio: int = Field(gt=0)
    isbn: ISBN13    
    editorial: str = Field(min_length=3)
    categoria_id: int = Field(gt=0)
    prestado: Optional[bool] = Field(default=False) 
    
    class Config:
        json_scheme_extra = {
            "example": {
                "id": 1,
                "titulo": "Don Quijote de la Mancha",
                "autor": "Miguel de Cervantes",
                "anio": 1605,
                "isbn": "1234567891234",
                "editorial": "Random",
                "categoria_id": 1,
                "prestado" : False
            }
        }