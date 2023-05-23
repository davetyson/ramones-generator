import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
// If I need the emulator I can bring it back
// connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword

const LoginForm = (props) => {

    // useStates
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ loginError , setLoginError ] = useState("");
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ email , setEmail ] = useState("");
    const [ password , setPassword ] = useState("");
    const [ signingUp , setSigningUp ] = useState(false);
    const [ forgotPassword, setForgotPassword ] = useState(false);
    const [ resetSent, setResetSent ] = useState(false);
    const [ actionText, setActionText ] = useState("");
    const [ infoP, setInfoP ] = useState("");

    // FIREBASE INIT
    const firebaseConfig = {
        apiKey: "AIzaSyCggW88fy90jEAac9ygi33b-XL4gZsAtIk",
        authDomain: "ramones-generator.firebaseapp.com",
        databaseURL: "https://ramones-generator-default-rtdb.firebaseio.com",
        projectId: "ramones-generator",
        storageBucket: "ramones-generator.appspot.com",
        messagingSenderId: "295603373754",
        appId: "1:295603373754:web:e9f185081077c9b863e483"
      };

    // initialize firebase app
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    // Emulators
    // connectAuthEmulator(auth, "https://localhost:9099");

    // FIREBASE CALL FUNCTION
    const fbAction = async (fbCall) => {
        const loginEmail = email.trim();
        const loginPassword = password.trim();

        if (fbCall === sendPasswordResetEmail) {
            const auth = getAuth(app);
            await sendPasswordResetEmail(auth, email.trim())
            .then(() => {
                setForgotPassword(false);
                setResetSent(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoginError(errorCode);
                console.log(errorCode);
                console.log(errorMessage);
                setResetSent(false);
            });
        } else {
            // call 
            const auth = getAuth(app);
            await fbCall(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                const userID = user.auth.currentUser.uid;
                const userToken = user.auth.currentUser.accessToken;
                
                set(ref(database, `/${userID}/userToken/`), {userToken: userToken});
            // .then((data)=>{
            //     let userObj = data.val();
            //     return userObj;
            //     // let userArray = Object.entries(userObj)[1];
            //     // let fbUserToken = userArray[1];
            //     // setFbUserToken(fbUserToken);
            // })
            // .then((userObj)=>{
            //     console.log(userObj);
            //     const userArray = Object.entries(userObj)[1];
            //     let fbUserToken = userArray[1];
            //     setFbUserToken(fbUserToken);
            // });

                console.log(userToken);
                console.log(userID);
                localStorage.setItem("userToken", userToken);
                localStorage.setItem("userID", userID);
                window.dispatchEvent(new Event('storage'))
                console.log(user);
                setEmail("");
                setPassword("");
                if (signingUp === true) {
                    setSigningUp(false);
                }
                setLoggedIn(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoggedIn(false);
                setLoginError(errorCode);
                console.log(errorCode);
                console.log(errorMessage);
            });
        }
    };

    // check which fb action to run when button is clicked
    const checkFormAction = (e) => {
        e.preventDefault();
        if (forgotPassword === true) {
            fbAction(sendPasswordResetEmail);
        } else if (signingUp === true) {
            fbAction(createUserWithEmailAndPassword);
        } else {
            fbAction(signInWithEmailAndPassword);
        }
    };

    // reset of states after password reset sent successfully
    const resetDefaults = () => {
        setSigningUp(false);
        setForgotPassword(false);
        setResetSent(false);
    }

    // controlled inputs
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // useEffect to determine h2 text
    useEffect(() => {
        console.log(signingUp);
        console.log(loggedIn);
        console.log(forgotPassword);
        if (loggedIn === true) {
            setActionText("You are now logged in");
            setInfoP("Congratulations! You are now logged in.");
        } else if (forgotPassword === true) {
            setActionText("Reset Password");
            setInfoP("Enter your email to reset your password.");
        } else if (signingUp === true) {
            setActionText("Sign Up");
            setInfoP("Sign up for an account to save your favorite songs!");
        } else if (resetSent === true) {
            setActionText("Your Password Reset Email Has Been Sent");
            setInfoP("Please check your email inbox to reset your password!")
        } else {
            setActionText("Log In");
            setInfoP("Log in to your account to save new songs and view your saved favorites!");
        }
    }, [forgotPassword, loggedIn, signingUp, resetSent]);

    // check for an error message and determine which one to display to the user if one exists
    useEffect(() => {        
        if (loginError === "") {
            setErrorMsg("");
        } else if (loginError === "auth/email-already-in-use") {
            setErrorMsg("This email already has an account. Try logging in to access your songs.");
        } else if (loginError === "auth/invalid-email") {
            setErrorMsg("Please enter a valid email address.");
        } else if (loginError === "auth/wrong-password") {
            setErrorMsg("Incorrect password. Please try again.");
        } else if (loginError === "auth/user-not-found") {
            setErrorMsg("This email does not have an account yet. Try signing up to save your songs.");
        } else if (loginError === "auth/too-many-requests") {
            setErrorMsg("There have been too many failed logins for this account. Please try logging in again in a few hours or use another account.");
        } else if (loginError === "auth/missing-password") {
            setErrorMsg("Please enter your password.");
        } else {
            setErrorMsg("There has been an error.");
        }
        setTimeout(() => {
            setLoginError("")
        }, 4000);
    }, [loginError]);

    // this just console.logs the loggedIn status so I know what it is while testing
    useEffect(() => {
        console.log(loggedIn);
    }, [loggedIn]);

    console.log(resetSent);

    // the below function/useEffect are the beginnings of a check to see if we are already logged in if this page is loaded independently. once I have a richer system of verifying logins in place, I can use those same calls to check things out here and modify the below function/useEffect as needed. commenting out for now

    // use this to see if the user is logged in already on page load
    // const loginCheck = () => {
    //     const userToken = localStorage.getItem("userToken");
    //     const userID = localStorage.getItem("userID");
    //     console.log(userToken);
    //     console.log(userID);

    //     if (userToken === "") {
    //         console.log(userToken);
    //         setLoggedIn(false);
    //     } else {
    //         setLoggedIn(true);
    //         console.log(userID);
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('storage', loginCheck);

    //     return () => {
    //         window.removeEventListener('storage', loginCheck);
    //     };
    // }, []);

    return (
        <>
            <section className="p-10">
                <h2 className="uppercase quantico mb-5 w-full text-4xl font-bold text-customGreen">{actionText}</h2>
                {loginError !== "" ?
                <div>
                    <p className="mx-auto my-2 p-2 w-1/2 bg-white text-black rounded-lg quantico text-lg transition animate-fade">{errorMsg}</p>
                </div>
                : <></>
                }
                { loggedIn === false ?
                <>
                    <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">{infoP}</p>
                    {resetSent === false ?
                        <form onSubmit={(e)=>{checkFormAction(e)}}>
                            <fieldset className="flex flex-col items-center">
                                <label className="sr-only" htmlFor="email">Email</label>
                                <input className="text-white text-center lg:text-2xl text-lg border-4 border-white mb-5 p-1 quantico rounded-md bg-black w-full md:w-1/2" id="email" type="email" placeholder="Email" onChange={handleEmailChange} value={email} />
                                {forgotPassword === false ?
                                <>
                                    <label className="sr-only" htmlFor="password">Password</label>
                                    <input className="text-white text-center lg:text-2xl text-lg border-4 border-white mb-5 p-1 quantico rounded-md bg-black w-full md:w-1/2" id="password" type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
                                </>
                                : <></>
                                }
                            </fieldset>
                            <button type="submit" className="p-2 mt-5 md:mt-0 border-4 border-white bg-customGreen rounded-md text-lg sm:text-2xl text-black font-bold transition hover:text-customGreen focus:text-customGreen hover:bg-black focus:bg-black">{actionText}</button>
                        </form>
                    : 
                        <></>
                    }
                    {resetSent === false ?
                        <>
                            {signingUp === false ? 
                                forgotPassword === false ?
                                <p className="mt-5 text-lg lg:w-2/3 inline-block mx-auto">Forgot your password? <button className="underline" onClick={()=>{setForgotPassword(true)}}>Click here</button> to reset your password.</p>
                                : 
                                    <></>
                            :
                                <></>
                            }
                            {signingUp === false ? 
                                forgotPassword === false ?
                                    <p className="mt-5 text-lg lg:w-2/3 inline-block mx-auto">Don't have an account? <button className="underline" onClick={()=>{setSigningUp(true)}}>Sign up for one here</button> to save your favorite songs!</p>
                                :
                                    <p className="mt-5 text-lg lg:w-2/3 inline-block mx-auto">Remember your password? <button className="underline" onClick={()=>{setForgotPassword(false)}}>Click here</button> to return to the log in page.</p>
                            :
                                <p className="mt-5 text-lg lg:w-2/3 inline-block mx-auto">Already have an account? <button className="underline" onClick={()=>{setSigningUp(false)}}>Click here</button> to return to the log in page.</p>
                            }
                        </>
                    :
                        <p className="text-lg lg:w-2/3 inline-block mx-auto"><button className="underline" onClick={()=>{resetDefaults()}}>Click here</button> to try your log in again.</p>
                    }
                </>
            :
                <>
                    <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">{infoP}</p>
                    <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto"><NavLink to="/" className="underline">Head to the Generator</NavLink> to start generating songs!</p>
                </>
            }
            </section>
        </>
    )
}

export default LoginForm;