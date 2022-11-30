# CalificationRecuWeb
## Tecnologíás usadas:
BackENd - FastApi/Uvicorn/Python
FrontEnd - React.js/Javascript

## Carpetas 
python-mongodb-crud (BackEnd)
recuweb(FrontEnd)

# Proceso para correr la aplicacion web
### BackEnd
1. Descargar el repositorio
2. Moverse a la carpeta python-mongodb-crud y hacer pip install de los siguientes paquetes
pip install fastapi==0.88.0
pip install uvicorn
pip install pymongo
pip install SPARQLWrapper
pip install scipy==1.7.3
pip install pandas
pip install sklearn
pip install scikit-learn
pip install typing
pip install pydantic

3. Correr el comando python -m uvicorn app:app --reload (Por defecto se inicia en 127.0.0.1:8000)
### FrontEnd

1.Moverse a la carpeta recuweb y hacer npm install 
npm install Swal
npm install bootstrap

3. correr el comando npm start (Por defecto se inicia en 127.0.0.1:3000)
