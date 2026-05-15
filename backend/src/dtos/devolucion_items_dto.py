from datetime import datetime
from pydantic import BaseModel


class CreateDevolucionItemDTO(BaseModel): # POST
    devolucion_id: int
    variante_id: int
    cantidad: int

class UpdateDevolucionItemDTO(BaseModel): # PUT/PATCH
    devolucion_id: int | None = None
    variante_id: int | None = None
    cantidad: int | None = None

class DeleteDevolucionItemDTO(BaseModel): # DELETE
    id: int

class GetByIDDevolucionItemDTO(BaseModel): # GET (individual by ID)
    id: int

class DevolucionItemResponseDTO(BaseModel):
    id: int
    devolucion_id: int
    variante_id: int
    cantidad: int

    model_config = {"from_attributes": True}

# Listo