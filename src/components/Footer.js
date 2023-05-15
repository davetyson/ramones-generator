// Import React hooks
import { useState, useEffect } from "react";

// Build component
const Footer = () => {

    // Declare state variables
    const [currentYear, setCurrentYear] = useState();

    // useEffect to check for the current year on page load and generate that
    useEffect( () => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        // Footer generated with the current year from the useEffect above
        <footer className="border-t-4">
            <p className="sr-only">The following link will open in a new tab.</p>
            <a className="inline-block mb-5 mt-5 transition hover:text-customGreen focus:text-customGreen" href="https://davetyson.tech" target="_blank" rel="noreferrer"><p className="text-2xl quantico">© Dave Tyson {currentYear}.</p></a>
        </footer>
    )
}

export default Footer;