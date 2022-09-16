import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./login.css";
import {v4 as uuidv4, v4} from 'uuid';

const LoginPage = ({setUUID,setIsNewUser, loggedIn})=>{

    const ref = useRef();
    const [enteredUUID, setEnteredUUID] = useState(null);
    const nav = useNavigate();

    useEffect(()=>{
        if(loggedIn){
            nav('/home');
        }
    }, [loggedIn])
    
    return(
        <div className="login-page">
            <div className="bg-slate-300 rounded-md flex flex-col mt-40 mb-auto ml-auto mr-auto">
                <h2 className="text-center pt-5">Enter your UUID</h2>
                <form className="pb-5 grid pl-16 pr-16" onSubmit={(e)=>{e.preventDefault(); setUUID(enteredUUID);}}>
                    <label>
                        <input ref={ref} required autoFocus className="bg-slate-400 rounded-sm border-none" type={"text"} onChange={(e)=>setEnteredUUID(e.currentTarget.value)}/>
                    </label>
                    <button onClick={()=>ref.current.focus()} type={"submit"}>Submit</button>
                </form>
                {
                <button className="pb-5" onClick={()=>{
                    const newUUID = uuidv4();
                    // `${Math.floor(Math.random()+Math.random()+10*100*Math.random()+Math.random()+20*100*Math.random()*100)}`;
                    setUUID(newUUID); setIsNewUser(true); nav("/home")}}>New User ?</button>
                }
            </div>
        </div>
    )

}
export default LoginPage;
