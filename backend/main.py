import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import time 
import json
import Constants
import bson.json_util as json_util
import schedule
import time

from pymongo import MongoClient

albums_playlist_ids = {
  "taylorswift" : Constants.TAYLORSWIFT_ID,
  "fearless" : Constants.FEARLESS_TV_ID,
  "speaknow" : Constants.SPEAKNOW_ID,
  "red" : Constants.RED_TV_ID,
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
client_credentials_manager = SpotifyClientCredentials(Constants.CLIENT_ID, Constants.CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Connecting with MongoDB Atlas cluster
try:
    conn = MongoClient(Constants.MONGODB_CLIENTURI)
    print("Connected successfully")
except:  
    print("Could not connect to MongoDB")

db = conn.albums
db_comparison = conn.comparison

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


# 
# CREATE 
#


# INDIVIDUAL ALBUMS 

# create list of tracks - all statistics

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
  for album in albums_playlist_ids:
    create_indiviual_album(album, albums_playlist_ids[album])

# COMPARISON ALBUMS 

# create list of tracks - comparison 

def createListOfTracks_comparison(sv_ids,tv_ids):
  tracks = []
  for (sv_id,tv_id) in zip(sv_ids,tv_ids):
    time.sleep(.5)
    track = {
      "name" : sp.track(sv_id)["name"],
      "sv_id" : sv_id,
      "tv_id" : tv_id
    }
    tracks.append(track)
  return tracks

# create comparison collections

def create_indiviual_comparison(album, playlist_id_sv, playlist_id_tv):
  sv_ids = getTrackIDs(Constants.USER_ID, playlist_id_sv)
  tv_ids = getTrackIDs(Constants.USER_ID, playlist_id_tv)
  collection = db_comparison[album]
  collection.insert_many(createListOfTracks_comparison(sv_ids, tv_ids))

def create_comparison_collections():

  for album in tv_sv_comparison_ids:

    # fearless_sv
    # fearless_tv
    values = tv_sv_comparison_ids[album]
    
    # fearless_sv
    playlist_id_sv = values[album+"_sv"]
   
    # fearless_tv
    playlist_id_tv = values[album+"_tv"]
    
    create_indiviual_comparison(album, playlist_id_sv, playlist_id_tv)


# 
# READ 
#

# INDIVIDUAL ALBUMS 

def read_individual_album(album):

  collection = db[album]
  cursor = collection.find({})

  return list(cursor)

def read_albums_collection():
  albums_to_json = {}

  for album in albums_playlist_ids:
    albums_to_json[album] = read_individual_album(album)
  
  return albums_to_json


# reading all album statistics into json

def read_album_all_statistics_into_json():
  albums_to_json = read_albums_collection()
  with open("album_all_statistics.json", "w") as outfile:
   outfile.write(json_util.dumps(albums_to_json))

read_album_all_statistics_into_json()

# COMPARISON ALBUMS 

def read_comparison_album(album):
  collection = db_comparison[album]
  cursor = collection.find({})

  return list(cursor)

def read_comparison_collection():
  comparison_to_json = {}

  for album in tv_sv_comparison_ids:
    comparison_to_json[album] = read_comparison_album(album)
  
  return comparison_to_json

# reading all comparisons into json

def read_comparison_into_json():
  comparisons_to_json = read_comparison_collection()
  with open("comparison.json", "w") as outfile:
   outfile.write(json_util.dumps(comparisons_to_json))

# 
# UPDATE 
#

# update popularity index of all songs in one album

def update_individual_album_popularity_indices(album):
  db = conn.albums
  myalbum = db[album]

  jsonFile = open("album_all_statistics.json", "r") # Open the JSON file for reading
  data = json.load(jsonFile) # Read the JSON into the buffer
  jsonFile.close() # Close the JSON file
  
  album_json = data[album]

  song_index_in_list = 0

  for doc in myalbum.find(): 
    track_id = doc['id']
    meta = sp.track(track_id)
    new_popularity_index = meta['popularity']
    myalbum.update_one({'_id': doc['_id']}, {'$set':{'popularity' : new_popularity_index}})
    album_json[song_index_in_list]["popularity"] = new_popularity_index
    song_index_in_list = song_index_in_list + 1
  
  jsonFile = open("album_all_statistics.json", "w+")
  jsonFile.write(json.dumps(data))
  jsonFile.close()

# update all albums
def update_all_albums_popularity_indices():
  for album in albums_playlist_ids:
    update_individual_album_popularity_indices(album)

# automating update process every 24 hours
schedule.every().day.at("10:30").do(update_all_albums_popularity_indices)

while True:
    schedule.run_pending()
    time.sleep(1)

#
# DELETE
#

# TODO : function to delete collection, song if needed
