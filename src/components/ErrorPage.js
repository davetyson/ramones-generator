import { NavLink } from "react-router-dom";

const ErrorPage = () => {
    return (
        <section className="p-10">
            <h2 className="uppercase quantico mb-5 w-full text-4xl font-bold text-customGreen">There has been an error</h2>
            <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">The page you are looking for might not exist.</p>
            <p className="text-lg lg:w-2/3 inline-block mx-auto">Hey! Ho! Let's <NavLink to="/" className="underline">go back to the home page</NavLink>.</p>
        </section>
    );
};

export default ErrorPage;