from db.configurations import user_collection
from .auth import hash_password
from user.models import UserCreate
import time
def get_user_by_email(email: str):
    user = user_collection.find_one({"email": email})
    if user:
        user["id"] = str(user["_id"])
        return user
    return None



def create_user(user_data: UserCreate):
    now = int(time.time())
    hashed_pwd = hash_password(user_data.password)

    user_doc = {
        "username": user_data.username,
        "email": user_data.email,
        "hashed_password": hashed_pwd,
        "creation": now,
        "updated_at": now,
        "is_deleted": False,
    }

    user_collection.insert_one(user_doc)
    return user_doc
