from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB

client = MongoClient('mongodb://localhost:27017/music_db')
db = client['music_db']
songs_collection = db['songs']

# Dummy users data
users = [
    {'user_id': 1, 'preferences': 'Pop'},
    {'user_id': 2, 'preferences': 'Rock'}
]

def get_user_preferences(user_id):
    user = next((user for user in users if user['user_id'] == user_id), None)
    return user['preferences'] if user else None

@app.route('/songs/<artist>', methods=['GET'])
def get_songs_by_artist(artist):
    songs = list(songs_collection.find({'artist': artist}).sort('popularity', -1))
    return jsonify(songs)

@app.route('/search', methods=['GET'])
def search_songs():
    query = request.args.get('query')
    songs = list(songs_collection.find({'title': {'$regex': query, '$options': 'i'}}).sort('popularity', -1))
    return jsonify(songs)

@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = int(request.args.get('user_id'))
    preferences = get_user_preferences(user_id)
    if preferences:
        songs = list(songs_collection.find({'genre': preferences}).sort('popularity', -1))
        return jsonify(songs)
    else:
        return jsonify([])

if __name__ == '__main__':
    app.run(debug=True, port=5000)