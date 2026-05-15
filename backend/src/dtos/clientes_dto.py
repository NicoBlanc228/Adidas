from datetime import datetime
from pydantic import BaseModel


class CreateClienteDTO(BaseModel): # POST
    nombre: str
    email: str
    direccion: str

class UpdateClienteDTO(BaseModel): # PUT/PATCH
    nombre: str | None = None
    email: str | None = None
    direccion: str | None = None

class DeleteClienteDTO(BaseModel): # DELETE
    id: int

class GetByIDClienteDTO(BaseModel): # GET (individual by ID)
    id: int

class GetByEmailClienteDTO(BaseModel): # GET (individual by email)
    email: str

class ClienteResponseDTO(BaseModel):
    id: int
    nombre: str
    email: str
    direccion: str
    isAdmin: bool
    created_at: datetime

    model_config = {"from_attributes": True}

# Listo