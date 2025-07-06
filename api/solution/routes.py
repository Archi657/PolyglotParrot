from fastapi import APIRouter, HTTPException
from typing import Callable, Type
from bson.objectid import ObjectId
from datetime import datetime

from db.configurations import solution_collection

from solution.models import SolutionCreate, SolutionInput
from solution.schemas import serialization_solution

from .solve import compare_texts

entity_name= "Solution"
collection= solution_collection
model_create= SolutionCreate
model_update=None
serializer= serialization_solution


solution_router = APIRouter()

# mulțiple solutions per dictation ?
@solution_router.post("/")
async def solve(data: SolutionInput):
    try:
        if not data.typedText or not data.dictationText:
            raise HTTPException(status_code=400, detail="Both typedText and dictationText are required.")
            
        comparison_result = compare_texts(data.typedText, data.dictationText)
        solution = SolutionCreate(
            userID=data.userID,
            dictationID=data.dictationID,
            dictationTitle=data.dictationTitle,
            solution=comparison_result["result"],
            accuracy= comparison_result["accuracy"]
        )

        resp = collection.insert_one(solution.dict())

        return {"status_code": 200, "id": str(resp.inserted_id)}
    except Exception as e:
            raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

# Filter per language could be an option, but filter in the front-end maybe is better
@solution_router.get("/{user_id}")
async def get_by_id(user_id: str):
    try:
        data = collection.find({"userID": user_id })
        solutions = [serialization_solution(doc) for doc in data]

        return solutions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

             
          

