import React, { useState, useEffect } from 'react';
const { Configuration, OpenAIApi } = require("openai");

const ChatBox = ({ onResponseArrayChange }) => {


  const [input, setInput] = useState('');
  const [response, setResponse] = useState("");
  const [responseArray, setResponseArray] = useState([]);

  useEffect(() => {
    onResponseArrayChange(responseArray);
  }, [responseArray, onResponseArrayChange]);

  const configuration = new Configuration({
    apiKey: "",
  });
  delete configuration.baseOptions.headers['User-Agent'];
  const openai = new OpenAIApi(configuration);

  const handleSubmit  = async (e) => {
    e.preventDefault();
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `"acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music" I will describe a situation, and choose up to 5 genres (you can choose less than 5) from this list to describe it. Please output only the exact names (lowercase, dashes when needed) in the input and nothing else, separated by commas, and add a "#" before the list: ${input}`}]
    });
    // console.log(res.data.choices[0].message.content);
    setResponse(res.data.choices[0].message.content);

    let regexd = extractTerms(res.data.choices[0].message.content);
    // console.log(regexd)
    if (regexd[0] !== "invalid"){
      setResponseArray(regexd)
    }

    document.getElementById('rec').style.display = "block";
  }
  
  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  function extractTerms(str) {
    try{
    const regex = /#(\w+-?\w*)/g;
    const result = str.match(regex).map(match => match.replace("#", ""));
    return result;
    }
    catch(e){
      return ["invalid"]
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input placeholder='Enter a prompt' type="text" value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p id="rec">Recommended Genres: {response}</p>
    </div>
  );
}

export default ChatBox;
