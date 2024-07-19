import requests
import base64
import pymongo
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy

# Spotify credentials
client_id = '2d87ad3d61bb4d429900cbe209cdfad7'
client_secret = 'aedda38b2213445b9e6faea049b52766'

# MongoDB setup
mongo_client = pymongo.MongoClient('mongodb://localhost:27017/')
db = mongo_client['music_db']
songs_collection = db['songs']

# Spotify authentication and client setup
def get_spotify_client():
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    return sp

# Fetch playlist tracks
def fetch_playlist_tracks(playlist_id, sp):
    results = sp.playlist_tracks(playlist_id)
    tracks = []
    for item in results['items']:
        track = item['track']
        track_info = {
            'title': track['name'],
            'artist': track['artists'][0]['name'],
            'genre': 'Unknown',  # Genre is not directly available from the track object
            'popularity': track['popularity'],
            'audio_url': track['external_urls']['spotify']
        }
        tracks.append(track_info)
    return tracks

# Insert tracks into MongoDB
def insert_tracks_to_mongodb(tracks):
    if tracks:
        songs_collection.insert_many(tracks)
        print(f'Inserted {len(tracks)} tracks into MongoDB')

# Main function
def main():
    # Get Spotify client
    sp = get_spotify_client()

    # Specify the playlist ID
    playlist_id = '19v6IpUD3l3Q0Owial4Tss'

    # Fetch playlist tracks
    tracks = fetch_playlist_tracks(playlist_id, sp)

    # Insert tracks into MongoDB
    insert_tracks_to_mongodb(tracks)

if __name__ == '__main__':
    main()
