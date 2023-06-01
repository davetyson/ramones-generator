import { NavLink } from 'react-router-dom';
import logo from '../assets/ramonesGeneratorLogo.png'
import NavBar from './NavBar';

const Header = () => {

return (
    <>
       <header className="h-20vh pt-5">
            <div className="relative max-w-7xl mx-auto">
                <h1 className="sr-only">Ramones Generator</h1>
                <NavLink to="/">
                <figure className="max-w-screen-md mx-auto -mb-10">
                    <img className="p-5" src={logo} alt="ramones generator" />
                </figure>
                </NavLink>
            </div>
            <NavBar />
        </header> 
    </>
)
};

export default Header;