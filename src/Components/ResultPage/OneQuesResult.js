import React from "react";
import '../abstractcard.css';

const OneQuesResult = ({quesIndex, question, correct_answer, options, markedOption})=>{

    console.log(options);
    return (
        <div className="OneQuesResult">
            <h2>{"Q"+quesIndex+" "+question}</h2>
            <div>
            {
                options.map((option, index)=>{
                    return (
                        <div style={{
                            backgroundColor:option === correct_answer? "lightgreen":markedOption === option? "red": "inherit"
                        }} key={index}>{option}</div>
                    )
                })
            }
            </div>
            
        </div>
    )

}
export default OneQuesResult;