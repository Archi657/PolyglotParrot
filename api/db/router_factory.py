from fastapi import APIRouter, HTTPException
from typing import Callable, Type
from bson.objectid import ObjectId
from datetime import datetime


def create_crud_router(
    collection,
    model_create,
    model_update,
    serializer,
    entity_name,
    list_serializer=None
):
    router = APIRouter()
 # random_docs = list(collection.aggregate([{"$sample": {"size": 5}}]))
    @router.get("/random/{number}")
    async def get_random(number: int):
        try:
            # Make sure the number is positive
            if number <= 0:
                raise HTTPException(status_code=400, detail="Number must be greater than 0")

            data_cursor = collection.aggregate([{"$sample": {"size": number}}])
            data = list(data_cursor)

            if list_serializer:
                return list_serializer(data)
            return [serializer(d) for d in data]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")


    @router.get("/")
    async def get_all():
        try:
            data = collection.find({"is_deleted": False})
            if list_serializer:
                return list_serializer(data)
            return [serializer(d) for d in data]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

    @router.get("/{item_id}")
    async def get_by_id(item_id: str):
        try:
            obj_id = ObjectId(item_id)
            data = collection.find_one({"_id": obj_id, "is_deleted": False})
            if not data:
                raise HTTPException(status_code=404, detail=f"{entity_name} not found")
            return serializer(data)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

    @router.post("/")
    async def create(data: model_create):
        try:
            doc = data.model_dump()
            doc["is_deleted"] = False
            resp = collection.insert_one(doc)
            return {"status_code": 200, "id": str(resp.inserted_id)}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

    @router.put("/{item_id}")
    async def update(item_id: str, update_data: model_update):
        try:
            obj_id = ObjectId(item_id)
            existing = collection.find_one({"_id": obj_id, "is_deleted": False})
            if not existing:
                raise HTTPException(status_code=404, detail=f"{entity_name} does not exist")
            update_dict = update_data.model_dump(exclude_unset=True)
            update_dict["updated_at"] = int(datetime.timestamp(datetime.now()))
            collection.update_one({"_id": obj_id}, {"$set": update_dict})
            return {"status_code": 200, "message": f"{entity_name} updated successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

    @router.delete("/{item_id}")
    async def delete(item_id: str):
        try:
            obj_id = ObjectId(item_id)
            existing = collection.find_one({"_id": obj_id, "is_deleted": False})
            if not existing:
                raise HTTPException(status_code=404, detail=f"{entity_name} does not exist")
            collection.update_one({"_id": obj_id}, {"$set": {"is_deleted": True}})
            return {"status_code": 200, "message": f"{entity_name} deleted successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Some error occurred: {e}")

    
    return router

