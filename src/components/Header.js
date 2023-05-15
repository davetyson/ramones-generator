import logo from "../assets/ramonesGeneratorLogo.png";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./Main";
import ComingSoon from "./ComingSoon";
import Disclaimer from "./Info";

const Header = () => {
    return (
        <header className="h-20vh pt-5">
            <h1 className="hidden">Ramones Generator</h1>
            <figure className="max-w-screen-md mx-auto">
                <img src={logo} alt="ramones generator" />
            </figure>
            <nav className="p-2 border-t-4 border-b-4">
                <ul className="menu flex mx-auto quantico text-4xl">
                    <li>
                        <Link to="/" className="hover:text-customGreen focus:text-customGreen transition">Home</Link>
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
                <Route path="/info" element={ <Disclaimer /> } />
            </Routes>
        </header>
    )
}

export default Header;