import { useState, useEffect } from "react";
const Counter=({testTime, setEnd})=>{

    const [counter, setCounter] = useState(testTime);

    function tick(){

        if(counter.min === 0 && counter.sec === 0){
            //show the result
            setEnd(true);
        }
        else if(counter.sec == 0){
            setCounter({min:counter.min-1, sec:59});
        }
        else{
            setCounter({min:counter.min, sec:counter.sec-1});
        }
    }
    useEffect(()=>{
        setTimeout(()=>{
            tick();
        }, 1000);
    });

    return (
        <div>
            {counter.min+":"+ counter.sec}
        </div>
    )
}
export default Counter;