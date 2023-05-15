const Info = () => {
    return (
        <section className="p-10">
            <h2 className="uppercase quantico mb-5 w-full text-4xl font-bold text-customGreen">Info</h2>
            <h3 className="mb-5 text-2xl quantico underline">Disclaimer</h3>
            <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">This website is purely for entertainment value and not intended for monetary gain. I am not affiliated with the Ramones in any way, I'm just a dev that loves the Ramones!</p>
            <p className="sr-only">The following links will open in a new tab.</p>
            <p className="mb-5 text-lg lg:w-2/3 inline-block mx-auto">Built by Dave Tyson. To see more of my work, <a className="transition hover:text-customGreen focus:text-customGreen underline" href="https://davetyson.tech" target="_blank" rel="noreferrer">check out my development profile here</a>, or <a className="transition hover:text-customGreen focus:text-customGreen underline" href="https://linktr.ee/davetyson" target="_blank" rel="noreferrer">check out the bands I play in here</a>.</p>
        </section>
    )
}

export default Info;