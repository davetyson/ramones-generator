const Generate = (props) => {

    const handleGenerate = () => {
        props.setNewSong(true);
    };

    return (
        <button className="p-2 border-4 border-black bg-customGreen rounded-md text-xl transition hover:text-customGreen focus:text-customGreen hover:bg-black focus:bg-black" onClick={handleGenerate}>Generate Lyrics</button>
    )
}

export default Generate;