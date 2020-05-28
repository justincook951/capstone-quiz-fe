import React from 'react'
import Question from './Question'
import {fetchQuestionsBySession, generateNewTest} from '../utils/api'
import { useParams} from "react-router";

export default function Test() {
    const [questions, setQuestions] = React.useState([]);
    const { sessionId } = useParams();
    // Fetch all questions for a given session for this user
    if (sessionId === 'new') {
        React.useEffect(() => {
            console.log("Generating a new test");
            generateNewTest()
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
        }, [])
    }
    else {
        React.useEffect(() => {
            console.log(`fetching by ID ${sessionId}`);
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