# app/user/schemas.py

def serialize_user(user):
    try:
        return {
            "id": str(user["_id"]),
            "username": user.get("username", ""),
            "email": user.get("email", ""),
            "password": user.get("password", ""),
            "creation": user.get("creation", 0),
            "updated_at": user.get("updated_at", 0)
        }
    except Exception as e:
        print("Bad user document:", user)
        raise e


def all_users(users):
    return [serialize_user(d) for d in users]