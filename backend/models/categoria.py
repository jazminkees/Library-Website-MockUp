from config.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Categoria(Base):
    __tablename__ = 'categoria'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(50))
    descripcion = Column(String(50))
    
    # Relación inversa opcional si deseas acceder a libros desde una categoría
    libros = relationship('Libro', lazy='joined')
