from fastapi import APIRouter, HTTPException
from bson.objectid import ObjectId

from db.configurations import db

from dictation.models import DictationCreate, DictationUpdate
from dictation.schemas import serialize_dictation

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from bson import ObjectId
import gridfs
import io

#collection=dictation_collection,
model_create=DictationCreate,
model_update=DictationUpdate,
serializer=serialize_dictation,
entity_name="Dictation"

fs = gridfs.GridFS(db)
dictation_p_router = APIRouter()

# Filter per language could be an option, but filter in the front-end maybe is better
@dictation_p_router.get("/audio/{file_id}")
async def get_audio_file(file_id: str):
    try:
        file_obj = fs.get(ObjectId(file_id))
        return StreamingResponse(
            io.BytesIO(file_obj.read()),
            media_type="audio/mpeg",
            headers={"Content-Disposition": f"inline; filename={file_obj.filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File not found: {e}")

             
