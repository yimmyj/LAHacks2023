const querystring = require('querystring');

const CLIENT_ID = "0e54d22e40f44995a3b7d456f93ce9dc";
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "user-read-private user-read-email user-top-read user-read-recently-played playlist-modify-private playlist-modify-public";
const SHOW_DIALOG = true;

const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: RESPONSE_TYPE,
    redirect_uri: REDIRECT_URI,
    show_dialog: SHOW_DIALOG,
    scope: SCOPE
});

const Auth = () => {
    return (
        <a className = "login-button" href={`${AUTH_ENDPOINT}?${queryParams}`}>
            Login to Spotify
        </a>
    )
}

export default Auth