from pydantic import BaseModel, Field, EmailStr, field_validator, SecretStr
from fastapi import status
from typing import Optional, List
from fastapi.exceptions import HTTPException
from datetime import date

class Prestamo(BaseModel):
    id: Optional[int] = None
    libro_id: int = Field(gt=0)
    usuario_id: int = Field(gt=0)
    fecha_prestamo: date
    fecha_devolucion: date