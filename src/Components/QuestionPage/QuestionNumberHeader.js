import React from "react";

const QuesNoHeader = ({questions, setCurrQuesIndex, currQuesIndex})=>{

    return (
        <div className="flex justify-around">
            {questions.map((_, index)=>{
                return (
                    <button key={index} onClick={()=>setCurrQuesIndex(index)} className={index === currQuesIndex?"bg-slate-500 w-15 md:w-10 md:h-10 text-white rounded-3xl p-2":"bg-slate-200 md:w-10 md:h-10 p-2 rounded-3xl"}>{index}</button>
                )
            })}
        </div>
    )


}
export default QuesNoHeader;