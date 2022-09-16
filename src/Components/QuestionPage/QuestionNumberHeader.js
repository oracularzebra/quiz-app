import React from "react";
import '../abstractcard.css';

const QuesNoHeader = ({questions, setCurrQuesIndex, currQuesIndex})=>{

    return (
        <div className="question-no-header">
            {questions.map((_, index)=>{
                return (
                    <button style={
                        {
                            backgroundColor:index === currQuesIndex?'lightgreen':'grey'
                        }
                    } key={index} onClick={(e)=>{
                        setCurrQuesIndex(index);
                    }} className="question-no-header">{index}</button>
                )
            })}
        </div>
    )


}
export default QuesNoHeader;