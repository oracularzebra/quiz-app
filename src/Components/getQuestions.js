const getQuestions = (category, difficulty_level)=>{

    return fetch(`https://opentdb.com/api.php?amount=10&encode=url3986&category=${category}&difficulty=${difficulty_level}`)
        .then(response => response.json())
        .then(responseJson => {
             return responseJson})
        .catch(error => console.log(error));
}
export default getQuestions;