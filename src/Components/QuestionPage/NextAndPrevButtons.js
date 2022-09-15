import React from "react";
const NextPrevBtn = ({currQuesIndex, setCurrQuesIndex, questionsLength, setEndTest})=>{

    return (
        <div className="flex p-3 rounded-md justify-around row-start-3 bg-slate-200 row-end-3 col-start-2 col-end-3">
            <button className="w-full" onClick={()=>{if(currQuesIndex !== 0)setCurrQuesIndex(currQuesIndex-1); else setCurrQuesIndex(questionsLength-1);}}>Prev</button>
            <button className="w-full font-semibold" onClick={()=>{setEndTest(true)}}>Finish</button>
            <button className="w-full" onClick={()=>{if(currQuesIndex !== questionsLength-1)setCurrQuesIndex(currQuesIndex+1); else setCurrQuesIndex(0);}}>Next</button>
        </div>
    )

}
export default NextPrevBtn;