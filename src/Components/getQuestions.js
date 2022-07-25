const getQuestions = ({category, difficulty_level})=>{

    return fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy').
        then(response => response.json()).
        then(responseJson => responseJson).
        catch(error => console.log(error));
}
export default getQuestions;