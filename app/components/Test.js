import React from 'react'
import Question from './Question'
import {fetchQuestionsBySession, generateNewTest} from '../utils/api'

export default function Test({ sessionId = '' }) {
    const [questions, setQuestions] = React.useState([]);
    // Fetch all questions for a given session for this user
    if (sessionId === '') {
        React.useEffect(() => {
            generateNewTest()
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
        }, [])
    }
    else {
        React.useEffect(() => {
            fetchQuestionsBySession(sessionId)
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
        }, [])
    }
    return (
        <div className='questions'>
            <Question 
                inbAnswers={["answer1", "answer2"]}
            />
        </div>
    )
}