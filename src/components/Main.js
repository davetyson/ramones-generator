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
    const [ lyrics, setLyrics ] = useState("");
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
                    prompt: `Generate a Ramones-style song about ${likeText} ${activity} using the following format:

                    1. Song Title
                    2. Verse
                    3. Chorus
                    4. Verse
                    5. Chorus
                    6. Bridge
                    7. Chorus`,
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
                const splitTitle = splitInit[2].split(" ");
                const verse1Raw1 = splitInit[3].split(" ");
                const verse1Raw2 = splitInit[4];
                const chorusRaw1 = splitInit[5].split(" ");
                const chorusRaw2 = splitInit[6];
                const verse2Raw1 = splitInit[7].split(" ");
                const verse2Raw2 = splitInit[8];
                const bridgeRaw1 = splitInit[11].split(" ");
                const bridgeRaw2 = splitInit[12];
                const refinedLyrics = verse1Raw1 + verse1Raw2 + chorusRaw1 + chorusRaw2 + verse2Raw1 + verse2Raw2 + chorusRaw1 + chorusRaw2 + bridgeRaw1 + bridgeRaw2 + chorusRaw1 + chorusRaw2;
                console.log(splitInit);
                console.log(splitTitle[1]);
                console.log(refinedLyrics);
                // console.log(apiData.data.choices[0].text);
                setSongTitle(splitTitle[1]);
                setLyrics(refinedLyrics);
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