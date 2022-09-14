import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="grid bg-blue-100 h-screen w-screen">
            <div className="bg-slate-300 rounded-md flex flex-col mt-40 mb-auto ml-auto mr-auto">
                <h2 className="text-center pt-5">Enter your UUID</h2>
                <form className="pb-5 grid pl-16 pr-16" onSubmit={(e)=>{e.preventDefault(); setUUID(enteredUUID);}}>
                    <label>
                        <input ref={ref} required autoFocus className="bg-slate-400 rounded-sm border-none" type={"text"} onChange={(e)=>setEnteredUUID(e.currentTarget.value)}/>
                    </label>
                    <button onClick={()=>ref.current.focus()} type={"submit"}>Submit</button>
                </form>
                {
                <button className="pb-5" onClick={()=>{const newUUID = crypto.randomUUID(); setUUID(newUUID); setIsNewUser(true); nav("/home")}}>New User ?</button>
                }
            </div>
        </div>
    )

}
export default LoginPage;
