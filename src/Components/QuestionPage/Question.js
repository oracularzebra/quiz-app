const Question = ({currQuesIndex, currQuestion})=>{

    return (
        <h1 className="border-y-2 col-start-2 col-end-3 row-start-1 row-end-2 rounded-xl m-2 border-x-2 shadow-emerald-300 text-lg">{"Q"+(currQuesIndex+1)+" "+(currQuestion)}</h1>
    )

}
export default Question;