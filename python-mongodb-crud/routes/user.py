from fastapi import APIRouter
from config.db import connection
from schemas.user import userEntity,usersEntity
from models.user import User
from domain.useCase.querys import executeQuery

user = APIRouter()

@user.get('/query')
def queryResult():
    return executeQuery()

@user.get('/users')
def findAllUsers():
    response = usersEntity(connection.usuarios.user.find())
    return(response) #Find() busca todos los elementos de una colección

@user.post('/users')
def createNewUser(user: User):
    new_user = dict(user)
    id = connection.usuarios.user.insert_one(new_user).inserted_id
    return str(id)

@user.put('/edit/{id}')
def editExistingUser(id: str,user: User):
    connection.usuarios.user.find_one_and_update(
        {"id":id}, {"$set": dict(user)})
    return userEntity(connection.usuarios.user.find_one({"id":id}))

@user.get('/getCalificationByUser/{value}')
def getCalificationByUser(value):
    return userEntity(connection.usuarios.user.find_one({"id":value}))["GameCalification"]
    

