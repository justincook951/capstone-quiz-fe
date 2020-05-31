import React, { useState } from 'react'
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
            questions: action.response,
            displayQuestion: action.response[0].questionId
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
    const [displayQuestion, updateDisplayQuestion] = useState(1);
    // Fetch all questions for a given session for this user
    if (sessionId === 'new') {
        React.useEffect(() => {
            generateNewTest()
                .then((response) => {
                    dispatch({ type: actiontype.SUCCESS, state, response })
                    updateDisplayQuestion(state.questionId[0]);
                })
                .catch((err) => console.log(err));
        }, [])
    }
    else {
        React.useEffect(() => {
            fetchQuestionsBySession(sessionId)
                .then((response) => {
                    dispatch({ type: actiontype.SUCCESS, state, response })
                })
                .catch((err) => console.log(err));
        }, [])
    }
    const goToQuestion = (targetQuestionId) => {
        updateDisplayQuestion(targetQuestionId);
    }
    const getNextQuestion = (currentQuestionId) => {
        goToQuestion(currentQuestionId + 1);
    }
    const getPreviousQuestion = (currentQuestionId) => {
        goToQuestion(currentQuestionId - 1);
    }
    return (
        <React.Fragment>
            <MainMenu />
            <hr/>
            <div className='questionsContainer'>
            {state.error
                ? <h1>{error}</h1> 
                : !state.questions
                    ? <Loading text='Getting questions' />
                    : null
            } 
                <ul>
                    {state.questions
                        ? state.questions.map((question) => {
                            if (question.questionId === displayQuestion) {
                                return (
                                    <React.Fragment key={`fragment-${question.questionId}`}>
                                        <h3>Question {displayQuestion} of {state.questions.length}</h3>
                                        <li>
                                            <Question 
                                                questionText={question.questionText}
                                                questionExplanation={question.questionExplanation}
                                                questionType={question.questionType}
                                                inbAnswers={question.answers}
                                                previousQuestion={() => getPreviousQuestion(question.questionId)}
                                                nextQuestion={() => getNextQuestion(question.questionId)}
                                                previousEnabled={question.questionId !== 1}
                                                nextEnabled={question.questionId !== state.questions.length}
                                            />
                                        </li>
                                    </React.Fragment>
                                )
                            }
                            else {
                                return null;
                            }
                        }) 
                        : null
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}