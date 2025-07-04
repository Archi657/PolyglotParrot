from fastapi import FastAPI
from configurations import dictation_collection, user_collection
from router_factory import create_crud_router
from solution.routes import solution_router

from dictation.models import DictationCreate, DictationUpdate
from dictation.schemas import serialize_dictation

from user.models import UserCreate, UserUpdate
from user.schemas import serialize_user


app = FastAPI()

# Reuse the same logic for Dictation
dictation_router = create_crud_router(
    collection=dictation_collection,
    model_create=DictationCreate,
    model_update=DictationUpdate,
    serializer=serialize_dictation,
    entity_name="Dictation"
)

app.include_router(dictation_router, prefix="/dictations", tags=["Dictations"])

user_router = create_crud_router(
    collection=user_collection,
    model_create=UserCreate,
    model_update=UserUpdate,
    serializer=serialize_user,
    entity_name="User"
)
app.include_router(user_router, prefix="/users", tags=["Users"])

app.include_router(solution_router, prefix="/solutions", tags=["solutions"])
