from datetime import datetime
from pydantic import BaseModel


class CreateCompraItemsDTO(BaseModel): # POST
    codigo: str
    porcentaje_descuento: float
    fecha_expiracion: datetime
    usos_maximos: int

class UpdateCompraItemsDTO(BaseModel): # PUT/PATCH
    codigo: str | None = None
    porcentaje_descuento: float | None = None
    fecha_expiracion: datetime | None = None
    usos_maximos: int | None = None

class DeleteCompraItemsDTO(BaseModel): # DELETE
    id: int

class GetByIDCompraItemsDTO(BaseModel): # GET (individual by ID)
    id: int

class CompraItemsResponseDTO(BaseModel):
    id: int
    codigo: str
    porcentaje_descuento: float
    fecha_expiracion: datetime
    usos_maximos: int
    usos_actuales: int

    model_config = {"from_attributes": True}

# Listo