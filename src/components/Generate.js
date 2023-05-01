const Generate = (props) => {

    const handleGenerate = () => {
        props.setNewSong(true);
    };

    return (
        <button onClick={handleGenerate}>Generate Lyrics</button>
    )
}

export default Generate;