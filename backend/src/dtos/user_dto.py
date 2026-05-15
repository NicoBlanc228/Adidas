from datetime import datetime
from pydantic import BaseModel


class CreateUserDTO(BaseModel):
    email: str
    nombre: str
    direccion: str


class UserResponseDTO(BaseModel):
    id: int
    email: str
    nombre: str
    direccion: str
    isAdmin: bool
    created_at: datetime

    model_config = {"from_attributes": True}
