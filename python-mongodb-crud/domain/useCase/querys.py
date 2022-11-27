from SPARQLWrapper import SPARQLWrapper, JSON, DIGEST, POST, XML

def executeQuery():
    sparql = SPARQLWrapper("https://query.wikidata.org/sparql")
    sparql.setQuery("""
    SELECT ?item ?itemLabel ?genreLabel ?platformLabel ?gameModeLabel ?ESRBLabel ?date
    WHERE 
    {
        ?item wdt:P31 wd:Q7889.
        ?item wdt:P136 ?genre.
        ?item wdt:P400 ?platform.
        ?item wdt:P404 ?gameMode.
        ?item wdt:P852 ?ESRB.
        ?item wdt:P577 ?date.
        FILTER (datatype(?date) = xsd:dateTime && year(?date) > 2018 )
        FILTER (datatype(?date) = xsd:dateTime && year(?date) < 2022 )
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        """)
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    # Extraccion de generos, plataformas, modos y ESRB
    games={}
    for result in results["results"]["bindings"]:
        name=result["itemLabel"]["value"]
        genre=result["genreLabel"]["value"]
        platform=result["platformLabel"]["value"]
        mode=result["gameModeLabel"]["value"]
        esrb=result["ESRBLabel"]["value"]
        if(not(name in games)):
            games[name]={'genre':[],'platform':[],'mode':[],'ESRB':[]}
        if(not(genre in games[name]['genre'])):
            games[name]['genre'].append(genre)
        if(not(platform in games[name]['platform'])):
            games[name]['platform'].append(platform)
        if(not(mode in games[name]['mode'])):
            games[name]['mode'].append(mode)
        if(not(esrb in games[name]['ESRB'])):
            games[name]['ESRB'].append(esrb)

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
    # print(game)
        games.pop(game)

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

        # Indices de las peliculas
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
    return gamesList

