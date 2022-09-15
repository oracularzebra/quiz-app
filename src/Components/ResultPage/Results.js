import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState, React } from "react";
import app from "../firebaseIntegration";

const Result = ({UUID, date, markedOptions})=>{

    const [correct_answers, setCorrectAnswers] = useState(null);
    const [score, setScore] = useState(0);

    console.log(date);
    useEffect(()=>{
        const db= getDatabase(app);
        const dbRef = ref(db);
        get(child(dbRef, "users/"+UUID+"/"+date+"/"+"correct_answers"))
            .then((snapshot)=>{
                if(snapshot.exists()){
                    const correctAnswers = snapshot.val();
                    setCorrectAnswers(correctAnswers);
                    for(let i=0;i<correctAnswers.length; i++){
                        if(correctAnswers[i] === markedOptions[i]) setScore(score++);
                    }
                }
            })
    }, []);
    return(
        <div>
            Your score is {score}
        </div>
    )
}
export default Result;