import logo from './assets/ramonesGeneratorLogo.png'
import { Route, Routes, Link } from 'react-router-dom';
import Main from './components/Main';
import Footer from './components/Footer';
import ComingSoon from './components/ComingSoon';
import Info from './components/Info';
// import Login from './components/Login';

import './App.css';

// import { initializeApp } from "firebase/app";
// import { getAuth, connectAuthEmulator } from "firebase/auth";
// // signInWithEmailAndPassword, createUserWithEmailAndPassword

// const firebaseConfig = {
//   apiKey: "AIzaSyCggW88fy90jEAac9ygi33b-XL4gZsAtIk",
//   authDomain: "ramones-generator.firebaseapp.com",
//   projectId: "ramones-generator",
//   storageBucket: "ramones-generator.appspot.com",
//   messagingSenderId: "295603373754",
//   appId: "1:295603373754:web:e9f185081077c9b863e483"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");

// const loginEmailPassword = async () => {
//     setLoginWindow(true);
//     const loginEmail = "test@test.com";
//     const loginPassword = "123456";

//     const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
//     console.log(userCredential.user);
// }

function App() {
  return (
    <div className="App">
      <header className="h-20vh pt-5">
        <div className="relative max-w-7xl mx-auto">
            <h1 className="sr-only">Ramones Generator</h1>
            <figure className="max-w-screen-md mx-auto -mb-10">
                <img className="p-5" src={logo} alt="ramones generator" />
            </figure>
            {/* <Login /> */}
        </div>
        <nav className="p-2 mt-5 border-t-4 border-b-4">
            <ul className="menu flex max-w-7xl mx-auto quantico lg:text-4xl text-xl">
                <li className="w-1/3 max-w-xs">
                    <Link to="/" className="hover:text-customGreen focus:text-customGreen transition text-center">Generator</Link>
                </li>
                <li className="w-1/3 max-w-xs">
                    <Link to="/mysongs" className="hover:text-customGreen focus:text-customGreen transition text-center">My Songs</Link>
                </li>
                <li className="w-1/3 max-w-xs">
                    <Link to="/info" className="hover:text-customGreen focus:text-customGreen transition text-center">Information</Link>
                </li>
            </ul>
        </nav>
      </header>
      <Routes>
          <Route path="/" element={ <Main />} />
          <Route path="/mysongs" element={ <ComingSoon /> } />
          <Route path="/info" element={ <Info /> } />
      </Routes>
      {/* {loginWindow === true ?
        <Login loginWindow={loginWindow} /> : <div className="hidden"></div>} */}
      <Footer />
    </div>
  );
}

export default App;
