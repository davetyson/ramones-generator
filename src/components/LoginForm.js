// import { useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import Login from "./Login";

const LoginForm = (props) => {

    const handleEmailChange = (e) => {
        props.setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        props.setPassword(e.target.value);
    }

    return (
        <>
            <section>
                <h2 className="mb-10 mt-10 uppercase quantico w-full text-4xl font-bold text-customGreen">Log In</h2>
                <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">Log in to your account to save new songs and view your saved favorites!</p>
                <div>
                    <form action="">
                        <fieldset className="flex flex-col items-center">
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input className="text-white text-center lg:text-2xl text-l border-4 border-white mb-5 p-1 quantico rounded-md bg-black w-1/2" id="email" type="email" placeholder="Email" onChange={handleEmailChange} value={props.email} />
                            <label className="sr-only" htmlFor="password">Password</label>
                            <input className="text-white text-center lg:text-2xl text-l border-4 border-white mb-5 p-1 quantico rounded-md bg-black w-1/2" id="password" type="password" placeholder="Password" onChange={handlePasswordChange} value={props.password} />
                        </fieldset>
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default LoginForm;

// import { useEffect } from "react";

// const Input = (props) => {

//     const handleChange = (e) => {
//         props.setActivity(e.target.value);
//     }

//     useEffect(() => {

//     }, [props.activity])

//     return (
//         <>
//             <div className="flex flex-col">
//                 <h3 className="mb-5 text-xl quantico underline">Question 1</h3>
//                 <p className="mb-1 text-lg">What are you doing in the song?</p>
//                 <label className="mb-5 text-sm" htmlFor="activity">Enter any activity (i.e. going to the basement, being sedated, going to rockaway beach, etc).</label>
//                 <input className="text-white text-center lg:text-2xl text-l border-4 border-black mb-5 p-1 quantico rounded-md bg-black" id="activity" type="text" name="activity" placeholder="Enter your activity here" onChange={handleChange} value={props.activity}/>
//             </div>
//         </>
//     )
// }

// export default Input;