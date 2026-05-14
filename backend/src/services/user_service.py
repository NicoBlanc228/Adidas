from sqlalchemy.orm import Session

from src.utils.errors import NotFoundError
from src.dtos.user_dto import CreateUserDTO, UserResponseDTO
from src.mappers.user_mapper import to_user_response
from src.repositories.user_repository import UserRepository
from src.utils.hash import hash_password


class UserService:
    def __init__(self, db: Session):
        self.repo = UserRepository(db)

    def create(self, dto: CreateUserDTO) -> UserResponseDTO:
        """Ejemplo completo: hashea la password, crea el user y devuelve el DTO de respuesta."""
        password_hash = hash_password(dto.password)
        user = self.repo.create(
            email=dto.email,
            password_hash=password_hash,
            age=dto.age,
        )
        return to_user_response(user)

    def get_by_id(self, user_id: int) -> UserResponseDTO:
        user = self.repo.find_by_id(user_id)
        if user == None:
            raise NotFoundError("User not found")
        return to_user_response(user)

    def list_all(self) -> list[UserResponseDTO]:
        user_list = self.repo.list_all()
        return [to_user_response(u) for u in user_list]

    def update(self, user_id: int, dto) -> UserResponseDTO:
        user = self.repo.find_by_id(user_id)
        if user == None:
            raise NotFoundError("User not found")
        self.repo.update(user_id, **dto.model_dump(exclude_unset=True))
        user = self.repo.find_by_id(user_id)
        return to_user_response(user)

    def delete(self, user_id: int) -> None:
        user = self.repo.find_by_id(user_id)
        if user == None:
            raise NotFoundError("User not found")
        return self.repo.delete(user_id)
