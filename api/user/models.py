# app/user/models.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    profile_photo: Optional[str] = None
    favorite_languages: Optional[List[str]] = None

class UserInDB(UserBase):
    password: str
    creation: int
    updated_at: int
    is_deleted: bool = False
    profile_photo: str = "beginner.png"  # 🖼 default
    favorite_languages: List[str] = []   # 🌍 empty by default

class UserPublic(UserBase):
    profile_photo: str
    favorite_languages: List[str]
