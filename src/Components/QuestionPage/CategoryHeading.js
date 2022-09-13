const CategoryAndDifficultyHeading = ({category, difficulty})=>{

    return(
        <h2 className="md:font-medium text-center md:text-2xl mt-3">{category+": "+decodeURIComponent(difficulty.toUpperCase())}</h2>
    )


}
export default CategoryAndDifficultyHeading;