# app/user/schemas.py

def serialize_user(user, include_password: bool = False):
    try:
        serialized = {
            "id": str(user["_id"]),
            "username": user.get("username", ""),
            "email": user.get("email", ""),
            "creation": user.get("creation", 0),
            "updated_at": user.get("updated_at", 0),
            "profile_photo": user.get("profile_photo", "beginner.png"),  # 🖼 default photo
            "favorite_languages": user.get("favorite_languages", []),    # 🌍 default empty list
            "is_deleted": user.get("is_deleted", False),
        }

        # Only include the password if explicitly requested (e.g. internal use)
        if include_password:
            serialized["password"] = user.get("password", "")

        return serialized

    except Exception as e:
        print("⚠️ Bad user document:", user)
        raise e


def all_users(users, include_password: bool = False):
    return [serialize_user(d, include_password=include_password) for d in users]
