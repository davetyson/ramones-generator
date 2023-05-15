import logo from "../assets/ramonesGeneratorLogo.png";

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
                        <button className="hover:text-customGreen focus:text-customGreen transition">Home</button>
                    </li>
                    <li>
                        <button className="hover:text-customGreen focus:text-customGreen transition">My Songs</button>
                    </li>
                    <li>
                        <button className="hover:text-customGreen focus:text-customGreen transition">Info</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;