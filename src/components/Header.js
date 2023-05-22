import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/ramonesGeneratorLogo.png'
// import Login from './Login';
import NavBar from './NavBar';
// import LoginForm from './LoginForm';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
// If I need the emulator I can bring it back
// connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword

const Header = () => {

    // TO DO
    // Because of the weirdness of passing state values between links, I'm going to move all the login/auth stuff for firebase to the login form instead of having it in the header here - DONE
    // The Header will only have the login button and link to it like any other Nav link - DONE
    // Once I move all this firebase stuff to the login form, the input states will work again - DONE
    // I can run all the functions to check the login data when the user submits their form - DONE
    // Depending on what happens, render different html
    // Store the user ID in the local storage and see if you can use that to access later when they click on the "my songs" area, and pull it into a new state from there, rather than trying to pass the same state down through links 
    // Clean up the header and login form code to tidy up

    // useStates
    const [ loggedIn, setLoggedIn ] = useState(false);

    // const [ loginError , setLoginError ] = useState("");
    // const [ loginWindow , setLoginWindow ] = useState(false);
    // const [ email , setEmail ] = useState("");
    // const [ password , setPassword ] = useState("");


    // initial firebase config
    const firebaseConfig = {
    apiKey: "AIzaSyCggW88fy90jEAac9ygi33b-XL4gZsAtIk",
    authDomain: "ramones-generator.firebaseapp.com",
    projectId: "ramones-generator",
    storageBucket: "ramones-generator.appspot.com",
    messagingSenderId: "295603373754",
    appId: "1:295603373754:web:e9f185081077c9b863e483"
    };

    // initialize firebase app and auth
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const logOut = async () => {
        const loggedOutMsg = await signOut(auth);
        console.log(loggedOutMsg);
        setLoggedIn(false);
        localStorage.setItem("userEmail", "");
        localStorage.setItem("userID", "");
        window.dispatchEvent(new Event('storage'))
    };

    // Emulators
    // connectAuthEmulator(auth, "https://localhost:9099");

    // logAttempt function
    // const logAttempt = async (e) => {
    //     e.preventDefault();
    //     if (loggedIn === false) {
    //         // test data
    //         const loginEmail = email;
    //         const loginPassword = password;

    //         // call 
    //         const auth = getAuth(app);
    //         await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    //         .then((userCredential) => {
    //             const user = userCredential.user;
    //             setLoggedIn(true);
    //             console.log(user);
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             setLoggedIn(false);
    //             setLoginError(errorCode);
    //             console.log(errorCode);
    //             console.log(errorMessage);
    //         });
    //     } else {
    //         const loggedOutMsg = await signOut(auth);
    //         console.log(loggedOutMsg);
    //         setLoggedIn(false);
    //     }
    // }

    // // this just console.logs the loggedIn status so I know what it is while testing
    // // useEffect(() => {
    // //     console.log(loggedIn);
    // // }, [loggedIn])

    // useEffect(() => {
    //     console.log(loginError);
    //     // create some code here that does this
    //     // if the login error is null or blank (i.e. page load) do nothing
    //     // if the login error is about the email, flash that the email is wrong
    //     // if the login error is about the password, flash that the password is wrong
    //     // if the login error is about anything else, flash try again
    //     // see about how you include a password reset link
    // }, [loginError])

    // setLoggedIn(false);

    const loginCheck = () => {
        const userEmail = localStorage.getItem("userEmail");
        const userID = localStorage.getItem("userID");
        console.log(userEmail);
        console.log(userID);

        if (userEmail === "") {
            console.log(userEmail);
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
            console.log(userID);
        }
    };

    useEffect(() => {
        window.addEventListener('storage', loginCheck);

        return () => {
            window.removeEventListener('storage', loginCheck);
        };
    }, []);

    console.log(loggedIn);


    return (
        <>
           <header className="h-20vh pt-5">
                <div className="relative max-w-7xl mx-auto">
                    <h1 className="sr-only">Ramones Generator</h1>
                    <NavLink to="/">
                    <figure className="max-w-screen-md mx-auto -mb-10">
                        <img className="p-5" src={logo} alt="ramones generator" />
                    </figure>
                    </NavLink>
                </div>
                <NavLink to={loggedIn === false ? "/login" : null}>
                    <button className="p-2 mt-5 md:mt-0 border-4 border-white bg-customGreen rounded-md text-lg sm:text-2xl text-black font-bold lg:absolute lg:right-14 lg:top-10 transition hover:text-customGreen focus:text-customGreen hover:bg-black focus:bg-black" onClick={loggedIn === true ? logOut : null}>{loggedIn === false ? `Log In` : `Log Out`}</button>
                </NavLink>
                <NavBar />
            </header> 
        </>
    )
};

export default Header;