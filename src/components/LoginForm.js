import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// If I need the emulator I can bring it back
// connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword

const LoginForm = (props) => {

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

    // Emulators
    // connectAuthEmulator(auth, "https://localhost:9099");

    // logAttempt function
    const logAttempt = async (e) => {
        e.preventDefault();
        if (loggedIn === false) {
            const loginEmail = email;
            const loginPassword = password;

            // call 
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                const userID = user.auth.currentUser.uid;
                const userEmail = user.auth.currentUser.email;
                setLoggedIn(true);
                console.log(userEmail);
                console.log(userID);
                localStorage.setItem("userEmail", userEmail);
                localStorage.setItem("userID", userID);
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

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <section className="p-10">
                <h2 className="mb-10 uppercase quantico w-full text-4xl font-bold text-customGreen">Log In</h2>
                <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">Log in to your account to save new songs and view your saved favorites!</p>
                <div>
                    <form onSubmit={logAttempt}>
                        <fieldset className="flex flex-col items-center">
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input className="text-white text-center lg:text-2xl text-l border-4 border-white mb-5 p-1 quantico rounded-md bg-black w-1/2" id="email" type="email" placeholder="Email" onChange={handleEmailChange} value={props.email} />
                            <label className="sr-only" htmlFor="password">Password</label>
                            <input className="text-white text-center lg:text-2xl text-l border-4 border-white mb-5 p-1 quantico rounded-md bg-black w-1/2" id="password" type="password" placeholder="Password" onChange={handlePasswordChange} value={props.password} />
                        </fieldset>
                        <button type="submit" className="p-2 mt-5 md:mt-0 border-4 border-white bg-customGreen rounded-md text-lg sm:text-2xl text-black font-bold transition hover:text-customGreen focus:text-customGreen hover:bg-black focus:bg-black">Log In</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default LoginForm;