from fastapi import FastAPI
from db.configurations import dictation_collection, user_collection
from db.router_factory import create_crud_router
from solution.routes import solution_router

from dictation.models import DictationCreate, DictationUpdate
from dictation.schemas import serialize_dictation
from dictation.routes import dictation_p_router
from user.models import UserCreate, UserUpdate
from user.schemas import serialize_user

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for all origins (not safe for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Reuse the same logic for Dictation
dictation_router = create_crud_router(
    collection=dictation_collection,
    model_create=DictationCreate,
    model_update=DictationUpdate,
    serializer=serialize_dictation,
    entity_name="Dictation"
)

app.include_router(dictation_router, prefix="/dictations", tags=["Dictations"])
app.include_router(dictation_p_router, prefix="/dictations", tags=["Dictations"])

user_router = create_crud_router(
    collection=user_collection,
    model_create=UserCreate,
    model_update=UserUpdate,
    serializer=serialize_user,
    entity_name="User"
)
app.include_router(user_router, prefix="/users", tags=["Users"])

app.include_router(solution_router, prefix="/solutions", tags=["Solutions"])
