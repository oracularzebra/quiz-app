import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = ()=>{
    
    const navigate = useNavigate();
    const titles = [
        {
            itemNo:0,
            itemName:'General Knowledge',
            difficulty:['Easy', 'Medium', 'Hard']
        },
        {
            itemNo:1,
            itemName:'Entertainment',
            subItems:['Books', 'Movies', 'Music', 'Television', 'Cartoons', 'Animation', 'Video Games'],
            difficulty:['Easy', 'Medium', 'Hard']

        },
        {
            itemNo:2,
            itemName:'Science',
            subItems:['Maths', 'Gadgets', 'Computers'],
            difficulty:['Easy', 'Medium', 'Hard']
        },
        {
            itemNo:3,
            itemName:'Celebrities',
            difficulty:['Easy', 'Medium', 'Hard']
        },
        {
            itemNo:4,
            itemName:'Animal',
            difficulty:['Easy', 'Medium', 'Hard']
        },
        {
            itemNo:5,
            itemName:'Vehicle',
            difficulty:['Easy', 'Medium', 'Hard']
        }
    ];
    const [category, setCategory] = useState(null); 
    const [difficulty, setDifficulty] = useState(null);
   
    return(
    <div className="bg-red-300 flex flex-wrap justify-around rounded-md m-2 shadow-2xl shadow-slate-600">
        {
            titles.map(obj => (
                <div className="bg-white rounded-md md:p-2 basis-0 grow shrink m-2" key={obj.itemNo}>
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
                                        <input type={'radio'} name='title' onChange={(event)=>{
                                            setCategory(event.currentTarget.parentNode.textContent);
                                        }}/>
                                        {subObj}
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
                                // if(category && difficulty){
                                //     if(!obj.subItems){
                                        
                                //         navigate(`${obj.itemName}/${difficulty}`);
                                //     }else{                                
                                //         navigate(`${category}/${difficulty}`);
                                //     }
                                // }
                                obj.subItems ?
                                    category && difficulty && navigate(`${category}/${difficulty}`)
                                :
                                    difficulty && navigate(`${obj.itemName}/${difficulty}`)
 
                            }}>Take Test</button>
                        </div>
                    }
                </div>
            ))
        }
    </div>
    )
}
export default Home;