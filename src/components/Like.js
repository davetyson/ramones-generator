const Like = (props) => {
    return (
        <section className="mb-8">
            <h3 className="mb-5 text-xl quantico underline">Question 2</h3>
            <p className="mb-5 text-lg">Do you like it?</p>
            <div className="lg:w-1/2 mx-auto mb-5 flex radio">
                <div>
                    <input className="scale-150" type="radio" name="choice-radio" onClick={()=>{props.handleLike(true)}} />
                    <label className="mx-2 text-lg" htmlFor="activity">Yes</label>
                </div>
                <div className="ml-2">
                    <input className="scale-150" type="radio" name="choice-radio" onClick={()=>{props.handleLike(false)}} />
                    <label className="ml-2 text-lg" htmlFor="activity">No</label>
                </div>
            </div>
        </section>
    )
}

export default Like;