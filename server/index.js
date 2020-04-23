const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.json({ 
    extended: false,
    type:["application/json", "text/plain"]
 }));
//app.use(pino);

const SpotifyHelper= require("./api/spotifyHelper")

const spotifyHelper= new SpotifyHelper()

app.post('/api/test', (req, res) => {
    console.log("api test recieved")
    const body = req.body;
    console.log(body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: true, data:body }));
});

app.post('/api/getAlbums', (req, res) => {
    console.log("api getAlbums recieved")
    const body = req.body;
    console.log(body);
    res.setHeader('Content-Type', 'application/json');
    spotifyHelper.getAlbums(body.artistId, (data)=>{
        res.send(JSON.stringify({ success: true, data:data }));
    })
    
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);