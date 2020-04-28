import React, { Component } from "react";

export const authEndpoint = 'https://accounts.spotify.com/authorize';// Replace with your app's client ID, redirect URI and desired scopes

const clientId = "29f1845a6fcc4f2ab5cc89e328bd1cd0";
const redirectUri = "http://localhost:3000";
const scopes = [
    "user-top-read",
    'user-read-private',
    'user-read-email',

  //"user-read-currently-playing",
 // "user-read-playback-state",
]; // Get the hash of the url

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
  console.log("this is hash")
  console.log(hash)

window.location.hash = "";

class Login extends Component {
    constructor(){
        super()
        this.state={

        }
    }
  
    componentDidMount() {
        console.log(" aaa component mounted yee haw")
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
        console.log("AAAA")
        console.log(_token)
        this.props.changeUserToken(_token)
      
    }
  }
  
  render() {
    return (
      <div>
        
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`}
          >
            Login to Spotify
          </a>
        
      </div>
    );  
  }
}

export default Login;