from fastapi import APIRouter, HTTPException
from typing import Callable, Type
from bson.objectid import ObjectId
from datetime import datetime

from db.configurations import solution_collection, user_collection

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

        return {"status_code": 200, "id": str(resp.inserted_id), "result": [comparison_result["result"], comparison_result["accuracy"]]}
    except Exception as e:
            raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

# Filter per language could be an option, but filter in the front-end maybe is better
@solution_router.get("/{username}")
async def get_by_user(username: str):
    try:
        user_doc = user_collection.find_one({"username": username})

        if not user_doc:
            raise HTTPException(status_code=404, detail=f"User '{username}' not found")
        user_id = str(user_doc["_id"])
        data = collection.find({"userID": user_id })
        solutions = [serialization_solution(doc) for doc in data]

        return solutions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

from fastapi import HTTPException
from bson import ObjectId

@solution_router.get("/get/{id}")
async def get_by_id(id: str):
    try:
        if not ObjectId.is_valid(id):
            raise HTTPException(status_code=400, detail="Invalid solution ID")

        data = collection.find_one({"_id": ObjectId(id)})

        if not data:
            raise HTTPException(status_code=404, detail="Solution not found")

        # Convert MongoDB _id to string
        data["_id"] = str(data["_id"])
        #data["userID"] = str(data["userID"])  # Optional: convert userID if it's ObjectId

        return data

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {e}")

             
          

