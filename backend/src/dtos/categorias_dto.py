from pydantic import BaseModel


class CreateCategoriaDTO(BaseModel): # POST
    nombre: str
    descripcion: str

class UpdateCategoriaDTO(BaseModel): # PUT/PATCH
    nombre: str | None = None
    descripcion: str | None = None

class DeleteCategoriaDTO(BaseModel): # DELETE
    id: int

class GetByIDCategoriaDTO(BaseModel): # GET (individual by ID)
    id: int

class CategoriaResponseDTO(BaseModel):
    id: int
    nombre: str
    descripcion: str

    model_config = {"from_attributes": True}