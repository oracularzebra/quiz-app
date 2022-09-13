const Options = ({currOptions, setMarkedOptions,quesIndex, markedOptions})=>{

    return (
        <div className="flex flex-col m-2 col-start-2 col-end-3 row-start-2 row-end-3">
            {currOptions.map((option, index)=>(
                <label className="rounded-md m-2 bg-slate-200" key={index}>
                <input type={"radio"} checked={markedOptions[quesIndex]===option?true:false} className="m-2 scale-110" onChange={(event)=>{
                    event.currentTarget.checked = true;
                    const newMarkedOptions = markedOptions.map((_, index)=>{
                        if(index === quesIndex) return option;
                        return markedOptions[index];
                    })
                    setMarkedOptions(newMarkedOptions);
                }}/>{option}
                </label>
            ))}
            <button className="font-semibold" onClick={()=>setMarkedOptions([...markedOptions.slice(0, quesIndex), "undefined", ...markedOptions.slice(quesIndex+1)])}>Reset</button>
        </div>
    )
}
export default Options;