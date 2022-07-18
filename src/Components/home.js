import { Link } from "react-router-dom";

const Home = ()=>{
    
    const titles = [
        'General Knowledge',
        //This will have multiple subitems like books, movies, music, television, cartoons and animation,and video games.
        'Entertainment',
        //This will have maths, gadgets and computer as sub options, which will apper when a user hovers over them.
        'Science', 
        'Celebrities',
        'Animal',
        'Vehicles'
    ];

    return(

    <div className="bg-red-300 flex flex-wrap justify-around content-center rounded-md m-2 shadow-2xl shadow-slate-600">
        {Array.from({length: titles.length}).map( (_, index)=> (
        <Link key={index} className="bg-slate-400 rounded-md grow shrink basis-0 p-14 md:p-24 m-2 text-xl text-center" to={`${titles[index]}`}>{titles[index]}</Link>
        ))}
    </div>
    )
}
export default Home;