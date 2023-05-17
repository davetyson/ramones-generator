// import { useState } from 'react';

// const Login = (props) => {

//     const { loginWindow , setLoginWindow } = useState(false);

    // const setLoginState = () => {
    //     if (loginWindow === true) {
    //         setLoginWindow(false);
    //     } else {
    //         setLoginWindow(true);
    //     }
    // };

//     return (
//         <>
//             {loginWindow === true ?
//                 <div className="w-56 h-56 bg-white rounded-lg shadow-md">
//                     <button onClick={setLoginState}>Close Window</button>
//                 </div>
//             : <button className="p-2 mt-5 md:mt-0 border-4 border-white bg-customGreen rounded-md text-lg sm:text-2xl text-black font-bold lg:absolute lg:right-14 lg:top-10 transition hover:text-customGreen focus:text-customGreen hover:bg-black focus:bg-black" onClick={setLoginState}>Log In</button>}
//         </>
//     )
// }

// export default Login;