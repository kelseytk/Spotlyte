import React, { Component } from "react";


export const authEndpoint = 'https://accounts.spotify.com/authorize';// Replace with your app's client ID, redirect URI and desired scopes


const clientId = "410189d5a8a2470eb3b25894300b497c";
const clientSecret ="f5688ac08e51423a846e6889cc45054f";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-top-read",
  // 'user-read-private',
  // 'user-read-email',
  //"user-read-currently-playing",
  // "user-read-playback-state",
]; // Get the hash of the url
console.log("printing hash")
console.log(window.location.hash)
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
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {
    //need auth token
    let _token = hash.access_token;
    if (_token) {
      console.log("client token found, making implicit grant")
      //implicit grant here
        fetch(
          "https://api.spotify.com/v1/me/top/artists",
            {
          method: "GET",
          headers: {'Authorization': 'Bearer ' + _token }
            }, (data)=>{
              console.log(data)
              console.log("insidereq")
            })
          
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