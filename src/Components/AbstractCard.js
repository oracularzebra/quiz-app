import Counter from "./Counter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPhoto from "./getPhotos";
import getQuestions from "./getQuestions";
import QuesNoHeader from "./QuestionPage/QuestionNumberHeader";
import CategoryAndDifficultyHeading from "./QuestionPage/CategoryHeading";
import Picture from "./QuestionPage/Picture";
import Question from "./QuestionPage/Question";
import Options from "./QuestionPage/Options";
import NextPrevBtn from "./QuestionPage/NextAndPrevButtons";
import Result from "./ResultPage/Results";

const TitleCard = ()=>{

    const {category, difficultyLevel} = useParams();
    const [questions, setQuestions] = useState(null);
    const [questionsLoading, setQuestionsLoading] = useState(true);
    const [currQuestion, setCurrQuestion] = useState(null);
    const [currOptions, setCurrOptions] = useState(null);
    // const [oneOfTheOptionsSelected, setOneOfTheOptionsSelected] = useState(false);
    const [currQuesIndex, setCurrQuesIndex] = useState(0);
    const [picture, setPicture] = useState(null);
    const [pictureLoading, setPictureLoading] = useState(true);
    const [timeUp, setTimeUp] = useState(false);

    useEffect(()=>{
        const getQues = async()=>{
            getQuestions(category, difficultyLevel)
                .then((questions)=>questions.results)
                    .then((quesArr) =>{
                        setQuestions(quesArr);
                        setCurrQuestion(quesArr[currQuesIndex]); 
                        Promise.all((Array.from({length:quesArr.length}).map((_, index)=>{
                            let pictures = getPhoto(decodeURIComponent(quesArr[index].question)); 
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
        <div className="bg-white sm:h-full">
            {!questionsLoading && !timeUp && 
                //This will have category on the top
                <div className="md:ml-20 md:mr-20">
                    {/* We will show the category */}
                    <CategoryAndDifficultyHeading category={currQuestion.category} difficulty={difficultyLevel}></CategoryAndDifficultyHeading>
                    <hr></hr>
                    <Counter setEnd={setTimeUp} testTime={{min:10, sec:0}}></Counter>
                    {/* Here we will show the circles with the questions number */}
                    <QuesNoHeader questions={questions} setCurrQuesIndex={setCurrQuesIndex} currQuesIndex={currQuesIndex}></QuesNoHeader>
                    <hr></hr>
                    {/* Here we will have the picture on the left side
                    the quesion on the top right and options below it */}
                    <div className="md:grid md:grid-cols-2 md:grid-rows-3 md:justify-center md:items-start">
                        {/* Here we will have the question card */}
                        <Picture pictures={picture} pictureLoading={pictureLoading} currQuesIndex={currQuesIndex}></Picture>
                        <Question currQuesIndex={currQuesIndex} currQuestion={currQuestion}></Question>
                        <Options currOptions={currOptions}></Options>
                        <NextPrevBtn currQuesIndex={currQuesIndex} questions={questions} setCurrQuesIndex={setCurrQuesIndex}></NextPrevBtn>
                    </div>
                </div>
            }
            {/* Here its time's up */}
            {
                timeUp && 
                <Result></Result>
            }
        </div>
    )
}
export default TitleCard;
