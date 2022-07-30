import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import time 
import json
import Constants

from pymongo import MongoClient

albums_playlist_ids = {
  "taylorswift" : Constants.TAYLORSWIFT_ID,
  "fearless" : Constants.FEARLESS_ID,
  "speaknow" : Constants.SPEAKNOW_ID,
  "red" : Constants.RED_ID,
  "1989" : Constants._1989_ID,
  "reputation" : Constants.REPUTATION_ID,
  "lover" : Constants.LOVER_ID,
  "folklore" : Constants.FOLKLORE_ID,
  "evermore" : Constants.EVERMORE_ID
}

tv_sv_comparison_ids = {
  "fearless" : {
    "fearless_sv" : Constants.FEARLESS_SV_COMPARE_ID,
    "fearless_tv" : Constants.FEARLESS_TV_COMPARE_ID
  }
}

# Certifying credentials for Spotify API 
client_credentials_manager = SpotifyClientCredentials(CLIENT_ID, CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Connecting with MongoDB Atlas cluster
try:
    conn = MongoClient(Constants.MONGODB_CLIENTURI)
    print("Connected successfully")
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

  track = {
    "name":  meta['name'],
    "id" : id,
    "album": meta['album']['name'],
    "release_date" : meta['album']['release_date'],
    "length" : meta['duration_ms'],
    "popularity" : meta['popularity'],
    "acousticness" : features[0]['acousticness'],
    "danceability" : features[0]['danceability'],
    "energy" : features[0]['energy'],
    "instrumentalness" : features[0]['instrumentalness'],
    "liveness" : features[0]['liveness'],
    "loudness" : features[0]['loudness'],
    "speechiness" : features[0]['speechiness'],
    "tempo" : features[0]['tempo'],
    "time_signature" : features[0]['time_signature']
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

def create_indiviual_album(album, playlist_id):
  ids = getTrackIDs(Constants.USER_ID, playlist_id)
  collection = db[album]
  collection.insert_many(createListOfTracks(ids))

def create_albums_collections():
  for key in albums_playlist_ids:
    create_indiviual_album(key, albums_playlist_ids[key])

# create comparison collections

def createListOfTracks_comparison(ids_sv,ids_tv):
  tracks = []
  for (id_sv,id_tv) in zip(ids_sv,ids_tv):
    time.sleep(.5)
    track = {
      "name" : sp.track(id_sv)["name"],
      "sv_id" : id_sv,
      "tv_id" : id_tv
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


