import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getQuestions from "./getQuestions";

const TitleCard = ()=>{

    const {category, difficultyLevel} = useParams();
    console.log(category, difficultyLevel);
    const [questions, setQuestions] = useState(null);
    useEffect(()=>{
        const getQues = async()=>{
            const ques = await getQuestions(category, difficultyLevel);
            console.log(ques);
            setQuestions(ques);
        }
        getQues();
    }, [category, difficultyLevel]);

    return (
        <div>
            <h1 className="text-xl">{category+ difficultyLevel}</h1>
        </div>
    )
}
export default TitleCard;