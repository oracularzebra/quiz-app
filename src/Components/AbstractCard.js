import Counter from "./Counter";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getDatabase, update, ref } from "firebase/database";
import app from "./firebaseIntegration";

const TitleCard = ({UUID})=>{

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
    const [date, setDate] = useState(new Date());
    const database = getDatabase(app);
    const [currSelectedOption, setCurrSelectedOption] = useState(null);

    const nav = useNavigate();
    useEffect(()=>{
        if(UUID == null){
            nav('/');
        }
        const getQues = async()=>{
            getQuestions(category, difficultyLevel)
                .then(({questions, incorrect_answers, correct_answers}) =>{
                    // writeUserData(getDatabase(app), uuid, correct_answers);
                    updateToFireStore(questions, incorrect_answers, correct_answers, Array.from({length:questions.length}).map(()=>"undefined"));
                    setQuestions(questions);
                    setPictures(questions);
                    setOptions(Array.from({length:correct_answers.length}).map((_,index)=>insertAtRandom(correct_answers[index],incorrect_answers[index])));
                    setQuestionsLoading(false);
                    setMarkedOptions(Array.from({length:questions.length}).map(item=>"undefined"));
                });
            }
        setQuestionsLoading(true);
        setPictureLoading(true);
        getQues();
    }, []);
    useEffect(()=>{
        
        function addMarkedOptionsToRealTimeDatabase(){
            const dbRef = ref(database, "users/"+UUID+"/"+date+"/");
            update(dbRef,
                {
                    markedOptions:markedOptions.map((_, index)=>{
                        if(index === currQuesIndex){
                            return currSelectedOption;
                        }
                        return _;
                    })
                }
            )
        }
        if(markedOptions !== null && currSelectedOption != null){
            console.log("markedOptions not equal to null")
            addMarkedOptionsToRealTimeDatabase();
        }
    }, [markedOptions]);

    function updateToFireStore(questions, incorrect_answers, correct_answers, markedOptions){
        const dbRef = ref(database, "users/"+UUID+"/"+date);
        update(dbRef,
            {
                questions:questions,
                correct_answers:correct_answers,
                incorrect_answers:incorrect_answers,
                category:findCategory(),
                difficulty:difficultyLevel,
                markedOptions:markedOptions.map(option=>option===undefined?"undefined":option)
            }
            );
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
                    if(titles[i].subItems[j].category.toString() === category){ setCurrCategory(titles[i].subItems[j].itemName); return titles[i].subItems[j].itemName;}
                }
            }
            else if(titles[i].category.toString() === category) { setCurrCategory(titles[i].itemName); return titles[i].itemName;}
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
                        <Options setCurrSelectedOption={setCurrSelectedOption} currOptions={options[currQuesIndex]} markedOptions={markedOptions} quesIndex={currQuesIndex} setMarkedOptions={setMarkedOptions}></Options>
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