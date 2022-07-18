import { useParams } from "react-router-dom";

const TitleCard = ()=>{

    const {categoryName} = useParams();

    return (
        <div>
            <h1 className="text-xl">{categoryName}</h1>
        </div>
    )
}
export default TitleCard;