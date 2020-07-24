import React from 'react'
import MainMenu from './MainMenu'
import { getUserData } from '../utils/generic_functions'
import { editTopic, fetchTopicById } from '../utils/api'
import * as actiontype from '../utils/action_types'
import Loading from './Loading'
import { useParams } from "react-router";

const initialState = {
    loading: false,
    topicName: "",
    topicDescription: "",
    error: null
}
const UPDATE_TOPIC = "UPDATE_TOPIC"
const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION"

function topicReducer(state, action) {
    switch (action.type) {
        case actiontype.SUCCESS:
            return {...state, topicName: action.topicName, topicDescription: action.topicDescription, loading: false};
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
                    topicDescription: apiResponse.topicDescription
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
        editTopic(changedTopicData)
            .then((response) => dispatch({type: actiontype.SUCCESS, apiResponse: response, loading: false}))
            .catch((error) => dispatch({type: actiontype.ERROR, error: error, loading: false}));
    }

    const cancel = () => {
        initialState.topicDescription = "changed"
    }

    if (state.loading === true) {
        return <div><Loading text="Combobulizing the Crazlars" /></div>
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
                    Questions here
                </div>
                <div className="row">
                    {state.loading
                        ? <Loading text="Submitting Topic" />
                        : 
                        <React.Fragment>
                            <button 
                                className="btn btn-style"
                                disabled={false}
                                onClick={handleSubmit}>Save Topic Data</button>
                            <button 
                                className="btn btn-style"
                                onClick={cancel}>Cancel</button>
                        </React.Fragment>
                    }

                </div>
            </div>
        </div>
    )
}