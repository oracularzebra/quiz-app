const Options = ({currOptions})=>{

    return (
        <div className="bg-blue-300 rounded-xl m-2 col-start-2 col-end-3 row-start-2 row-end-3 grid justify-around items-center content-center">
            {currOptions.map((option, index)=>(
                <button className="m-2" key={index}>{decodeURIComponent(option)}</button>
            ))}
        </div>
    )
}
export default Options;