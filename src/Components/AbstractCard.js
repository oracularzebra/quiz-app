import Counter from "./Counter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPhoto from "./getPhotos";
import getQuestions from "./getQuestionsIncorrectAnswersAndCorrectAnswer";
import QuesNoHeader from "./QuestionPage/QuestionNumberHeader";
import CategoryAndDifficultyHeading from "./QuestionPage/CategoryHeading";
import Picture from "./QuestionPage/Picture";
import Question from "./QuestionPage/Question";
import Options from "./QuestionPage/Options";
import NextPrevBtn from "./QuestionPage/NextAndPrevButtons";
import Result from "./ResultPage/Results";
import titles from "./titles";
import app from "./firebaseIntegration";
import { get, getDatabase, ref, set } from "firebase/database";

const TitleCard = ()=>{

    const {category, difficultyLevel} = useParams();
    const [questions, setQuestions] = useState(null);
    const [questionsLoading, setQuestionsLoading] = useState(true);
    const [currQuesIndex, setCurrQuesIndex] = useState(0);
    const [picture, setPicture] = useState(null);
    const [pictureLoading, setPictureLoading] = useState(true);
    const [timeUp, setTimeUp] = useState(false);
    const [markedOptions, setMarkedOptions] = useState(null);
    const [score, setScore] = useState(0);
    const [options, setOptions] = useState(null);
    const [currCategory, setCurrCategory] = useState(null);
    const [uuid, setuuid] = useState(null);

    useEffect(()=>{
        const getQues = async()=>{
            getQuestions(category, difficultyLevel)
                .then(({questions, incorrect_answers, correct_answers}) =>{
                    const uuid = crypto.randomUUID();
                    setuuid(uuid);
                    writeUserData(getDatabase(app), uuid, correct_answers);
                    setQuestions(questions);
                    setPictures(questions);
                    setOptions(Array.from({length:correct_answers.length}).map((_,index)=>insertAtRandom(correct_answers[index],incorrect_answers[index])));
                    setQuestionsLoading(false);
                    setMarkedOptions(Array.from({length:10}));
                });
        }
        findCategory();
        setQuestionsLoading(true);
        setPictureLoading(true);
        getQues();
    }, []);

    function writeUserData(db,userId, correct_answers) {
        set(ref(db, 'users/' + userId), {
            correct_answers:correct_answers
        });
    }
    function readUserData(db, userId){
    }
    function setPictures(questions){
        Promise.all((Array.from({length:questions.length}).map((_, index)=>{
            let pictures = getPhoto(decodeURIComponent(questions[index])); 
            return pictures;
        }))).then((pictures)=>{console.log(pictures); setPictureLoading(false); setPicture(pictures)});
    }
    function insertAtRandom(data, arr=[]){
        let length = arr.length;
        let randomLocation = Math.floor(Math.random()*length);
        return [...arr.slice(0, randomLocation), data, ...arr.slice(randomLocation)];
    }
    function findCategory(){
        
        for(let i=0;i<titles.length; i++){
            if(titles[i].category === undefined){
                console.log("when title don't have a category");
                for(let j=0;j<titles[i].subItems.length; j++){
                    if(titles[i].subItems[j].category.toString() === category){ console.log(titles[i].itemName);setCurrCategory(titles[i].subItems[j].itemName); return;}
                }
            }
            else if(titles[i].category.toString() === category) {console.log(titles[i].category); setCurrCategory(titles[i].itemName); return;}
        }
    }
    return (
        <div className="bg-white sm:h-full">
            {!questionsLoading && !timeUp && 
                <div className="md:ml-20 md:mr-20">
                    <CategoryAndDifficultyHeading category={currCategory} difficulty={difficultyLevel}></CategoryAndDifficultyHeading>
                    <hr></hr>
                    <Counter setEnd={setTimeUp} testTime={{min:10, sec:0}}></Counter>
                    <QuesNoHeader questions={questions} setCurrQuesIndex={setCurrQuesIndex} currQuesIndex={currQuesIndex}></QuesNoHeader>
                    <hr></hr>
                    <div className="md:grid md:grid-cols-2 md:grid-rows-3 md:justify-center md:items-start">
                        <Picture pictures={picture} pictureLoading={pictureLoading} currQuesIndex={currQuesIndex}></Picture>
                        <Question currQuesIndex={currQuesIndex} currQuestion={questions[currQuesIndex]}></Question>
                        <Options currOptions={options[currQuesIndex]} markedOptions={markedOptions} quesIndex={currQuesIndex} setMarkedOptions={setMarkedOptions}></Options>
                        <NextPrevBtn questionsLength={questions.length} currQuesIndex={currQuesIndex} setEndTest={setTimeUp} setCurrQuesIndex={setCurrQuesIndex}></NextPrevBtn>
                    </div>
                </div>
            }
            {
                timeUp && 
                <Result score={score} ></Result>
            }
        </div>
    )
}
export default TitleCard;