const Login = (props) => {

    return (
        <>
            <button className="p-2 mt-5 md:mt-0 border-4 border-white bg-customGreen rounded-md text-lg sm:text-2xl text-black font-bold lg:absolute lg:right-14 lg:top-10 transition hover:text-customGreen focus:text-customGreen hover:bg-black focus:bg-black" onClick={()=>{props.setLoginWindow(true)}}>{props.loggedIn === false ? `Log In` : `Log Out`}</button>
            {/* <button className="p-2 mt-5 md:mt-0 border-4 border-white bg-customGreen rounded-md text-lg sm:text-2xl text-black font-bold lg:absolute lg:right-14 lg:top-10 transition hover:text-customGreen focus:text-customGreen hover:bg-black focus:bg-black" onClick={props.loggedIn === false ? ()=>{props.loginEmailPassword()} : ()=>{props.logOut()}} >{props.loggedIn === false ? `Log In` : `Log Out`}</button> */}
            {/* <button className="p-2 mt-5 md:mt-0 border-4 border-white bg-customGreen rounded-md text-lg sm:text-2xl text-black font-bold lg:absolute lg:right-14 lg:top-40 transition hover:text-customGreen focus:text-customGreen hover:bg-black focus:bg-black" onClick={()=>{props.logOut()}}>Log Out</button> */}
        </>
    )
}

export default Login;