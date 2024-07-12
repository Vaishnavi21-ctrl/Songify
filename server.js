const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/Song');

const app = express();
const dbURI = 'mongodb://localhost:27017/music_db';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/add-song', (req, res) => {
    const song = new Song({
        title: 'Hold On',
        artist: 'Justin',
        genre: 'pop',
        popularity: 350,
        audio_url: "Justin_Bieber_-_Peaches_Hold_On_CeeNaija.com_.mp3"
    });
    song.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/home', (req, res) => {
    res.render('index');
});


app.get('/contact', (req, res) => {
    res.render('contacts');
});
app.post('/contacts', (req, res) =>{
    res.send("thanks for your feedback")
})

app.get('/songs/:artist', async (req, res) => {
    try {
        const artist = req.params.artist;
        const songs = await Song.find({ artist });
        res.json(songs);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        const songs = await Song.find({ title: { $regex: query, $options: 'i' } });
        res.json(songs);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/recommend', async (req, res) => {
    const user_id = req.query.user_id;
    try {
        const preferences = await getUserPreferences(user_id); // You'll need to implement this function
        if (preferences) {
            const songs = await Song.find({ genre: preferences }).sort({ popularity: -1 });
            res.json(songs);
        } else {
            res.json([]);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

async function getUserPreferences(user_id) {
    // Mock user preferences for now, replace with actual user preferences retrieval logic
    const preferences = 'pop'; // Example: Assume the user prefers pop music
    return preferences;
}
