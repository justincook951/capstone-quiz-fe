import React from 'react'
import MainMenu from './MainMenu'
import { updateQuestion, fetchQuestionById, deleteAnswer } from '../utils/api'
import * as actiontype from '../utils/action_types'
import Loading from './Loading'
import { useParams, Redirect } from "react-router";
import AnswerEditor from './AnswerEditor'

const initialState = {
    loading: false,
    questionText: "",
    questionExplanation: "",
    topicId: null,
    topicName: "",
    isValidQuestion: false,
    error: null,
    answers: []
}
const UPDATE_QUESTION_TEXT = "UPDATE_QUESTION_TEXT"
const UPDATE_EXPLANATION = "UPDATE_EXPLANATION"

function questionEditorReducer(state, action) {
    switch (action.type) {
        case actiontype.SUCCESS:
            let isValidQuestion = false;
            if (action.answers
            && action.answers.length > 1) {
                isValidQuestion = (action.answers.filter(answer => answer.isCorrect == true)).length > 0;
            }
            console.log(isValidQuestion)
            return {
                ...state, 
                questionText: action.questionText,
                questionExplanation: action.questionExplanation,
                topicId: action.topicId,
                topicName: action.topicName,
                answers: action.answers,
                isValidQuestion: isValidQuestion,
                loading: false,
            };
        case actiontype.ERROR:
            return {...state, error: action.error, loading: false};
        case actiontype.LOADING:
            return {...state, loading: true};
        case UPDATE_QUESTION_TEXT:
            return {...state, questionText: action.questionText};
        case UPDATE_EXPLANATION:
            return {...state, questionExplanation: action.questionExplanation};
        case actiontype.RESET:
            return {...initialState };
        default: 
            throw new Error("unsupported action type");
    }
}

export default function QuestionEditor() {
    const [state, dispatch] = React.useReducer(
        questionEditorReducer,
        initialState
    )

    const { questionId } = useParams();

    React.useEffect(() => {
        dispatch({ type: actiontype.LOADING });
        fetchQuestionById(questionId)
            .then((apiResponse) => {
                dispatch({
                    type: actiontype.SUCCESS,
                    questionText: apiResponse.questionText,
                    questionExplanation: apiResponse.questionExplanation,
                    topicId: apiResponse.topicId,
                    topicName: apiResponse.topicName,
                    answers: apiResponse.answers
                });
            })
            .catch((error) => {
                dispatch({
                    type: actiontype.ERROR,
                    error
                })
            });
        return () => {
            //cleanup
            dispatch({ type: actiontype.RESET });
        } 
    }, [questionId])

    const [sendToUrl, setSendToUrl] = React.useState(false)

    if (sendToUrl) {
        var targetStr = `/topic/get/${sendToUrl}`
        return <Redirect to={targetStr} />
    }

    const handleSubmit = () => {
        console.log("handle submit")
        var changedData = {
            "id": parseInt(questionId),
            "questionText": state.questionText,
            "questionExplanation": state.questionExplanation,
            "topicId": state.topicId
        }
        updateQuestion(changedData)
            .then((apiResponse) => dispatch({   
                    type: actiontype.SUCCESS, 
                    questionText: apiResponse.questionText,
                    questionExplanation: apiResponse.questionExplanation,
                    topicId: apiResponse.topicId,
                    topicName: apiResponse.topicName,
                    answers: apiResponse.answers
                }))
            .catch((error) => dispatch({type: actiontype.ERROR, error: error, loading: false}));
    }

    return (
        <div>
            <MainMenu />
            <hr/>
            <div className="register-container flex-column-container">
                <h2 className="center-text header-lg">Question Editor</h2>
                <div className="text-input space-top">
                    {!state.isValidQuestion
                        ?
                        <div className="row">
                            <p className="warning-text">Note that this question will not appear in any tests until you've added at least 2 answers, and marked one as correct.</p>
                        </div>
                        : null}
                    
                    <p>Topic: {state.topicName 
                        ? state.topicName 
                        : "Unassigned"}</p>
                    <label htmlFor="questionText" className="reqd">Question Text: </label>
                    <input 
                        className="input-fill" 
                        type="text" 
                        name="questionText" 
                        placeholder="The question text itself" 
                        id="questionText"
                        defaultValue={state.questionText}
                        onChange={(e) => dispatch({
                            type: UPDATE_QUESTION_TEXT,
                            questionText: e.target.value
                        })}
                    />
                </div>
                <div className="text-input">
                    <label htmlFor="questionExplain" className="reqd">Explain the answer: </label>
                    <input 
                        className="input-fill" 
                        type="text" 
                        name="questionExplain" 
                        placeholder="Displays after you submit an answer" 
                        defaultValue={state.questionExplanation}
                        id="questionExplain"
                        onChange={e => dispatch({
                            type: UPDATE_EXPLANATION,
                            questionExplanation: e.target.value
                        })}
                    />
                </div>
                <div>
                    <AnswersGrid answers={state.answers} />
                </div>
                <div className="row">
                    <React.Fragment>
                        <button 
                            className="btn btn-style"
                            disabled={false}
                            onClick={handleSubmit}>Save Question</button>
                        <button 
                            className="btn btn-style"
                            onClick={() => setSendToUrl(state.topicId)}>Cancel</button>
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
}

function AnswersGrid({ answers }) {
    const [sendToUrl, setSendToUrl] = React.useState(false)

    if (sendToUrl) {
        var targetStr = `/question/get/${sendToUrl}`
        return <Redirect to={targetStr} />
    }

    const createAnswer = () => {
        console.log("Making an answer!")
    }

    return (
        <React.Fragment>
            <span onClick={() => createAnswer()}>New Answer</span><br/><br/>
            {answers.map((answer, index) => {

                return (
                    <AnswerEditor answer={answer} />
                )
            })}
        </React.Fragment>
    )
}