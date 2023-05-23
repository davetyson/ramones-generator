import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get} from "firebase/database";

const MySongs = () => {

    // useStates
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ localUserID, setLocalUserID ] = useState("");
    const [ localUserToken, setLocalUserToken ] = useState("");
    const [ fbUserToken, setFbUserToken ] = useState("");
    const [ pulledSongList, setPulledSongList ] = useState([]);

    // // initial firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyCggW88fy90jEAac9ygi33b-XL4gZsAtIk",
        authDomain: "ramones-generator.firebaseapp.com",
        databaseURL: "https://ramones-generator-default-rtdb.firebaseio.com",
        projectId: "ramones-generator",
        storageBucket: "ramones-generator.appspot.com",
        messagingSenderId: "295603373754",
        appId: "1:295603373754:web:e9f185081077c9b863e483"
      };

    // // initialize firebase app and database
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const userDb = ref(database, `/${localUserID}/userToken`);
    const songList = ref(database, `/${localUserID}/songs`);
    // const dbRef = ref(database);

    // This can probably be used in the sign up form later
    // // Define push function to add user inputted messages to database
    // const addToList = function (userResponse){
    //     return push(answers, userResponse);
    // };

    // some get language for getting the info from fb
    // get (answers)
    //             .then((data)=>{
    //                 let aObj = data.val();
    //                 let aArray = Object.values(aObj);
    //              };

    

    const pullSongs = async () => {

        await get(ref(database, `/${localUserID}/songs`))
        .then((data)=>{
            console.log(songList);
            console.log(data.val());
            let songArray = Object.entries(data.val());
            console.log(songArray);
            setPulledSongList(songArray);
            // let songArray = [];
            // songArray = Object.entries(data.val());
            // setPulledSongList(songArray);
        });
    }

    const loginCheck = async () => {

        await get(ref(database, `/${localUserID}`))
        .then((data)=>{
            console.log(userDb);
            console.log(data.val());
            setLocalUserID(localStorage.getItem("userID"));
            setLocalUserToken(localStorage.getItem("userToken"));
            console.log(localUserToken);
            console.log(data.val());
            let dataObj = data.val();
            console.log(dataObj);
            let dataArray = Object.entries(dataObj)[1][1];
            console.log(dataArray);
            let dbToken = dataArray["userToken"];
            // dbToken = Object.entries(dbToken)[1];
            console.log(dbToken);
            // if (dbToken.constructor.name === "Object") {
            //     dbToken = Object.entries(dbToken);
            //     console.log(dbToken);
            //     dbToken = dbToken[0][1];
            //     console.log(dbToken);
            // }
            setFbUserToken(dbToken);
            // pullSongs();
        });
        // .then(()=>{
        //     if (localUserToken === fbUserToken && localUserToken !== "") {
        //         setLoggedIn(true);
        //         console.log(localUserToken);
        //         console.log(fbUserToken);
        //     } else {
        //         console.log(localUserToken);
        //         console.log(fbUserToken);
        //         setLoggedIn(false);
        //     }
        // });
        // .then((userObj)=>{
        //     console.log(userObj);
        //     let userArray = Object.entries(userObj)[1];
        //     let fbUserToken = userArray[1];
        //     setFbUserToken(fbUserToken);
        // });

        // await get(songList)
        //     .then((data)=>{
        //         console.log(data.val());
        //         let songArray = Object.entries(data.val());
        //         setPulledSongList(songArray);
        //     });
    };

    useEffect(() => {
        window.addEventListener('storage', loginCheck);
        console.log("hello");

        console.log(localUserToken);
        loginCheck();
        return () => {
            window.removeEventListener('storage', loginCheck);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // setLoggedIn(false);
        loginCheck();
        // setLoggedIn(false);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (loggedIn === true) {
            console.log("pulling songs");
            pullSongs();
        }
    }, [loggedIn]);

    useEffect(()=>{
        if (localUserToken === fbUserToken && localUserToken !== "") {
            setLoggedIn(true);
            console.log(localUserToken);
            console.log(fbUserToken);
        } else {
            console.log(localUserToken);
            console.log(fbUserToken);
            setLoggedIn(false);
        }
    }, [localUserToken, fbUserToken]);

    console.log(loggedIn);
    
    return (
        <section className="p-10">
            <h2 className="uppercase quantico mb-5 w-full text-4xl font-bold text-customGreen">My Songs</h2>
            <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto"><NavLink to="/login" className="underline">Log in</NavLink> to view your saved songs!</p>
            <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">{loggedIn === true ? `You are logged in!` : `You are not logged in!`}</p>
            <h3 className="mb-5 text-2xl quantico underline">Saved Songs</h3>

            {pulledSongList.map((song) => {
                return(
                    <div key={song[0]}>
                        <p key={song[0]} className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">{song[0]}</p>
                        <p key={song[1]} className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">{song[1]}</p>
                    </div>
                )
            })}
        </section>
    );
};

export default MySongs;

                