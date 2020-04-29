import React, { Component } from "react";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";



export const authEndpoint = 'https://accounts.spotify.com/authorize';// Replace with your app's client ID, redirect URI and desired scopes


const clientId = "410189d5a8a2470eb3b25894300b497c";
const clientSecret ="f5688ac08e51423a846e6889cc45054f";
const redirectUri = "http://localhost:3000";
const scopes = [
  "playlist-read-collaborative",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
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
            })
          
    this.props.changeUserToken(_token)
  }
}

render() {
  return (
      <Card>
        <Card.Header>Spotify Login</Card.Header>
        <Card.Body>
          <Card.Title>Login to spotify to continue</Card.Title>
          <Card.Text>
            In order to use Spotlyte, you will have to authorize access to the app from your spotify account.
          </Card.Text>
          <Button
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`}
          >
            Login to Spotify
          </Button>
        </Card.Body>
      </Card>
  );
}
}

export default Login;
