const getQuestions = (category, difficulty_level)=>{

    console.log(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty_level}`);
    return fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty_level}`).
        then(response => response.json()).
        then(responseJson => {
            console.log(responseJson);
            return responseJson}).
        catch(error => console.log(error));
}
export default getQuestions;