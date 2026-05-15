from datetime import datetime
from pydantic import BaseModel


class CreateCuponDTO(BaseModel): # POST
    codigo: str
    porcentaje_descuento: float
    fecha_expiracion: datetime
    usos_maximos: int

class UpdateCuponDTO(BaseModel): # PUT/PATCH
    codigo: str | None = None
    porcentaje_descuento: float | None = None
    fecha_expiracion: datetime | None = None
    usos_maximos: int | None = None

class DeleteCuponDTO(BaseModel): # DELETE
    id: int

class GetByIDCuponDTO(BaseModel): # GET (individual by ID)
    id: int

class CuponResponseDTO(BaseModel):
    id: int
    codigo: str
    porcentaje_descuento: float
    fecha_expiracion: datetime
    usos_maximos: int
    usos_actuales: int

    model_config = {"from_attributes": True}

# Listo