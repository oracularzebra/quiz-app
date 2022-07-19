import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TitleCard = ()=>{

    const {categoryName, difficultyLevel} = useParams();
    const navigate = useNavigate();
    console.log(categoryName, difficultyLevel);

    

    return (
        <div>
            <h1 className="text-xl">{categoryName+ difficultyLevel}</h1>
        </div>
    )
}
export default TitleCard;