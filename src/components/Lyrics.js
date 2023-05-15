// going to have to use a few states and useEffects that run when they are changed
// there is going to be a state for the lyrics title
    // every time the state for song title is generated, have a useEffect that updates the header below with the new title
// there is going to be a state for the lyrics themselves
    // every time the state for lyrics is generated, have a useEffect that updates the lyrics box below with the new title

const Lyrics = (props) => {

    return (
        <>
        {props.songTitle ? 
        <section className="w-full">
            <h3 className="quantico mb-5 mx-auto p-2 text-2xl rounded-md bg-black text-white w-fit">{props.songTitle}</h3>
            <section className="lyrics">
                {props.lyrics.map((line, index) => {
                    return (
                        <p className="text-xl my-2 quantico" key={index}>{line}</p>
                    )
                })}
            </section>
        </section>
        : <h3 className="quantico w-2/3 inline-block m-auto text-2xl content-center">Your new song will appear here! Fill out the generator to get started.</h3>
        }
        </>
    )
}

export default Lyrics;