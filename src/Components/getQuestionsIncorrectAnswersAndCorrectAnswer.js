const getQuestions = (category, difficulty_level)=>{

    return fetch(`https://opentdb.com/api.php?amount=10&encode=url3986&category=${category}&difficulty=${difficulty_level}`)
        .then(response => response.json())
        .then(responseJson => {
            const result = responseJson.results;
            return {questions:result.map(ques=>decodeURIComponent(ques.question)), correct_answers:result.map(ques=>decodeURIComponent(ques.correct_answer)), incorrect_answers:result.map(ques=>ques.incorrect_answers.map((inans)=>decodeURIComponent(inans)))}})
        .catch(error => console.log(error));
}
export default getQuestions;