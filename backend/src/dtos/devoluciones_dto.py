from datetime import datetime
from pydantic import BaseModel

from src.utils.enums import estado_devolucion


class CreateDevolucionDTO(BaseModel): # POST
    compra_id: int
    comentario: str

class UpdateDevolucionDTO(BaseModel): # PUT/PATCH
    compra_id: int | None = None
    comentario: str | None = None

class DeleteDevolucionDTO(BaseModel): # DELETE
    id: int

class GetByIDDevolucionDTO(BaseModel): # GET (individual by ID)
    id: int

class DevolucionResponseDTO(BaseModel):
    id: int
    compra_id: int
    comentario: str
    fecha_solicitud: datetime
    estado: estado_devolucion

    model_config = {"from_attributes": True}

# Listo