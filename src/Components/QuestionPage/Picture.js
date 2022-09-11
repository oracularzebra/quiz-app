const Picture = ({pictureLoading, pictures, currQuesIndex})=>{

    return (   
        !pictureLoading && <img alt="Something went wrong" className="rounded-lg col-start-1 m-auto w-52 h-52 md:w-96 md:h-96 bg-contain mt-3 mb-3 shadow-md border-x-4 border-y-2 col-end-2 row-start-1 row-end-4" src={pictures[currQuesIndex].photos[0].src.medium}></img>
    )

}
export default Picture;