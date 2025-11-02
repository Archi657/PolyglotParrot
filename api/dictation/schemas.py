def serialize_dictation(dictation):
    print("DEBUG:", type(dictation), dictation)
    return {
        "id": str(dictation["_id"]),
        "title": dictation["title"],
        "text": dictation["text"],
        "language": dictation["language"],
        "image": dictation["image"],
        "bgImage": dictation["bgImage"],
        "difficulty": dictation.get("difficulty", None),
        "audios": dictation.get("audios", []),  # safe fallback
        "creation": dictation["creation"],
        "updated_at": dictation["updated_at"]
    }

def all_dictations(dictations):
    return [serialize_dictation(d) for d in dictations]

