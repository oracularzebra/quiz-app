import { useEffect, useState } from "react"
import React from "react"
import getAttempts from "./getDateWiseAttempts";
import Result from "../ResultPage/Results";
import { Link } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel, { a11yProps } from "./TabPanel";

const History = ({UUID})=>{

    const [dates, setDates] = useState(null);
    const [fetcing, setFetching] = useState(true);
    const [obj, setObj] = useState(null);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue)=>{
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
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} variant="scrollable" scrollButtons="auto" onChange={handleChange} aria-label="scrollable auto tabs example">
                    {dates.map((_,index)=>{
                        return (
                        <Tab label={_}/>
                        )
                    })}
                </Tabs>
            </Box>
            {dates.map((_, index)=>{
                return(
                    <TabPanel value={value} index={index} children={<Result UUID={UUID} options={Array.from({length:obj[_].correct_answers.length}).map((__,index)=>insertAtRandom(obj[_].correct_answers[index],obj[_].incorrect_answers[index]))} category={obj[_].category} difficulty={obj[_].difficulty} questions={obj[_].questions} date={_} markedOptions={obj[_].markedOptions}></Result>}></TabPanel>
                )
            })}
        </div>
        
        
    )
}
export default History;