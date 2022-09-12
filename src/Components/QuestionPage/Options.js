const Options = ({currOptions, setMarkedOptions,quesIndex, markedOptions})=>{
    return (
        <div className="bg-blue-300 roundebg-inheritd-xl grid m-2 col-start-2 col-end-3 row-start-2 row-end-3">
            {currOptions.map((option, index)=>(
                <label key={index}>
                <input type={"radio"} checked={markedOptions[quesIndex]===decodeURIComponent(option)?true:false} className="m-2" onChange={(event)=>{
                    event.currentTarget.checked = true;
                    const newMarkedOptions = markedOptions.map((_, index)=>{
                        if(index === quesIndex) return decodeURIComponent(option);
                        return decodeURIComponent(markedOptions[index]);
                    })
                    console.log(newMarkedOptions);
                    setMarkedOptions(newMarkedOptions);
                }}/>{decodeURIComponent(option)}
                </label>
            ))}
        </div>
    )
}
export default Options;