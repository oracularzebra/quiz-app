import Counter from "./Counter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPhoto from "./getPhotos";
import getQuestions from "./getQuestions";

const TitleCard = ()=>{

    const {category, difficultyLevel} = useParams();
    console.log(category, difficultyLevel);
    const [questions, setQuestions] = useState(null);
    const [questionsLoading, setQuestionsLoading] = useState(true);
    const [currQuestion, setCurrQuestion] = useState(null);
    const [currOptions, setCurrOptions] = useState(null);
    // const [oneOfTheOptionsSelected, setOneOfTheOptionsSelected] = useState(false);
    const [currQuesIndex, setCurrQuesIndex] = useState(0);
    const [picture, setPicture] = useState(null);
    const [pictureLoading, setPictureLoading] = useState(true);

    useEffect(()=>{
        const getQues = async()=>{
            getQuestions(category, difficultyLevel)
                .then((questions)=>questions.results)
                    .then((quesArr) =>{
                        setQuestions(quesArr);
                        console.log(quesArr);
                        setCurrQuestion(quesArr[currQuesIndex]); 
                        Promise.all((Array.from({length:quesArr.length}).map((_, index)=>{
                            let pictures = getPhoto(decodeURI(quesArr[index].question)); 
                            return pictures;
                        }))).then((pictures)=>{console.log(pictures); setPictureLoading(false); setPicture(pictures)});
                        setCurrOptions([...quesArr[currQuesIndex].incorrect_answers, quesArr[currQuesIndex].correct_answer]); 
                        setQuestionsLoading(false)
                    }
                )
        }
        setQuestionsLoading(true);
        setPictureLoading(true);
        getQues();
    }, []);

    function insertAtRandom(data, arr=[]){
        let length = arr.length;
        let randomLocation = Math.floor(Math.random()*length);
        return [...arr.slice(0, randomLocation), data, ...arr.slice(randomLocation)];
    }
    useEffect(()=>{
        if(questions != null){
            setCurrQuestion(questions[currQuesIndex]);
            setCurrOptions(insertAtRandom(questions[currQuesIndex].correct_answer, questions[currQuesIndex].incorrect_answers));
        }
    }, [currQuesIndex]);

    return (
        <div className="bg-white h-screen">
            {/* {questions.map((question)=>(
                <div>{question.question}</div>
            ))} */}
            {!questionsLoading && 
                //This will have category on the top
                <div className="md:ml-20 md:mr-20">
                    {/* We will show the category */}
                    <h2 className="md:font-medium text-center md:text-2xl mt-3">{decodeURIComponent(currQuestion.category)+": "+decodeURIComponent(currQuestion.difficulty.toUpperCase())}</h2>
                    <hr></hr>
                    <div className="grid justify-center font-semibold">
                        <Counter testTime={{min:10, sec:59}}></Counter>
                    </div>
                    <div className="flex justify-around">
                            {questions.map((_, index)=>{
                                return (
                                    <button key={index} onClick={()=>setCurrQuesIndex(index)} className={index === currQuesIndex?"bg-slate-500 w-15 md:w-10 md:h-10 text-white rounded-3xl p-2":"bg-slate-200 md:w-10 md:h-10 p-2 rounded-3xl"}>{index}</button>
                                )
                            })}
                    </div>
                    <hr></hr>
                    {/* Here we will show the circles with the questions number */}
                    {/* Here we will have the picture on the left side
                    the quesion on the top right and options below it */}
                    <div className="md:grid md:grid-cols-2 md:grid-rows-3 md:justify-center md:items-start">
                        {/* Here we will have the question card */}
                        {pictureLoading && <div className="rounded-lg col-start-1 col-end-2 row-start-1 row-end-3"></div>}
                        {!pictureLoading && <img alt="Something went wrong" className="rounded-lg col-start-1 m-auto w-52 h-52 md:w-96 md:h-96 bg-contain mt-3 mb-3 shadow-md border-x-4 border-y-2 col-end-2 row-start-1 row-end-4" src={picture[currQuesIndex].photos[0].src.medium}></img>}
                        <h1 className="border-y-2 row-start-1 row-end-1 rounded-xl m-2 border-x-2 shadow-emerald-300 text-lg">{"Q"+(currQuesIndex+1)+" "+decodeURIComponent(currQuestion.question).replace("%3F", ".")}</h1>
                        <div className="bg-blue-300 rounded-xl m-2 row-start-2 row-end-3 grid justify-around items-center content-center">
                            {currOptions.map((option, index)=>(
                                <button className="m-2" key={index}>{decodeURIComponent(option)}</button>
                            ))}
                        </div>
                        <div className="flex p-3 rounded-md justify-around row-start-3 bg-slate-200 row-end-3 col-start-2 col-end-3">
                            <button onClick={()=>{if(currQuesIndex !== 0)setCurrQuesIndex(currQuesIndex-1); else setCurrQuesIndex(questions.length-1);}}>Prev</button>
                            <button onClick={()=>{if(currQuesIndex !== questions.length-1)setCurrQuesIndex(currQuesIndex+1); else setCurrQuesIndex(0);}}>Next</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default TitleCard;
