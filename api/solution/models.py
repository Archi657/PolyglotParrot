from pydantic import BaseModel, PositiveFloat
from datetime import datetime
from typing import List, Optional

class SolutionItem(BaseModel):
    text: str
    status: str  # 'correct' or 'incorrect'
    correct_text: Optional[str] = None
    similarity: Optional[float] = None

class SolutionCreate(BaseModel) :
    userID: str
    dictationID: str
    dictationTitle: str
    language: str
    difficulty: str
    solution: List[SolutionItem] # realize how to declare the solution array
    accuracy: PositiveFloat

class SolutionInput(BaseModel):
    userID: str
    dictationID: str
    dictationTitle: str
    language: str
    difficulty: str
    dictationText: str
    typedText: str