import React from "react";
import '../abstractcard.css';

const Picture = ({pictureLoading, pictures, currQuesIndex})=>{

    return (   
        !pictureLoading && <img alt="Something went wrong" className="picture" src={pictures[currQuesIndex].photos[0].src.medium}></img>
    )

}
export default Picture;