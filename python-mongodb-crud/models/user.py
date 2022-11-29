from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    id : Optional[str]
    name : str
    GameCalification : object
    ColaborativeRecomendation : list
    ProfileRecomendation : list
    email : str
    password : str

class Game(BaseModel):
    gamesList : list