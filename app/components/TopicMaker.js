import React from 'react'
import MainMenu from './MainMenu'
import { getUserData } from '../utils/generic_functions'
import { generateNewTopic } from '../utils/api'
import { Redirect } from 'react-router-dom'
import * as actiontype from '../utils/action_types'
import Loading from './Loading'

function topicMakerReducer(state, action) {
    if (action.type === actiontype.SUCCESS) {
        return {
            apiResponse: action.apiResponse,
            loading: false,
            error: null
        }
    }
    else if (action.type === actiontype.ERROR) {
        return {
            apiResponse: null,
            loading: false,
            error: action.message
        }
    }
    else if (action.type === actiontype.LOADING) {
        return {
            apiResponse: null,
            loading: true,
            error: null
        }
    }
    else {
        throw new Error("unsupported action type")
      }
}

export default function TopicMaker() {
    const [topicName, setTopicName] = React.useState("");
    const [description, setDescription] = React.useState("")
    const [userId,] = React.useState(getUserData("id"))
    const [state, dispatch] = React.useReducer(
        topicMakerReducer,
        {apiResponse: null, loading: false, error: null}
    )

    const { apiResponse, error, loading } = state

    const handleSubmit = () => {
        dispatch({type: actiontype.LOADING, apiResponse: null, error: null})
        generateNewTopic({ topicName: topicName, topicDescription: description, userId: userId })
            .then((response) => dispatch({type: actiontype.SUCCESS, apiResponse: response, loading: false}))
    }

    if (apiResponse && !error) {
        return <Redirect to='/topic/get' />
    }

    return (
        <div>
        <MainMenu />
        <hr/>
        <div className="register-container flex-column-container">
            <h2 className="center-text header-lg">Topic Creator</h2>
            <div className="text-input space-top">
                <label htmlFor="topicName" className="reqd">Topic Name: </label>
                <input 
                    className="input-fill" 
                    type="text" 
                    name="topicName" 
                    placeholder="Descriptive name or chapter number" 
                    id="topicName"
                    onChange={e => setTopicName(e.target.value)}
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
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="row">
                {loading
                    ? <Loading text="Submitting Topic" />
                    : 
                        <button 
                        className="btn btn-style"
                        disabled={!topicName || !description}
                        onClick={handleSubmit}>Create and Add Questions</button>
                }

            </div>
        </div>
    </div>
    )
}