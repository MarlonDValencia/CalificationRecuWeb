def gameEntity(item) -> dict:
    return {
        "gamesList":item["gamesList"]
    }

def gamesEntity(entity) -> list:
    return [gameEntity(item) for item in entity]