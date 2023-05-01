const Like = (props) => {
    return (
        <>
            <p>Do you like it?</p>
            <input type="radio" name="choice-radio" onClick={()=>{props.handleLike(true)}} />
            <label className="sr-only" htmlFor="activity">Yes</label>
            <input type="radio" name="choice-radio" onClick={()=>{props.handleLike(false)}} />
            <label className="sr-only" htmlFor="activity">No</label>
        </>
    )
}

export default Like;