import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg"
import { log } from "console";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

const songs = '[{"id":"01","name":"Vaaste","image":"../assets/song-1.png","artist":"Dhvani Bhanushali","music":"Vaaste.mp3","info":"Dhvani Bhanushali is a popular Indian singer known for her melodious voice and chart-topping hits. She gained widespread recognition with songs like \\"Vaaste,\\" which became one of the most-viewed music videos on YouTube. Her versatile singing style spans various genres, and she has quickly established herself as a prominent figure in the Indian music industry. Her soulful renditions and vibrant music videos have earned her a massive fan following, making her one of the rising stars in Bollywood music."},{"id":"02","name":"Chaleya","image":"../assets/song-2.png","artist":"Arjit Singh","music":"Chaleya.mp3","info":"Arijit Singh is a renowned Indian playback singer and music composer, celebrated for his soulful and emotive voice. Arijit effortlessly transitions between romantic ballads, upbeat tracks, and soulful melodies. His impressive repertoire includes numerous hit songs such as \\"Channa Mereya\\" and \\"Ae Dil Hai Mushkil.\\" His heartfelt performances and exceptional vocal talent have earned him numerous awards and a devoted fanbase."},{"id":"03","name":"Shape Of You","image":"../assets/song-3.png","artist":"Ed Sheeran","music":"ShapeOfYou.mp3","info":"Ed Sheeran is a globally acclaimed English singer-songwriter known for his heartfelt lyrics and catchy melodies. Rising to fame with his debut album \\"+\\" and its hit single \\"The A Team,\\" he quickly became a household name. His music blends pop, folk, and acoustic elements, producing hits like \\"Shape of You,\\" \\"Thinking Out Loud,\\" and \\"Perfect.\\" His distinctive voice and relatable songwriting have won him numerous awards and a massive international following."},{"id":"04","name":"Faded","image":"../assets/song-4.png","artist":"Alan Walker","music":"Faded.mp3","info":"Alan Walker is a British-Norwegian DJ and producer famous for his hit single \\"Faded,\\" which gained worldwide recognition in 2015. Known for his distinctive hoodie and mask, His music blends melodic and atmospheric electronic sounds. His other popular tracks include \\"Alone\\" and \\"Sing Me to Sleep.\\" With a unique style and engaging performances, he has become a prominent figure in the electronic dance music scene."}]';



app.use(express.static("public"));
// app.use(express.static("assets"));

app.use(bodyParser.urlencoded({ extended: true }));

  let data=JSON.parse(songs)[0];
app.get("/",(req,res)=>{
    res.render("index1.ejs",{song:data})
    
})

app.post("/song", (req, res)=>{
  switch (req.body.choice) {
    case 'one':
      data = JSON.parse(songs)[0];
      break;
    case 'two':
      data = JSON.parse(songs)[1];
      break;
    case 'three':
      data = JSON.parse(songs)[2];
      break;
    case 'four':
      data = JSON.parse(songs)[3];
      break;
    default:
      break;
  }
  res.redirect("/");
  
})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  