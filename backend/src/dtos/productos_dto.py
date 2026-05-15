from datetime import datetime
from pydantic import BaseModel


class CreateProductoDTO(BaseModel): # POST
    nombre: str
    descripcion: str
    precio_base: float
    categoria_id: int
    activo: bool

class UpdateProductoDTO(BaseModel): # PUT/PATCH
    nombre: str | None = None
    descripcion: str | None = None
    precio_base: float | None = None
    categoria_id: int | None = None
    activo: bool | None = None

class DeleteProductoDTO(BaseModel): # DELETE
    id: int

class GetByIDProductoDTO(BaseModel): # GET (individual by ID)
    id: int

class ProductoResponseDTO(BaseModel):
    id: int
    nombre: str
    descripcion: str
    precio_base: float
    categoria_id: int
    activo: bool
    created_at: datetime

    model_config = {"from_attributes": True}

# Listo