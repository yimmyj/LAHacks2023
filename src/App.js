import {useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';

import Auth from './components/Auth'

function App() {
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
    console.log(token);
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
