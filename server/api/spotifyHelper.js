var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://www.example.com/callback'
});



module.exports=class SpotifyHelper{
    getAlbums(artistId, callback){
        console.log("getting album with artist ID: "+artistId)
        //Elvis bby
        spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
            function(data) {
              console.log('Artist albums', data.body);
              callback(data.body)
            },
            function(err) {
              console.error(err);
            }
          );
    }
}