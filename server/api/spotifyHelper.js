var SpotifyWebApi = require('spotify-web-api-node');

const { exec } = require("child_process");

module.exports = class SpotifyHelper {
  
  xjava(data, callback) {
    console.log("inside xjava function")
    console.log(data)
    var token = data.usertoken
    var playlisturl = data.value

    //exec("dir", (error, stdout, stderr) => {
    console.log("java DataExtracter "+ playlisturl +" " + token)
    exec("java DataExtracter "+ playlisturl +" " + token, (error, stdout, stderr) => {
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

