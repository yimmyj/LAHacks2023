import {useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';

import Auth from './components/Auth'

function App() {
<<<<<<< HEAD
  const CLIENT_IDx = "0e54d22e40f44995a3b7d456f93ce9dc";
  const CLIENT_ID = "4be96af36ff24a7fa610839f52da5344";

  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-read-private user-read-email user-top-read user-read-recently-played playlist-modify-private playlist-modify-public";
  const SHOW_DIALOG = true;

=======
>>>>>>> 278c0fb3bee4214a4b0a6c9a7de2e804a879964b
  const [token, setToken] = useState("")
  //const [playlistLink, setPlaylist] = useState("https://open.spotify.com/embed/album/2Yy84EeclNVwFDem6yIB2s?utm_source=generator");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if(hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }
  }, [])

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  }

  return (
    <div className="App">
        <header className="App-header">
        <img className="title-img" src={require('./images/musicglass-logo.png')} alt="Logo"/>
            <h1 className="page-title">Music Glass
            </h1>

            {!token ?
                <Auth />
                : <><button onClick={logout}>Logout</button></>
                }
        </header>
    </div>
  );
}

export default App;
