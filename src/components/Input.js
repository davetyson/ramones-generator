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
            <div className="flex flex-col">
                <h3 className="mb-5 text-xl quantico underline">Question 1</h3>
                <p className="mb-1 text-lg">What are you doing in the song?</p>
                <label className="mb-5 text-sm" htmlFor="activity">Enter any activity (i.e. going to the basement, being sedated, going to rockaway beach, etc).</label>
                <input className="text-white text-center text-2xl border-4 border-black mb-5 p-1 quantico rounded-md bg-black" id="activity" type="text" name="activity" placeholder="Enter your activity here" onChange={handleChange} value={props.activity}/>
            </div>
        </>
    )
}

export default Input;