from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional

class AudioRef(BaseModel):
    label: str  # e.g., "intro", "part1"
    file_id: str  # MongoDB ObjectId as string

class DictationCreate(BaseModel):  # for POST
    title: str
    text: str
    language: str
    image: str
    bgImage: str
    audios: List[AudioRef] = []
    is_deleted: bool = False
    updated_at: int = Field(default_factory=lambda: int(datetime.timestamp(datetime.now())))
    creation: int = Field(default_factory=lambda: int(datetime.timestamp(datetime.now())))

class DictationUpdate(BaseModel):  # for PUT/PATCH
    title: Optional[str] = None
    text: Optional[str] = None
    language: Optional[str] = None
    image: Optional[str] = None
    bgImage: Optional[str] = None
    audios: Optional[List[AudioRef]] = None
