// going to have to use a few states and useEffects that run when they are changed
// there is going to be a state for the lyrics title
    // every time the state for song title is generated, have a useEffect that updates the header below with the new title
// there is going to be a state for the lyrics themselves
    // every time the state for lyrics is generated, have a useEffect that updates the lyrics box below with the new title

const Lyrics = () => {
    return (
        <>
            {/* Replace this with the eventual song title that generates */}
            <h2>Lyrics</h2>

            <section className="lyrics">
                {/* This is where the generated lyrics will go */}
            </section>
        </>
    )
}

export default Lyrics;