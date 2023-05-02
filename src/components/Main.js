import { useEffect, useState } from "react";
import axios from "axios";
import Info from "./Info";
import Input from "./Input";
import Like from "./Like";
import Generate from "./Generate";
import Lyrics from "./Lyrics";
import Disclaimer from "./Disclaimer";

const Main = () => {

    const [ songTitle, setSongTitle ] = useState("");
    const [ lyrics, setLyrics ] = useState([]);
    const [ activity, setActivity ] = useState("");
    const [ like, setLike ] = useState(false);
    const [ newSong, setNewSong ] = useState(false);
    const [ likeText, setLikeText ] = useState("");

    const handleLike = (like) => {
        if (like === true) {
            setLike(true);
            setLikeText("liking");
        } else {
            setLike(false);
            setLikeText("not liking");
        }
    };

    // Create a useEffect to handle the click of the generate button to generate new lyrics
    useEffect(() => {

        // This is where all the API call stuff is going to go!
        // I can then use that data to set the state of the songTitle and the lyrics
        if (newSong === true) {

            const apiKey = process.env.REACT_APP_API_KEY;

            axios.post(
                "https://api.openai.com/v1/completions",
                {
                    prompt: `Generate a Ramones-style song about ${likeText} ${activity} using the following format (do not provide labels):

                    Song Title
                    Verse
                    Chorus
                    Verse
                    Chorus
                    Bridge
                    Chorus`,
                    model: "text-davinci-003",
                    max_tokens: 500,
                    temperature: 0.6,
                  },
                  {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                    },
                }
            ).then((apiData) => {
                console.log(apiData);
                const splitInit = (apiData.data.choices[0].text).split("\n");
                if (splitInit[2][0] === '"') {
                    const newSplitTitleArray = splitInit[2].split('"');
                    const splitTitle = newSplitTitleArray[1];
                    setSongTitle(splitTitle);
                    console.log(splitInit[2]);
                    console.log(splitTitle);
                } else {
                    const splitTitle = splitInit[2];
                    setSongTitle(splitTitle);
                }
                // console.log(apiData.data.choices[0].text);
                setLyrics(splitInit.slice(3));
                setNewSong(false);
            });
        }
        
    }, [newSong])

    return (
        <>
            <Info />
            <Input
                activity={activity}
                setActivity={setActivity}
            />
            <Like
                like={like}
                setLike={setLike}
                handleLike={handleLike}
            />
            <Generate
                setNewSong={setNewSong}
            />
            <Lyrics
                songTitle={songTitle}
                lyrics={lyrics}
            />
            <Disclaimer />
        </>
    )
}

export default Main;