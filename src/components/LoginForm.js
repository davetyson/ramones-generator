import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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
    // const auth = getAuth(app);

    // Emulators
    // connectAuthEmulator(auth, "https://localhost:9099");

    // logAttempt function
    const logAttempt = async (e) => {
        e.preventDefault();
        const loginEmail = email.trim();
        const loginPassword = password.trim();

        // call 
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            const userID = user.auth.currentUser.uid;
            const userToken = user.auth.currentUser.accessToken;
            setLoggedIn(true);
            console.log(userToken);
            console.log(userID);
            localStorage.setItem("userToken", userToken);
            localStorage.setItem("userID", userID);
            window.dispatchEvent(new Event('storage'))
            console.log(user);
            setEmail("");
            setPassword("");
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

    const loginCheck = () => {
        const userToken = localStorage.getItem("userToken");
        const userID = localStorage.getItem("userID");
        console.log(userToken);
        console.log(userID);

        if (userToken === "") {
            console.log(userToken);
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
            console.log(userID);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const createAccount = async (e) => {
        e.preventDefault();
        const newEmail = email.trim();
        const newPassword = password.trim();
        // call 
        const auth = getAuth(app);
        await createUserWithEmailAndPassword(auth, newEmail, newPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            const userID = user.auth.currentUser.uid;
            const userToken = user.auth.currentUser.accessToken;
            setLoggedIn(true);
            console.log(userToken);
            console.log(userID);
            localStorage.setItem("userToken", userToken);
            localStorage.setItem("userID", userID);
            window.dispatchEvent(new Event('storage'))
            console.log(user);
            setEmail("");
            setPassword("");
            setSigningUp(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoggedIn(false);
            setLoginError(errorCode);
            setSigningUp(true);
            console.log(errorCode);
            console.log(errorMessage);
        });
    }

    const resetPassword = async () => {
        setForgotPassword(true);
        const auth = getAuth(app);
        sendPasswordResetEmail(auth, email.trim())
        .then(() => {
            // Password reset email sent!
            setResetSent(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginError(errorCode);
            console.log(errorCode);
            console.log(errorMessage);
            setResetSent(false);
            // ..
        });
    };

    const checkFormAction = () => {
        if (forgotPassword === true) {
            resetPassword();
        } else if (signingUp === true) {
            createAccount();
        } else {
            logAttempt();
        }
    };

    useEffect(() => {
        window.addEventListener('storage', loginCheck);

        return () => {
            window.removeEventListener('storage', loginCheck);
        };
    }, []);

    // this just console.logs the loggedIn status so I know what it is while testing
    useEffect(() => {
        console.log(loggedIn);
    }, [loggedIn]);

    // useEffect(() => {
    //     resetPassword();
    //     // eslint-disable-next-line
    // }, [signingUp]);

    useEffect(() => {
        console.log(loginError);
        
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
        } else {
            setErrorMsg("There has been an error.");
        }
        setTimeout(() => {
            setLoginError("")
        }, 4000);
    }, [loginError]);

    // Will need to keep working on this to make sure that the reset password functions work
    // Right now the navigation between log in and sign up works perfectly, you can move between all those links just fine and everything renders as it should
    // When you click in to reset your password, and then click the sign up button, it doesn't re-render the h2, the text, or the form, so I need to work on this
    // Will likely have to take all the spots where I'm checking for three things (are we logging in, signing up, or did we forget our password) and create functions for them, like I did for the form submission
    // Check for certain state conditions and then if they exist, put certain information into a variable, and use that variable in the rendered html
    // Will be able to remove most of the ternary's after moving things into functions, and then things should work well

    return (
        <>
            <section className="p-10">
                {loggedIn === false ?
                    forgotPassword === false ?
                        <h2 className="uppercase quantico mb-5 w-full text-4xl font-bold text-customGreen">{signingUp === false ? `Log In` : `Sign Up`}</h2>
                    :
                        <h2 className="uppercase quantico mb-5 w-full text-4xl font-bold text-customGreen">Reset Password</h2>
                : 
                    <h2 className="uppercase quantico mb-5 w-full text-4xl font-bold text-customGreen">You are logged in</h2>
                }
                {loginError !== "" ?
                <div>
                    <p className="mx-auto my-2 p-2 w-1/2 bg-white text-black rounded-lg quantico text-lg transition animate-fade">{errorMsg}</p>
                </div>
                : <></>
                }
                { loggedIn === false ?
                <>
                {forgotPassword === false ?
                    <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">{signingUp === false ? `Log in to your account to save new songs and view your saved favorites!` : `Sign up for an account to save your favorite songs!`}</p>
                : 
                    <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">{resetSent === false ? `Enter your email to reset your password` : `Password reset sent! Please check your email to reset your password.`}</p>
                }
                    <form onSubmit={checkFormAction}>
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
                        {forgotPassword === false ?
                            <button type="submit" className="p-2 mt-5 md:mt-0 border-4 border-white bg-customGreen rounded-md text-lg sm:text-2xl text-black font-bold transition hover:text-customGreen focus:text-customGreen hover:bg-black focus:bg-black">{signingUp === false ? `Log In` : `Sign Up`}</button>
                        : 
                            <button type="submit" className="p-2 mt-5 md:mt-0 border-4 border-white bg-customGreen rounded-md text-lg sm:text-2xl text-black font-bold transition hover:text-customGreen focus:text-customGreen hover:bg-black focus:bg-black">Reset Password</button>
                        }
                    </form>
                    {signingUp === false ? 
                        forgotPassword === false ?
                        <p className="mt-5 text-lg lg:w-2/3 inline-block mx-auto">Forgot your password? <button className="underline" onClick={()=>{setForgotPassword(true)}}>Click here</button> to reset your password.</p>
                        : <></>
                        :
                        <></>
                    }
                    {signingUp === false ? 
                        <p className="mt-5 text-lg lg:w-2/3 inline-block mx-auto">Don't have an account? <button className="underline" onClick={()=>{setSigningUp(true)}}>Sign up for one here</button> to save your favorite songs!</p>
                        :
                        <p className="mt-5 text-lg lg:w-2/3 inline-block mx-auto">Already have an account? <button className="underline" onClick={()=>{setSigningUp(false)}}>Click here</button> to return to the log in page.</p>
                    }
                </> :
                <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">Congratulations! You are now logged in! Head to the Generator to start generating songs!</p>
                }
            </section>
        </>
    )
}

export default LoginForm;