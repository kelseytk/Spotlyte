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

const FileReader= require("./api/filereader")

const filereader= new FileReader()

app.post('/api/readFile', (req, res) => {
    console.log("readfile called")
    res.setHeader('Content-Type', 'application/json');
    filereader.readFile("./server/playcountdata.txt", (data)=>{
        res.send(JSON.stringify({ success: true, data:data }));
    })
    
});

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