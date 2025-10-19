def serialization_solution(solution):
    return {
        "userID" : str(solution["userID"]),
        "dictationID" : (solution["dictationID"]),
        "dictationTitle" : (solution["dictationTitle"]),
        "solution" : solution.get("solution", []),
        "accuracy" :  (solution["accuracy"])
    }

def all_solutions(solutions):
    return [serialization_solution(s) for s in solutions]