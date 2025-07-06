from fastapi import APIRouter, HTTPException
from typing import Callable, Type
from bson.objectid import ObjectId
from datetime import datetime

from api.db.configurations import dictation_collection

from dictation.models import DictationCreate
# from dictation.schemas import all_dictations

from .solve import compare_texts

entity_name= "Dictation"
collection= dictation_collection
model_create= DictationCreate
model_update=None
serializer= None


solution_router = APIRouter()

# Slider for home page - Hero
@solution_router.get("/slider")
async def get_slider(user_id: str):
    try:
        data = collection.find()
        slider = [dictation_collection(doc) for doc in data]

        return solutions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

             
          

