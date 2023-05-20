import { useState, useEffect } from 'react';
import logo from '../assets/ramonesGeneratorLogo.png'
import Login from './Login';
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, signOut } from "firebase/auth";
// If I need the emulator I can bring it back
// connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword

const Header = () => {

    // useStates
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ loginError , setLoginError ] = useState("");
    const [ email , setEmail ] = useState("");
    const [ password , setPassword ] = useState("");


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
    
    // I gotta check on this line above because I also const auth in the loginEmailPassword thing. It works just fine right now but seems a bit oddly built. I probably need to switch this all around so that the loginEmailPassword is actually just a useEffect that is triggered when the loggedIn state changes, rather than a function that is called when the Login button is clicked. That way I don't need the two functions (loginEmailPassword and logOut), I can just put them all in one useEffect and say "if loggedIn === false" then run the signOut call, and "if loggedIn === true" then run the signIn call and do all the error handling.

    // Emulators
    connectAuthEmulator(auth, "https://localhost:9099");

    // logAttempt function
    const logAttempt = async () => {
        if (loggedIn === false) {
            // test data
            const loginEmail = "test@test.com";
            const loginPassword = "123456";

            // call 
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoggedIn(true);
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoggedIn(false);
                setLoginError(errorCode);
                console.log(errorCode);
                console.log(errorMessage);
            });
        } else {
            const loggedOutMsg = await signOut(auth);
            console.log(loggedOutMsg);
            setLoggedIn(false);
        }
    }

    // login logic when login/out button is clicked
    // const loginEmailPassword = async () => {

    //     // test data
    //     const loginEmail = "test@test.com";
    //     const loginPassword = "123456";

    //     // call 
    //     const auth = getAuth(app);
    //         signInWithEmailAndPassword(auth, loginEmail, loginPassword)
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
    // }

    // // this logs the user out but see the note above about adapting into a useEffect
    // const logOut = async () => {
    //     const loggedOutMsg = await signOut(auth);
    //     console.log(loggedOutMsg);
    //     setLoggedIn(false);
    // }

    // this just console.logs the loggedIn status so I know what it is while testing
    useEffect(() => {
        console.log(loggedIn);
    }, [loggedIn])

    useEffect(() => {
        console.log(loginError);
        // create some code here that does this
        // if the login error is null or blank (i.e. page load) do nothing
        // if the login error is about the email, flash that the email is wrong
        // if the login error is about the password, flash that the password is wrong
        // if the login error is about anything else, flash try again
        // see about how you include a password reset link
    }, [loginError])

    return (
        <>
           <header className="h-20vh pt-5">
                <div className="relative max-w-7xl mx-auto">
                    <h1 className="sr-only">Ramones Generator</h1>
                    <figure className="max-w-screen-md mx-auto -mb-10">
                        <img className="p-5" src={logo} alt="ramones generator" />
                    </figure>
                </div>
                <Login 
                    // loginEmailPassword={loginEmailPassword}
                    // logOut={logOut}
                    loggedIn={loggedIn}
                    logAttempt={logAttempt}
                />
                <NavBar />
                {loggedIn === false ? 
                    <LoginForm 
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    /> : <></>}
            </header> 
        </>
    )
};

export default Header;