from config.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship

class Libro(Base):
    __tablename__ = 'libro'
    id = Column(Integer, primary_key=True)
    titulo = Column(String(50))
    autor = Column(String(50))
    anio = Column(Integer)
    isbn = Column(String(50), unique=True)
    editorial = Column(String(50))
    categoria_id = Column(Integer, ForeignKey('categoria.id'))
    prestado = Column(Boolean)
    
    categoria = relationship('Categoria', lazy='joined')
    prestamos = relationship('Prestamo', lazy='joined')
