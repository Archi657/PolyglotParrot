from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import  certifi
import os
from dotenv import load_dotenv

load_dotenv()

user= os.getenv('MONGO_USER')
password= os.getenv('MONGO_PASSWORD')
cluster= os.getenv('MONGO_CLUSTER')
 
uri  =  f"mongodb+srv://{user}:{password}@{cluster}.mongodb.net/" 
client  =  MongoClient(uri, tlsCAFile=certifi.where())

#print(uri)
 
db  =  client.PolyglotParrot

dictation_collection = db["dictations"] 
user_collection = db["users"] 
solution_collection = db["solutions"]