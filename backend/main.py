import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import time 
import itertools
import json

from pymongo import MongoClient

CLIENT_ID = '935df3b5c24445c9b8b8d762ce974999'
CLIENT_SECRET = 'ce2c610c16a54315819f81158237e2ce'
USER_ID = 'hzbi6l653qv6b8us2s4hkyqyi'

albums_playlist_ids = {
  "taylorswift" : '0Pu2SkEPbSbWtj89uibq6a?si=3ba3144337934869',
  "fearless" : '320hNW54JnfqCIN9QORtPy?si=b9d0429ca8714023',
  "speaknow" : '08pK3XWpOtEzf8Rz51Pdvh?si=be741f3d6ff74f8b',
  "red" : '44f7kuKKAEZDOviuzZDeyq?si=b3bee18692d74fcd',
  "1989" : '6YApTIDJsn4x92gLKnpnvG?si=b17c9ebec72a4b15',
  "reputation" : '5swiLchK3f2P57aFJyBEdM?si=82143c3b6ac94523',
  "lover" : '7A3pPd0M8kRnCgdrfFJVJj?si=9ef1923c8e394ee2',
  "folklore" : '4QCQUlgBabBgIHeOpqFt5d?si=eb6aefc8fba341ce',
  "evermore" : '0gXPwkwK5RXvl49x3AKkST?si=1b5ac008bef54412'
}

tv_sv_comparison_ids = {
  "fearless" : {
    "fearless_sv" : '67WkS5Ihn7wadLmSxmL4py?si=6b6d80abdf724839',
    "fearless_tv" : '0gAW6DQ2inUM7pxv0VPu03?si=9e81a701f1ad4a35'
  }
}

# Certifying credentials for Spotify API 
client_credentials_manager = SpotifyClientCredentials(CLIENT_ID, CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Connecting with MongoDB Atlas cluster
try:
    conn = MongoClient("mongodb+srv://adviti:advititaylorswift@cluster0.w7mm71t.mongodb.net/?retryWrites=true&w=majority&ssl=true&tls=true&tlsAllowInvalidCertificates=true")
    print("Connected successfully!!!")
except:  
    print("Could not connect to MongoDB")

db = conn.albums
db_comparison = conn.comparison

# CREATE 

# helper functions to get spotify statistics

def getTrackIDs(user, playlist_id):
    ids = []
    playlist = sp.user_playlist(user, playlist_id)
    for item in playlist['tracks']['items']:
        track = item['track']
        ids.append(track['id'])
    return ids

def getTrackFeatures(id):
  meta = sp.track(id)
  features = sp.audio_features(id)

  # meta
  name = meta['name']
  album = meta['album']['name']
  release_date = meta['album']['release_date']
  length = meta['duration_ms']
  popularity = meta['popularity']

  # features
  acousticness = features[0]['acousticness']
  danceability = features[0]['danceability']
  energy = features[0]['energy']
  instrumentalness = features[0]['instrumentalness']
  liveness = features[0]['liveness']
  loudness = features[0]['loudness']
  speechiness = features[0]['speechiness']
  tempo = features[0]['tempo']
  time_signature = features[0]['time_signature']

  track = {
    "name": name,
    "album": album,
    "release_date" : release_date,
    "length" : length,
    "popularity" : popularity,
    "acousticness" : acousticness,
    "danceability" : danceability,
    "energy" : energy,
    "instrumentalness" : instrumentalness,
    "liveness" : liveness,
    "loudness" : loudness,
    "speechiness" : speechiness,
    "tempo" : tempo,
    "time_signature" : time_signature
    }

  return track

def createListOfTracks(ids):
  tracks = []
  for i in range(len(ids)):
    time.sleep(.5)
    track = getTrackFeatures(ids[i])
    tracks.append(track)
  return tracks

# create album collections

def create_indiviual_albums_collections():
  for key in albums_playlist_ids:
    ids = getTrackIDs(USER_ID, albums_playlist_ids[key])
    collection = db[key]
    collection.insert_many(createListOfTracks(ids))

# create comparison collections

def createListOfTracks_comparison(ids_sv,ids_tv):
  tracks = []
  for (id_sv,id_tv) in zip(ids_sv,ids_tv):
    time.sleep(.5)
    track = {
      "name" : sp.track(id_sv)["name"],
      "sv_pi" : sp.track(id_sv)["popularity"],
      "tv_pi" : sp.track(id_tv)["popularity"]
    }
    tracks.append(track)
  return tracks

def create_sv_tv_albums_collections():

  for key in tv_sv_comparison_ids:
    # fearless collection
    collection = db_comparison[key]

    # fearless_sv
    # fearless_tv
    values = tv_sv_comparison_ids[key]
    
    # fearless_sv
    sv_playlist_id = values[key+"_sv"]
    # IDs of 1. Fearless, 2. Fifteen ...
    sv_ids = getTrackIDs(USER_ID, sv_playlist_id)
    
    # fearless_tv
    tv_playlist_id = values[key+"_tv"]
    # IDs of 1. Fearless (Taylor's Version), 2. Fifteen (Taylor's Version)...
    tv_ids = getTrackIDs(USER_ID, tv_playlist_id)
    
    collection.insert_many(createListOfTracks_comparison(sv_ids,tv_ids))

# READ 

def individual_album_popularity_indices(name):
  collection = db[name]
  cursor = collection.find({})
  name_popularityindex_list = []
  for document in cursor:
    name_popularityindex = {
      "name" : document["name"],
      "popularity" : document["popularity"]
    }
    name_popularityindex_list.append(name_popularityindex)
  
  return name_popularityindex_list


albums_to_json = {}
for key in albums_playlist_ids:
  albums_to_json[key] = individual_album_popularity_indices(key)

with open("albums_all.json", "w") as outfile:
    json.dump(albums_to_json, outfile)

# UPDATE 



# DELETE


