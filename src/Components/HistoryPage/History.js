import { useEffect, useState } from "react"
import React from "react"
import getAttempts from "./getDateWiseAttempts";
import Result from "../ResultPage/Results";
import { Link } from "react-router-dom";

const History = ({UUID})=>{

    const [dates, setDates] = useState(null);
    const [fetcing, setFetching] = useState(true);
    const [obj, setObj] = useState(null);
    const [value, setValue] = useState(0);

    const handleChange = (evet, newValue)=>{
        setValue(newValue);
    }
    useEffect(()=>{
        setFetching(true);
        getAttempts(UUID)
        .then((obj)=>{
            //Here we are setting the dates
            const dates = Object.keys(obj).slice(0, Object.keys(obj).length-1);
            setObj(obj);
            console.log(obj);
            console.log(dates);
            setDates(dates); 
            setFetching(false);
        });
    }, []);

    function insertAtRandom(data, arr=[]){
        let length = arr.length;
        let randomLocation = Math.floor(Math.random()*length);
        return [...arr.slice(0, randomLocation), data, ...arr.slice(randomLocation)];
    }

    return (
        !fetcing &&
        <div className="history"
            role={"tabpanel"}
        >
            {dates.map((_, index)=>{
                return(
                    <div key={index}
                        hidden={index !== 1}
                    >
                        <input name="tabs" type={"radio"} id={`tab${index}`}/>
                        <label>{JSON.stringify(_)}</label>
                        <div>
                            <Result UUID={UUID} options={Array.from({length:obj[_].correct_answers.length}).map((__,index)=>insertAtRandom(obj[_].correct_answers[index],obj[_].incorrect_answers[index]))} category={obj[_].category} difficulty={obj[_].difficulty} questions={obj[_].questions} date={_} markedOptions={obj[_].markedOptions}></Result>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}
export default History;