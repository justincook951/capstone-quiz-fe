import React from 'react'
import MainMenu from './MainMenu'
import { updateTopic, fetchTopicById, deleteQuestion, generateNewQuestion, performDeleteTopic } from '../utils/api'
import * as actiontype from '../utils/action_types'
import Loading from './Loading'
import { useParams, Redirect } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'

const initialState = {
    loading: false,
    topicName: "",
    topicDescription: "",
    error: null,
    questions: []
}
const UPDATE_TOPIC = "UPDATE_TOPIC"
const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION"

function topicReducer(state, action) {
    switch (action.type) {
        case actiontype.SUCCESS:
            return {
                ...state, 
                topicName: action.topicName,
                topicDescription: action.topicDescription, 
                questions: action.questions, 
                loading: false,
            };
        case actiontype.ERROR:
            return {...state, error: action.error, loading: false};
        case actiontype.LOADING:
            return {...state, loading: true};
        case UPDATE_TOPIC:
            return {...state, topicName: action.topicName};
        case UPDATE_DESCRIPTION:
            return {...state, topicDescription: action.topicDescription};
        case actiontype.RESET:
            return {...initialState };
        default: 
            throw new Error("unsupported action type");
    }
}

export default function Topic() {
    const [returnToList, setReturnToList] = React.useState(false);
    const [state, dispatch] = React.useReducer(
        topicReducer,
        initialState
    )
    const { topicId } = useParams();

    React.useEffect(() => {
        dispatch({ type: actiontype.LOADING });
        fetchTopicById(topicId)
            .then((apiResponse) => {
                dispatch({
                    type: actiontype.SUCCESS,
                    topicName: apiResponse.topicName,
                    topicDescription: apiResponse.topicDescription,
                    questions: apiResponse.questions
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
    }, [topicId])

    const handleSubmit = () => {
        var changedTopicData = {
            "id": parseInt(topicId),
            "topicName": state.topicName,
            "topicDescription": state.topicDescription
        }
        updateTopic(changedTopicData)
            .then((apiResponse) => dispatch({   
                    type: actiontype.SUCCESS, 
                    topicName: apiResponse.topicName,
                    topicDescription: apiResponse.topicDescription,
                    questions: apiResponse.questions,
                    loading: false
                }))
            .then((res) => setReturnToList(true))
            .catch((error) => dispatch({type: actiontype.ERROR, error: error, loading: false}));
    }

    const deleteTopic = () => {
        performDeleteTopic(parseInt(topicId))
            .then((res) => setReturnToList(true))
    }

    if (state.loading === true) {
        return <div><Loading text="Combobulizing the Crazlars" /></div>
    }

    if (returnToList === true) {
        var targetStr = `/topic/get`
        return <Redirect to={targetStr} />
    }

    return (
        <div>
            <MainMenu />
            <hr/>
            <div className="register-container flex-column-container">
                <h2 className="center-text header-lg">Topic Editor</h2>
                <div className="text-input space-top">
                    <label htmlFor="topicName" className="reqd">Topic Name: </label>
                    <input 
                        className="input-fill" 
                        type="text" 
                        name="topicName" 
                        placeholder="Descriptive name or chapter number" 
                        id="topicName"
                        defaultValue={state.topicName}
                        onChange={(e) => dispatch({
                            type: UPDATE_TOPIC,
                            topicName: e.target.value
                        })}
                    />
                </div>
                <div className="text-input">
                    <label htmlFor="description" className="reqd">Description for your topic: </label>
                    <input 
                        className="input-fill" 
                        type="text" 
                        name="description" 
                        placeholder="Some description" 
                        id="description"
                        defaultValue={state.topicDescription}
                        onChange={(e) => dispatch({
                            type: UPDATE_DESCRIPTION,
                            topicDescription: e.target.value
                        })}
                    />
                </div>
                <div>
                    <QuestionsGrid questions={state.questions} inbtopicId={topicId} />
                </div>
                <div className="row">
                    <React.Fragment>
                        <button 
                            className="btn btn-style"
                            disabled={false}
                            onClick={handleSubmit}>Save Topic Data</button>
                        <button 
                            className="btn btn-style"
                            onClick={() => setReturnToList(true)}>Cancel</button>
                        <button 
                            className="btn btn-danger"
                            onClick={deleteTopic}>Delete</button>
                    </React.Fragment>
                </div>
            </div>
        </div>
    )
}

function QuestionsGrid({ questions, inbtopicId }) {
    const [sendToUrl, setSendToUrl] = React.useState(false)
    const topicId = inbtopicId;

    if (sendToUrl) {
        var targetStr = `/question/get/${sendToUrl}`
        return <Redirect to={targetStr} />
    }

    const deleteQuestionCall = (id) => {
        deleteQuestion(id)
            .then(() => {window.location.reload()});
    }

    const createQuestion = () => {
        generateNewQuestion(topicId)
            .then((response) => setSendToUrl(response.id))
    }

    return (
        <React.Fragment>
            <p>Questions:</p>
            <span className="icon-hover" onClick={() => createQuestion()}><FontAwesomeIcon icon={faPlusCircle} /> Add Question</span><br/><br/>
            {questions.map((question, index) => {
                const { id, questionText } = question

                return (
                    <li 
                        key={id}
                        className="edit-link-rows"
                    >
                        <span onClick={() => setSendToUrl(id)}><FontAwesomeIcon icon={faPencilAlt} className="icon-hover"/> </span>
                        <span onClick={() => deleteQuestionCall(id)}><FontAwesomeIcon icon={faTrash} className="icon-hover"/> </span>
                        {questionText}
                    </li>
                )
            })}
        </React.Fragment>
    )
}