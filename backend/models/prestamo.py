from config.database import Base
from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship

class Prestamo(Base):
    __tablename__ = 'prestamo'
    id = Column(Integer, primary_key=True)
    libro_id = Column(Integer, ForeignKey('libro.id'), nullable=False)
    usuario_id = Column(Integer, ForeignKey('usuario.id'), nullable=False)
    fecha_prestamo = Column(Date)
    fecha_devolucion = Column(Date)

    # Relaciones con las tablas de vehículos y usuarios
    libro = relationship('Libro', lazy='joined')
    usuario = relationship('Usuario', lazy='joined')
