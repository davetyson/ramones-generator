import { NavLink } from 'react-router-dom';

const NavBar = (props) => {

    return (
        <nav className="p-2 mt-5 border-t-4 border-b-4">
            <ul className="menu flex max-w-7xl mx-auto quantico lg:text-4xl text-xl">
                <li className="w-1/3 max-w-xs">
                    <NavLink to="/" className="hover:text-customGreen focus:text-customGreen transition text-center">Generator</NavLink>
                </li>
                <li className="w-1/3 max-w-xs">
                    <NavLink to="/mysongs" className="hover:text-customGreen focus:text-customGreen transition text-center">My Songs</NavLink>
                </li>
                <li className="w-1/3 max-w-xs">
                    <NavLink to="/info" className="hover:text-customGreen focus:text-customGreen transition text-center">Information</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;