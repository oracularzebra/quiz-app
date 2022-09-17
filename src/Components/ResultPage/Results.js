import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import React from "react";
import app from "../firebaseIntegration";
import '../abstractcard.css';
import OneQuesResult from "./OneQuesResult";

const Result = ({UUID, date, options,markedOptions, questions})=>{

    const [correct_answers, setCorrectAnswers] = useState(null);

    const [score, setScore] = useState(0);

    useEffect(()=>{
        const db= getDatabase(app);
        const dbRef = ref(db);
        get(child(dbRef, "users/"+UUID+"/"+date+"/"+"correct_answers"))
            .then((snapshot)=>{
                if(snapshot.exists()){
                    const correctAnswers = snapshot.val();
                    setCorrectAnswers(correctAnswers);
                    let score = 0;
                    for(let i=0;i<correctAnswers.length; i++){
                        if(correctAnswers[i] === markedOptions[i]) {
                            score++;
                        }
                    }
                    setScore(score);
                }
            })
    }, []);
    return(
        <div className="result-page">
            <h3>Your Score is:{score+"/"+10}</h3>
            <div>
                {Array.from({length:questions.length}).map((_, index)=>{
                    return (
                        correct_answers !== null &&
                        <OneQuesResult key={index}
                            quesIndex={index} 
                            question={questions[index]} 
                            correct_answer={correct_answers[index]} 
                            options={options[index]}
                            markedOption={markedOptions[index]}
                        ></OneQuesResult>
                    )
                })}
            </div>
            
        </div>
    )
}
export default Result;