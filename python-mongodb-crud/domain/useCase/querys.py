from SPARQLWrapper import SPARQLWrapper, JSON, DIGEST, POST, XML
from config.db import connection
from operator import add
from scipy.spatial import distance
from schemas.user import usersEntity
from schemas.game import gamesEntity
import pandas as pd
from sklearn.neighbors import NearestNeighbors

def executeQuery():
#Query
    sparql = SPARQLWrapper("https://query.wikidata.org/sparql")
    sparql.setQuery("""
    SELECT 
    distinct ?item ?itemLabel 
    (GROUP_CONCAT(DISTINCT(?genreLabel); separator=",") as ?genres) 
    (GROUP_CONCAT(DISTINCT(?platformLabel); separator=",") as ?platforms)
    (GROUP_CONCAT(DISTINCT(?gameModeLabel); separator=",") as ?gameModes)
    (GROUP_CONCAT(DISTINCT(?ESRBLabel); separator=",") as ?ESRBs)
    (sum(DISTINCT ?units) as ?unit)
    #   (GROUP_CONCAT(DISTINCT(?units); separator=", ") as ?units2)
    WHERE 
    {
    ?item wdt:P31 wd:Q7889.
    ?item rdfs:label ?itemLabel.
    ?item wdt:P136 ?genre.
    ?genre rdfs:label ?genreLabel.
    ?item wdt:P400 ?platform.
    ?platform rdfs:label ?platformLabel.
    ?item wdt:P404 ?gameMode.
    ?gameMode rdfs:label ?gameModeLabel.
    ?item wdt:P852 ?ESRB.
    ?ESRB rdfs:label ?ESRBLabel.
    ?item wdt:P577 ?date.
    ?item wdt:P2664 ?units.
    FILTER(Lang(?itemLabel)="en")
    FILTER(Lang(?genreLabel)="en")
    FILTER(Lang(?platformLabel)="en")
    FILTER(Lang(?gameModeLabel)="en")
    FILTER(Lang(?ESRBLabel)="en")
    FILTER (datatype(?date) = xsd:dateTime && year(?date) > 2010 )
    FILTER (datatype(?date) = xsd:dateTime && year(?date) < 2022 )
    } group by ?item ?itemLabel
    order by desc(?unit)
    limit 30
    """)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()

    # Extraccion de generos, plataformas, modos y ESRB
    games={}
    for result in results["results"]["bindings"]:
        name=result["itemLabel"]["value"]
        genre=result["genres"]["value"]
        platform=result["platforms"]["value"]
        mode=result["gameModes"]["value"]
        esrb=result["ESRBs"]["value"]
        if(not(name in games)):
            games[name]={'genre':[],'platform':[],'mode':[],'ESRB':[]}
            games[name]['genre']=genre.split(",")
            games[name]['platform']=platform.split(",")
            games[name]['mode']=mode.split(",")
            games[name]['ESRB']=esrb.split(",")
    #Eliminar datos problema
    removeGame=[]
    for game in games:
        for genre in games[game]['genre']:
            if('http' in genre):
                removeGame.append(game)
        for platform in games[game]['platform']:
            if('http' in platform):
                removeGame.append(game)
        for mode in games[game]['mode']:
            if('http' in mode):
                removeGame.append(game)
        for esrb in games[game]['ESRB']:
            if('http' in esrb):
                removeGame.append(game)
            if('Rating Pending' in esrb):
                removeGame.append(game)
        if game[0]=='Q':
            removeGame.append(game)
    for game in removeGame:
        games.pop(game)

    #Extracción de caracteristicas
    genres=[]
    platforms=[]
    modes=[]
    esrbs=[]
    for game in games:
        for genre in games[game]['genre']:
            if(not(genre in genres)):
                genres.append(genre)
        for platform in games[game]['platform']:
            if(not(platform in platforms)):
                platforms.append(platform)
        for mode in games[game]['mode']:
            if(not(mode in modes)):
                modes.append(mode)
        for esrb in games[game]['ESRB']:
            if(not(esrb in esrbs)):
                esrbs.append(esrb)

    # Indices de los juegos
    index=['name']
    for genre in genres:
        index.append(genre)
    for platform in platforms:
        index.append(platform)
    for mode in modes:
        index.append(mode)
    for esrb in esrbs:
        index.append(esrb)

    # Lista de juegos categorizadas
    gamesList=[]

    for game in games:
        gameList=[]
        for i in range(0,len(index)):
            gameList.append(0)
        gameList[0]=game
        i=0
        for genre in games[game]['genre']:
            i=index.index(genre)
            gameList[i]=1
        i=0
        for platform in games[game]['platform']:
            i=index.index(platform)
            gameList[i]=1
        i=0
        for mode in games[game]['mode']:
            i=index.index(mode)
            gameList[i]=1
        i=0
        for esrb in games[game]['ESRB']:
            i=index.index(esrb)
            gameList[i]=1
        gamesList.append(gameList)

    allGames = {"gamesList":gamesList}
    gamaes = dict(allGames)
    connection.games.gameList.insert_one(gamaes).inserted_id
    insertGamesToDB(games)
    return str(gamesList)

def insertGamesToDB(games):
#Insercción De Estos Juegos DB
    allGames=list(games.keys())
    profileGames = {"gamesList":allGames}
    id = connection.games.gameSelection.insert_one(profileGames).inserted_id
    return str(id)

def profileRecomendation(id:str):
    users = usersEntity(connection.usuarios.user.find())
    gameList = gamesEntity(connection.games.gameList.find())
    for i in users:
        if(i['id']==id):
            user=i
    userGames=user['GameCalification'].keys()
    userGamesCalifications=user['GameCalification']
    userGamesCalificationMultiply=[]
    for i in userGames:
        for game in gameList[0]["gamesList"]:
            if(game[0]==i):
                aux=game.copy()
                aux.pop(0)
                result=[item * userGamesCalifications[i] for item in aux]
                userGamesCalificationMultiply.append(result)
    # suma calificacion
    sumCalification=0
    for calification in userGamesCalifications:
        sumCalification+=userGamesCalifications[calification]
    sumGamesCalificationMultiply=[item * 0 for item in userGamesCalificationMultiply[0]]
    for i in range(0,len(userGamesCalificationMultiply)):
        sumGamesCalificationMultiply=list( map(add, sumGamesCalificationMultiply, userGamesCalificationMultiply[i]))
    #Normalizacion del perfil
    userProfile=[item / sumCalification for item in sumGamesCalificationMultiply]

    #Diferencias
    differences={}
    for game in gameList[0]["gamesList"]:
        if(not(game[0] in userGamesCalifications)):
            aux=game.copy()
            aux.pop(0)
            diff=distance.euclidean(aux, userProfile)
            differences[game[0]]=diff
    differences2={k: v for k, v in sorted(differences.items(), key=lambda item: item[1])}
    recomendations=[]
    for i in range (0,5):
        recomendations.append(list(differences2.keys())[i])

    #Insercción Base De Datos
    inserction = {
    "id": id,
    "ProfileRecomendation": recomendations,
    }
    connection.usuarios.user.find_one_and_update({"id":id}, {"$set": dict(inserction)})

    return str(recomendations)

def dataFrameFormatter():
    users = usersEntity(connection.usuarios.user.find())
    gameSelection = gamesEntity(connection.games.gameSelection.find())
    data = []
    column = []
    for i in gameSelection[0]["gamesList"]:
        column.append(i)
    indexes=[]
    for i in range(len(users)):
        indexes.append("User"+str(i+1))
    df = pd.DataFrame(data, columns=[indexes],index=[column])
    for i in range(len(users)):
        valueList = (list(list(users[i].values())[2].values()))
        for k in users:
            lista = valueList
            df["User"+str(i+1)] = lista
    return df


def game_recommender():
    df = dataFrameFormatter()
    df1 = df.copy()
    number_neighbors = 4
    num_recommendation = 5

    knn = NearestNeighbors(metric='cosine', algorithm='brute')
    knn.fit(df.values)
    distances, indices = knn.kneighbors(df.values, n_neighbors=number_neighbors)
  
    user_index = len(df.columns)-1

    for m,t in list(enumerate(df.index)):
        if df.iloc[m, user_index] == 0:
            sim_games = indices[m].tolist()
            game_distances = distances[m].tolist()
    
            if m in sim_games:
                id_game = sim_games.index(m)
                sim_games.remove(m)
                game_distances.pop(id_game) 

            else:
                sim_games = sim_games[:n_neighbors-1]
                game_distances = game_distances[:n_neighbors-1]
           
            game_similarity = [1-x for x in game_distances]
            game_similarity_copy = game_similarity.copy()
            nominator = 0

            for s in range(0, len(game_similarity)):
                if df.iloc[sim_games[s], user_index] == 0:
                    if len(game_similarity_copy) == (number_neighbors - 1):
                        game_similarity_copy.pop(s)
          
                    else:
                        game_similarity_copy.pop(s-(len(game_similarity)-len(game_similarity_copy)))
            
                else:
                    nominator = nominator + game_similarity[s]*df.iloc[sim_games[s],user_index]
          
            if len(game_similarity_copy) > 0:
                if sum(game_similarity_copy) > 0:
                    predicted_r = nominator/sum(game_similarity_copy)
        
                else:
                    predicted_r = 0

            else:
                predicted_r = 0
        
            df1.iloc[m,user_index] = predicted_r
    return recommend_games(num_recommendation,df,df1)

def recommend_games(num_recommended_games,df,df1):
    print('The list of the games {} Has played \n'.format("User"+str(len(df.columns)-1)))
    for m in df[df[("User"+str(len(df.columns)-1))] > 0][("User"+str(len(df.columns)-1))].index.tolist():
        print(m)
    print('\n')
    recommended_games = []
    for m in df[df[("User"+str(len(df.columns)-1))] == 0].index.tolist():
        index_df = df.index.tolist().index(m)
        predicted_rating = df1.iloc[index_df, len(df.columns)-1]
        recommended_games.append((m, predicted_rating))
        
    sorted_rm = sorted(recommended_games, key=lambda x:x[1], reverse=True)
    
    #print('The list of the Recommended games \n')
    rank = 1

    finalGames = []
    for recommended_game in sorted_rm[:num_recommended_games]:
        #print('{}: {} - predicted rating:{}'.format(rank, recommended_game[0], recommended_game[1]))
        rank = rank + 1
        finalGames.append(str(recommended_game[0])+" "+str(recommended_game[1]))

    inserction = {
    "id": id,
    "ColaborativeRecomendation": finalGames,
    }
    connection.usuarios.user.find_one_and_update({"id":id}, {"$set": dict(inserction)})

    return finalGames