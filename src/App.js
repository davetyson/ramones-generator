// import Header from './components/Header';
import logo from './assets/ramonesGeneratorLogo.png'
import { Route, Routes, Link } from 'react-router-dom';
import Main from './components/Main';
import Footer from './components/Footer';
import ComingSoon from './components/ComingSoon';
import Info from './components/Info';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="h-20vh pt-5">
            <h1 className="hidden">Ramones Generator</h1>
            <figure className="max-w-screen-md mx-auto">
                <img src={logo} alt="ramones generator" />
            </figure>
            <nav className="p-2 border-t-4 border-b-4">
                <ul className="menu flex mx-auto quantico lg:text-4xl text-xl">
                    <li>
                        <Link to="/" className="hover:text-customGreen focus:text-customGreen transition">Generator</Link>
                    </li>
                    <li>
                        <Link to="/mysongs" className="hover:text-customGreen focus:text-customGreen transition">My Songs</Link>
                    </li>
                    <li>
                        <Link to="/info" className="hover:text-customGreen focus:text-customGreen transition">Info</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={ <Main />} />
                <Route path="/mysongs" element={ <ComingSoon /> } />
                <Route path="/info" element={ <Info /> } />
            </Routes>
      </header>
      <Footer />
    </div>
  );
}

export default App;
