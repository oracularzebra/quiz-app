import { useNavigate } from "react-router-dom";
import { useEffect, React } from "react";
import titles from "./titles";

const Home = ({UUID,category, difficulty,isLoggedIn, setCategory, setDifficulty})=>{

    const navigate = useNavigate();
    useEffect(()=>{
        if(UUID === null || !isLoggedIn){
            navigate("/");
        }
    }, []);
    
    return(
    <div className="homePage">
        <h2 className="text-center">Hey! {UUID}</h2>
    <div className="bg-slate-300 lg:bg-slate-200 order-2 flex flex-wrap justify-around rounded-md m-2 shadow-2xl shadow-slate-600">
        {
            titles.map(obj => (
                <div className="bg-white rounded-md md:p-2 basis-0 grow shrink m-2 lg:m-10 lg:shadow-md lg:bg-slate-50" key={obj.itemNo}>
                    {!obj.subItems 
                    ?   
                        <h1 className="text-xl text-center">{obj.itemName}</h1>
                    :   
                        <div className="grid">
                            <h1 className="text-xl text-center">{obj.itemName}</h1>
                            <h2>Sub Categories</h2>
                            <div className="flex flex-wrap">
                                {obj.subItems.map((subObj, index) => (
                                    <label className="border-emerald-300 border-2 p-1 rounded-md m-1" key={index}>
                                        <input type={'radio'} name='title' onChange={()=>{
                                            setCategory(subObj.category);
                                        }}/>
                                        {subObj.itemName}
                                    </label>
                                ))}
                            </div>
                        </div>
                    }
                    {
                        <div className="grid">
                            <h1>Difficulty</h1>
                            <div className="flex">
                                {obj.difficulty.map((level, index) => (
                                    <label className="m-1 border-blue-400 border-2 rounded-xl p-1" key={index}>
                                        <input type='radio' name='difficulty' onChange={(event)=>{
                                            setDifficulty(event.currentTarget.parentNode.textContent);
                                        }}/>{level}                                           
                                    </label>
                                ))}
                            </div>
                        </div>
                    }
                    {
                        <div>
                            <button className="border-2 rounded-md m-1 border-indigo-500" onClick={()=>{
                                obj.subItems ?
                                    category && difficulty && navigate(`${category}/${difficulty.toLowerCase()}`)
                                :
                                    difficulty && navigate(`${obj.category}/${difficulty.toLowerCase()}`)
 
                            }}>Take Test</button>
                        </div>
                    }
                </div>
            ))
        }
    </div>
    </div>
    )
}
export default Home;