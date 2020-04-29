var Base64 = require('js-base64').Base64
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();


var request=require("request")

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

app.post('/getToken', function(req, res){
    var secret=Base64.encode(req.body.secret)
    request({
      url: "https://api.spotify.com/v1/me",
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + req.body.token,
       
        //'Content-Length': postQuery.length
      },
      
    },(error,response,data)=>{
        console.log(error)
        console.log(response)
        console.log(data)
        res.send(JSON.stringify({ success: true, data:data }));
    } )
});

app.post('/api/xjava', (req, res) => {
    console.log("api xjava")
    const body = req.body;
    console.log(body)
    res.setHeader('Content-Type', 'application/json');
    spotifyHelper.xjava(body, (data)=>{
        res.send(JSON.stringify({ success: true, data:data }));
    })
    
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);