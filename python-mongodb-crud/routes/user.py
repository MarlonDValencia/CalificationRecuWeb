from fastapi import APIRouter
from config.db import connection
from schemas.user import userEntity,usersEntity
from schemas.game import gamesEntity
from models.user import User,Game
from domain.useCase.querys import executeQuery,profileRecomendation,game_recommender

user = APIRouter()

@user.get('/query')
def queryResult():
    return executeQuery()

@user.get('/profileQuery/{id}')
def profileQuery(id):
    return profileRecomendation(id)

@user.get('/colaborativeRecomendation/{id}')
def colaborativeRecomendation(id):
    return (str(game_recommender(id)).replace("[", "")).replace("]", "")

@user.put('/query')
def queryInsert(game : Game):
    new_game = dict(game)
    id = connection.games.gameList.insert_one(dict(new_game)).inserted_id
    return str(id)

@user.get('/users')
def findAllUsers():
    response = usersEntity(connection.usuarios.user.find())
    return(response) #Find() busca todos los elementos de una colección

@user.post('/users')
def createNewUser(user: User):
    new_user = dict(user)
    id = connection.usuarios.user.insert_one(new_user).inserted_id
    inserction = {
    "id": str(id),
    }
    print()
    connection.usuarios.user.find_one_and_update({'_id':id}, {"$set": dict(inserction)})
    return str(id)

@user.put('/edit/{id}')
def editExistingUser(id: str,user: User):
    connection.usuarios.user.find_one_and_update(
        {"id":id}, {"$set": dict(user)})
    return userEntity(connection.usuarios.user.find_one({"id":id}))

@user.get('/getCalificationByUser/{value}')
def getCalificationByUser(value):
    return userEntity(connection.usuarios.user.find_one({"id":value}))["GameCalification"]

@user.get('/getUserById/{value}')
def getUserById(value):
    lista = []
    lista.append(userEntity(connection.usuarios.user.find_one({"id":value})))
    return lista

@user.get('/getAllGameSelection')
def getAllGameSelection():
    return gamesEntity(connection.games.gameSelection.find())
    

