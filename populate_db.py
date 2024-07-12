from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/music_db');


db = client['music_db']
songs_collection = db['songs']

# Example songs data with audio URLs
songs_data = [
    
    {'title': 'Baby', 'artist': 'Justin', 'genre': 'Pop', 'popularity': 200, 'audio_url': r"/ShapeOfYou.mp3"},
    {'title': 'CrazyLove', 'artist': 'Drake', 'genre': 'Rock', 'popularity': 150, 'audio_url': r"/Faded.mp3"},
    
    {'title': 'CruelSummer', 'artist': 'Taylor', 'genre': 'Pop', 'popularity': 300, 'audio_url': r"/CruelSummer.mp3"},
    {'title': 'Lover', 'artist': 'Taylor', 'genre': 'Pop', 'popularity': 350, 'audio_url': r"/lover.mp3"},
    {'title': 'sajni sad version', 'artist': 'Arjith', 'genre': 'Rock', 'popularity': 250, 'audio_url': r"/arjith.mp3" }
]

# Insert songs into MongoDB
songs_collection.insert_many(songs_data)


