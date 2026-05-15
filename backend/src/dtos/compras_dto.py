from datetime import datetime
from pydantic import BaseModel

from src.utils.enums import estado_compra


class CreateCompraDTO(BaseModel): # POST
    cupon_id: int | None = None
    compras_id: int
    subtotal: float
    total: float

class UpdateCompraDTO(BaseModel): # PUT/PATCH
    cupon_id: int | None = None
    compras_id:int | None = None
    subtotal: float | None = None
    total: float | None = None
    estado: estado_compra | None = estado_compra.PENDIENTE_PAGO

class DeleteCompraDTO(BaseModel): # DELETE
    id: int

class GetByIDCompraDTO(BaseModel): # GET (individual by ID)
    id: int

class CompraResponseDTO(BaseModel):
    id: int
    cliente_id: int
    cupon_id: int | None = None
    fecha: datetime
    subtotal: float
    total: float
    estado: estado_compra

    model_config = {"from_attributes": True}

# Listo