const Like = () => {
    return (
        <>
            <p>Do you like it?</p>
            <input type="radio" name="choice-radio" />
            <label className="sr-only" htmlFor="activity">Yes</label>
            <input type="radio" name="choice-radio" />
            <label className="sr-only" htmlFor="activity">No</label>
        </>
    )
}

export default Like;