import React from "react";
import '../abstractcard.css';

const Question = ({currQuesIndex, currQuestion})=>{

    return (
        <h1 className="question">{"Q"+(currQuesIndex+1)+" "+currQuestion}</h1>
    )

}
export default Question;