import React from "react";
import '../abstractcard.css';

const Options = ({currOptions, setMarkedOptions,quesIndex, markedOptions, setCurrSelectedOption})=>{

     return (
        <div className="options">
            {currOptions.map((option, index)=>(
                <label key={index}>
                <input type={"radio"} checked={markedOptions[quesIndex]===option?true:false} onChange={(event)=>{
                    event.currentTarget.checked = true;
                    // console.log(markedOptions);
                    setCurrSelectedOption(option);
                    const newMarkedOptions = markedOptions.map((_, index)=>{
                        if(index === quesIndex) return option;
                        return markedOptions[index];
                    })
                    console.log(newMarkedOptions);
                    setMarkedOptions(newMarkedOptions);
                }}/>{option}
                </label>
            ))}
            <button className="font-semibold" onClick={()=>setMarkedOptions([...markedOptions.slice(0, quesIndex), "undefined", ...markedOptions.slice(quesIndex+1)])}>Reset</button>
        </div>
    )
}
export default Options;