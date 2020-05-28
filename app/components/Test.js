import React from 'react'
import Question from './Question'
import {fetchQuestionsBySession, generateNewTest} from '../utils/api'
import * as actiontype from '../utils/action_types'
import { useParams} from "react-router";
import MainMenu from './MainMenu';
import Loading from './Loading';

// This isn't a "test reducer", it's a "reducer for the test component" ;) that's confusing!
function testReducer(state, action) {
    if (action.type === actiontype.SUCCESS) {
        return {
            error: null,
            questions: action.response
        }
    }
    else if (action.type === actiontype.FAILURE) {
        return {
            
        }
    }
    else if (action.type === actiontype.ERROR) {
        return {

        }
    }
}

export default function Test() {
    const [state, dispatch] = React.useReducer(
        testReducer,
        {error: null}
    )
    const { sessionId } = useParams();
    // Fetch all questions for a given session for this user
    if (sessionId === 'new') {
        React.useEffect(() => {
            console.log("Generating a new test");
            generateNewTest()
                .then((response) => {
                    console.log(response);
                    dispatch({ type: actiontype.SUCCESS, state, response })
                })
                .catch((err) => console.log(err));
        }, [])
    }
    else {
        React.useEffect(() => {
            console.log(`fetching by ID ${sessionId}`);
            fetchQuestionsBySession(sessionId)
                .then((response) => {
                    console.log('got response in fetch')
                    console.log(response);
                    dispatch({ type: actiontype.SUCCESS, state, response })
                })
                .catch((err) => console.log(err));
        }, [])
    }
    
    return (
        <React.Fragment>
            <MainMenu />
            <hr/>
            <div className='questionsContainer'>
                <ul>
                    {state.questions
                        ? state.questions.map((question, index) => {
                            return (
                                <li key={question.questionId}>
                                    <Question 
                                        questionText={question.questionText}
                                        questionExplanation={question.questionExplanation}
                                        questionType={question.questionType}
                                        inbAnswers={question.answers}
                                    />
                                </li>
                            )
                        }) 
                        : state.error 
                            ? <h1>{error}</h1> 
                            : <Loading text='Getting questions' />
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}