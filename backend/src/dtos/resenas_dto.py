from datetime import datetime
from pydantic import BaseModel


class CreateResenaDTO(BaseModel): # POST
    cliente_id: int
    producto_id: int
    puntaje: int
    comentario: str

class UpdateResenaDTO(BaseModel): # PUT/PATCH
    cliente_id: int | None = None
    producto_id: int | None = None
    puntaje: int | None = None
    comentario: str | None = None

class DeleteResenaDTO(BaseModel): # DELETE
    id: int

class GetByIDResenaDTO(BaseModel): # GET (individual by ID)
    id: int

class ResenaResponseDTO(BaseModel):
    id: int
    cliente_id: int
    producto_id: int
    puntaje: int
    comentario: str
    fecha: datetime

    model_config = {"from_attributes": True}

# Listo