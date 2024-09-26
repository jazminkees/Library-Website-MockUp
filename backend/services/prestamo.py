from models.prestamo import Prestamo as PrestamoModel
from schemas.prestamo import Prestamo
from sqlalchemy.orm import Session
from datetime import date,datetime

class PrestamoService:
    
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_prestamos(self):
        result = self.db.query(PrestamoModel).all()
        return result

    def get_prestamo(self, id: int):
        result = self.db.query(PrestamoModel).filter(PrestamoModel.id == id).first()
        return result

    def get_prestamo_by_usuario(self, usuario_id: int):
        result = self.db.query(PrestamoModel).filter(PrestamoModel.usuario_id == usuario_id).all()
        return result
    
    def get_prestamo_activo(self, usuario_id: int):
        now = datetime.now()
        result = self.db.query(PrestamoModel).filter(PrestamoModel.usuario_id == usuario_id, PrestamoModel.fecha_devolucion >= now).all()
        return result

    def is_libro_disponible(self, libro_id: int, fecha_prestamo: date, fecha_devolucion: date):
        existing_prestamos = self.db.query(PrestamoModel).filter(
            PrestamoModel.libro_id == libro_id,
            PrestamoModel.fecha_prestamo < fecha_devolucion,
            PrestamoModel.fecha_devolucion > fecha_prestamo
        ).all()
        return len(existing_prestamos) == 0 # si existe el libro o no

    def create_prestamo(self, prestamo: Prestamo): # si el libro existe, no puede prestar
        if not self.is_libro_disponible(prestamo.libro_id, prestamo.fecha_prestamo, prestamo.fecha_devolucion):
            raise ValueError("El libro no está disponible para las fechas seleccionadas.")
        new_prestamo = PrestamoModel(**prestamo.model_dump())
        self.db.add(new_prestamo)
        self.db.commit()
        return new_prestamo

    def update_prestamo(self, id: int, data: Prestamo):
        prestamo = self.db.query(PrestamoModel).filter(PrestamoModel.id == id).first()
        if prestamo:
            if not self.is_prestamo_disponible(data.prestamo_id, data.fecha_prestamo, data.fecha_devolucion):
                raise ValueError("El libro no está disponible para las fechas seleccionadas.")
            prestamo.libro_id = data.libro_id
            prestamo.usuario_id = data.usuario_id
            prestamo.fecha_prestamo = data.fecha_prestamo
            prestamo.fecha_devolucion = data.fecha_devolucion
            self.db.commit()
        return prestamo

    def delete_prestamo(self, id: int):
        self.db.query(PrestamoModel).filter(PrestamoModel.id == id).delete()
        self.db.commit()
        return
