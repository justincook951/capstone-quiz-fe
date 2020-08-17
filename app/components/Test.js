import React from 'react'
import Question from './Question'
import { fetchNextQuestionBySession, generateNewTest, removeQuestionFromList, addQuestionToList } from '../utils/api'
import * as actiontype from '../utils/action_types'
import { useParams} from "react-router";
import MainMenu from './MainMenu';
import Loading from './Loading';

// This isn't a "test reducer", it's a "reducer for the test component" ;) that's confusing!
function testReducer(state, action) {
    switch (action.type) {
        case actiontype.SUCCESS:
            return {
                error: null,
                question: action.response.question,
                totalQuestionCount: action.response.questionCount
            }
            // Semantic deliciousness
            break;
        case actiontype.FAILURE:
            return {
            
            }
            break;
        case actiontype.ERROR:
            return {

            }
            break;
        case actiontype.RESET:
            return {
                error: null
            }
        default:
            throw new Error(`Action Type ${action.type} not implemented`);
    }
}

export default function Test() {
    const [questionData, updateQuestionData] = React.useState(false)
    const [state, dispatch] = React.useReducer(
        testReducer,
        {error: null}
    )
    const [attemptedQuestions, setAttemptedQuestions] = React.useState(1)
    const { sessionId } = useParams();
    // Fetch all questions for a given session for this user
    React.useEffect(() => {
        dispatch({ type:actiontype.RESET })
        fetchNextQuestionBySession(sessionId)
            .then((response) => {
                if (response === {}) {
                    
                }
                dispatch({ type: actiontype.SUCCESS, state, response })
            })
            .catch((err) => console.log(err));
    }, [questionData])

    const updateTest = (action) => {
        switch (action.type) {
            case actiontype.REQUEUE:
                addQuestionToList(action.sessionQuestionId, action.number)
                break;
            case actiontype.REMOVE:
                removeQuestionFromList(action.sessionQuestionId)
                break;
            default:
                throw new Error("Unsupported action call in updateTest")
        }
    }

    const getNextQuestion = () => {
        updateQuestionData(!questionData);
    }

    let question = (state.question ? state.question : null);
    return (
        <React.Fragment>
            <MainMenu />
            <hr/>
            <div className='questionsContainer'>
                {state.error
                    ? <h1>{error}</h1> 
                    : !state.question
                        ? <Loading text='Getting question' />
                        : null
                } 
                <ul>
                    {state.question
                        ?
                        <React.Fragment key={`fragment-${question.sessionQuestionId}`}>
                            <h3>{state.totalQuestionCount ? `Question ${attemptedQuestions} of ${state.totalQuestionCount} left` : null}</h3>
                            <li>
                                <Question 
                                    inbsessionQuestionId={question.sessionQuestionId}
                                    inbquestionText={question.questionText}
                                    inbquestionExplanation={question.questionExplanation}
                                    inbAnswers={question.answers}
                                    nextQuestion={getNextQuestion}
                                    onSubmitFunc={(action) => updateTest(action)}
                                />
                            </li>
                        </React.Fragment>
                        : null
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}