const NextPrevBtn = ({currQuesIndex, setCurrQuesIndex, questions})=>{

    return (
        <div className="flex p-3 rounded-md justify-around row-start-3 bg-slate-200 row-end-3 col-start-2 col-end-3">
            <button onClick={()=>{if(currQuesIndex !== 0)setCurrQuesIndex(currQuesIndex-1); else setCurrQuesIndex(questions.length-1);}}>Prev</button>
            <button onClick={()=>{if(currQuesIndex !== questions.length-1)setCurrQuesIndex(currQuesIndex+1); else setCurrQuesIndex(0);}}>Next</button>
        </div>
    )

}
export default NextPrevBtn;