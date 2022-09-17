import React from "react";
import '../abstractcard.css';

const NextPrevBtn = ({currQuesIndex, setCurrQuesIndex, questionsLength, setEndTest})=>{

    return (
        <div className="next-finish-prev-btn">
            <button onClick={()=>{if(currQuesIndex !== 0)setCurrQuesIndex(currQuesIndex-1); else setCurrQuesIndex(questionsLength-1);}}>Prev</button>
            <button onClick={()=>{setEndTest(true)}}>Finish</button>
            <button onClick={()=>{if(currQuesIndex !== questionsLength-1)setCurrQuesIndex(currQuesIndex+1); else setCurrQuesIndex(0);}}>Next</button>
        </div>
    )

}
export default NextPrevBtn;