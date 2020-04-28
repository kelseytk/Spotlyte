var SpotifyWebApi = require('spotify-web-api-node');

const { exec } = require("child_process");

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://www.example.com/callback'
});



module.exports = class SpotifyHelper {
  getAlbums(artistId, callback) {
    console.log("getting album with artist ID: " + artistId)
    //Elvis bby
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
      function (data) {
        console.log('Artist albums', data.body);
        callback(data.body)
      },
      function (err) {
        console.error(err);
      }
    );
  }

  xjava(data, callback) {
    console.log("inside xjava function")
    console.log(data)
    var token = data.userToken
    var playlisturl = data.value

    exec("java server/java/Dataextracter", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });



    callback({})
  }
}

