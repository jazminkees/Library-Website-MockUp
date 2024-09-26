from models.libro import Libro as LibroModel
from schemas.libro import Libro

class LibroService():
    
    def __init__(self, db) -> None:
        self.db = db

    def get_libros(self):
        result = self.db.query(LibroModel).all()
        return result

    def get_libro(self, id):
        result = self.db.query(LibroModel).filter(LibroModel.id == id).first()
        return result
    
    def get_libro_by_prestamo(self, prestamo: bool):
        result = self.db.query(LibroModel).filter(LibroModel.prestamo == prestamo).all()
        return result
    
    def get_libro_by_titulo(self, titulo: str):
        result = self.db.query(LibroModel).filter(LibroModel.titulo == titulo).all()
        return result
    
    def get_libro_by_autor(self, autor: str):
        result = self.db.query(LibroModel).filter(LibroModel.autor == autor).all()
        return result
    
    def get_libro_by_categoria(self, categoria_id: int):
        result = self.db.query(LibroModel).filter(LibroModel.categoria_id == categoria_id).all()
        return result

    def create_libro(self, libro: Libro):
        # Log para verificar los datos recibidos
        print("Datos recibidos para crear libro:", libro)
        new_libro = LibroModel(**libro.model_dump())
        self.db.add(new_libro)
        self.db.commit()
        return

    def update_libro(self, id: int, data: Libro):
        libro = self.db.query(LibroModel).filter(LibroModel.id == id).first()
        libro.titulo = data.titulo
        libro.autor = data.autor
        libro.anio = data.anio
        libro.isbn = data.isbn
        libro.editorial = data.editorial
        libro.categoria_id = data.categoria_id
        libro.prestado = data.prestado
        self.db.commit()
        return

    def delete_libro(self, id: int):
       self.db.query(LibroModel).filter(LibroModel.id == id).delete()
       self.db.commit()
       return