import {useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';

import Auth from './components/Auth'
import Button from './components/Button'
import User from './components/User'
import Playlist from './components/Playlist'
import ChatBox from './components/ChatBox';

function App() {
  const [token, setToken] = useState("")
  const [userID, setID] = useState("")
  const [userData, setUserData] = useState({})
  const [favorites, setFavorites] = useState([])
  const [mins, setMins] = useState(null);
  const [secs, setSecs] = useState(null);
  const [playlistLink, setPlaylist] = useState("");

  const [actualInput, setActualInput] = useState("rap,hip-hop");

  const [genresList, setGenresList] = useState(["piano"]);

  async function handleGenresListChange(newGenres) {
    setGenresList(newGenres);
    setActualInput(genresList.join(","));
    await getFavorites(token);
    renderFavorites();
  }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if(hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
      findUser(token);
      loadEverything(token);
    }
  }, [])

  const logout = () => {
    setToken("");
    setUserData({});
    setFavorites([]);
    setPlaylist("");
    window.localStorage.removeItem("token");
  }

  const findUser = async (token) => {
    const {data} = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    setUserData(data);
    setID(data.id);
  }

  const loadEverything = async (token) => {
    getFavorites(token);
  }

  const getFavorites = async (token) => {
      console.log(genresList.join(","))
      console.log("genresList")
      console.log(token)

      const {data} = await axios.get('https://api.spotify.com/v1/recommendations', {
        params: {
          seed_genres: actualInput,
          limit: 100
        },
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      
      console.log(data)
      setFavorites(data)
    }

    const renderFavorites = () => {
      if(!favorites.tracks){
        return;
      }
      else{
        //let topTracks = []
        let favoritesInfo = []
        for(let i=0; i<favorites.tracks.length; i++){
          favoritesInfo.push({key:i, duration: Math.round(favorites.tracks[i].duration_ms/1000),
          uri: favorites.tracks[i].uri});
        }
        //let pickedSongs = generatePlaylist(1200, trackLengths);

        /*for(let i=0; i<favorites.items.length; i++){
           topTracks.push({key: i, duration: favorites.items[i].duration_ms,
           id: favorites.items[i].id, uri: favorites.items[i].uri, name: favorites.items[i].name})
        }*/
        return (
          <div>
           <input className="input"
                     type="number"
                     value={mins}
                     placeholder="00"
                     min = "0" max = "59"
                     onChange={(e) => setMins(e.target.value)}
                     
                   />
           <p className="text">:</p>
           <input className="input"
                     type="number"
                     value={secs}
                     placeholder="00"
                     min = "0" max = "59"
                     onChange={(e) => setSecs(e.target.value)}
                              />

            <button className="button" onClick={() => createActualPlaylist(mins, secs, favoritesInfo)}> Create Playlist </button>
          </div>
        )
      }
    }

  const generatePlaylist = (targetTime, songs) => {
      //let songs =
      const table = Array(songs.length+1).fill()
      .map(() => Array(targetTime+1).fill(false));

      for (let i = 0; i <= songs.length; i++) {
              table[i][0] = true;
          }

          for (let i = 1; i <= songs.length; i++) {
              for (let j = 1; j <= targetTime; j++) {
                  if (j - songs[i - 1] >= 0) {
                      table[i][j] = table[i - 1][j] || table[i - 1][j - songs[i - 1]];
                  } else {
                      table[i][j] = table[i-1][j];
                  }
              }
          }
          let currentCol = 0;

          for (let j = targetTime; j >= 0; j--){
              if (table[songs.length][j] !== false){
                  currentCol = j;
                  break;
              }
          }


          let currentRow = songs.length;
          let pickedSongs = [];


          while (currentCol > 0 && currentRow > 0){
              if (table[currentRow][currentCol - songs[currentRow - 1]]){
                  pickedSongs.push(currentRow-1);
                  currentCol -= songs[currentRow - 1];
                  currentRow--;
              }
              else if(currentCol > 0 && currentRow > 0 && (table[currentRow-1][currentCol])){
                  currentRow--;
              }
          }
          return(pickedSongs);
  }

  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const reformatSeconds = (time) => {
   let seconds = time % 60;
   let minutes = Math.floor(time/60);

   if (0 < seconds < 10) seconds = "0"+seconds;
   if (0 < minutes < 10) minutes = "0"+minutes;
   return minutes+":"+seconds;
  }

 const createActualPlaylist = async(mins, secs, tracks) => {
    let result = await getFavorites(token);
  
    if (mins > 59 || mins < 0 || secs < 0 || secs > 59){
    alert("Not valid time");
    return;
    }
 //UsableSongs should be an array with key=duration: value= song length in seconds,
 //key=uri: value = spotify URI of the track
    let usableSongs = shuffle(tracks);
    let time = 60 * Number(mins) + Number(secs);
    if (secs < 10) secs = '0'+secs;

     let trackLengths = [];
     for(let i=0; i<usableSongs.length; i++){
              trackLengths.push(usableSongs[i].duration);
      }

     let pickedSongs = generatePlaylist(time, trackLengths);

     if (pickedSongs.length === 0){
     alert("Time picked is too short!");
     return;
     }

     let pickedSongsString = usableSongs[pickedSongs[0]].uri;
     let actualTime = trackLengths[pickedSongs[0]];

     for (let i=1; i<pickedSongs.length; i++){
       pickedSongsString += ',';
       pickedSongsString += usableSongs[pickedSongs[i]].uri;
       actualTime += trackLengths[pickedSongs[i]];
     }

     if (actualTime / time < 0.96){
     alert("ERROR: Unable to generate");
     return;
     }

     let payload = { name: 'Your ' + mins +':'+secs+' playlist',
     description: 'Duration: '+ reformatSeconds(actualTime) + '  |  Generated with Musicglass', public: 'false' };

     const playlistRes = await axios.post("https://api.spotify.com/v1/users/"+userID+"/playlists", payload, {
                  headers: {
                      Authorization: `Bearer ${token}`
              }})

     let playlistData = playlistRes.data;
     let playlist_id = playlistData.id;
     const addSongsRes = await axios.post("https://api.spotify.com/v1/playlists/"+playlist_id+"/tracks?uris="+pickedSongsString, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                    }})

     setPlaylist("https://open.spotify.com/embed/playlist/"+playlist_id+"?utm_source=generator");
 }

  return (
    <div className="App">
      
      <header className="App-header">

      <img className="title-img" src={require('./images/hourglass.png')} alt="Logo"/>
        <div class="login-block">
          
          <h1 className="page-title">Music Glass</h1>

        {!token ?
          <Auth /> : 
          <>
            <Playlist playlistLink={playlistLink}/>
            <ChatBox onResponseArrayChange={handleGenresListChange}/>
          </>
        }
        {renderFavorites()}
        <User userData={userData} logoutHandler={logout}/>


          </div>
        </header>

        
    </div>
  );
}

export default App;
