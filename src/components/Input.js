// Will be creating an input field
// Make sure it is screen reader friendly
// Using the input state trick to log what they enter and then display it back in the input field
// take what is logged and use it when the generate button is clicked later

import { useEffect } from "react";

const Input = (props) => {

    const handleChange = (e) => {
        props.setActivity(e.target.value);
    }

    useEffect(() => {

    }, [props.activity])

    return (
        <>
            <div className="flexbox">
                <label htmlFor="activity">What are you doing in the song?</label>
                <input id="activity" type="text" name="activity" placeholder="Enter your activity here" onChange={handleChange} value={props.activity}/>
            </div>
        </>
    )
}

export default Input;