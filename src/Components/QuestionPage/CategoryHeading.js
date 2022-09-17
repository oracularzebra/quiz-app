import React from "react";
import '../abstractcard.css'

const CategoryAndDifficultyHeading = ({category, difficulty})=>{

    return(
        <h2 className="categoryAndDifficultyHeading">{category+": "+decodeURIComponent(difficulty.toUpperCase())}</h2>
    )


}
export default CategoryAndDifficultyHeading;