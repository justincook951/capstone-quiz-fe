import React from 'react'
import MainMenu from './MainMenu'
import { fetchTopicsByUser } from '../utils/api'
import * as actiontype from '../utils/action_types'
import Loading from './Loading'
import { Redirect } from 'react-router-dom'

function topicListReducer(state, action) {
    if (action.type === actiontype.SUCCESS) {
        return {
            error: null,
            topics: action.response
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

function TopicsGrid({ topics }) {
    const [sendToTopic, setSendToTopic] = React.useState(false)

    if (sendToTopic) {
        var targetStr = `/topic/get/${sendToTopic}`
        return <Redirect to={targetStr} />
    }

    return (
        <React.Fragment>
            {topics.map((topic, index) => {
                const { id, topicName } = topic

                return (
                    <li 
                        key={id}
                        className='btn-style'
                        onClick={() => setSendToTopic(id)}
                    >
                        {topicName.length > 20 ? `${topicName.substring(0, 17)}...`  : topicName}: ({id})
                    </li>
                )
            })}
        </React.Fragment>
    )
}

export default function TopicList() {
    // Fetch all existing topics, or topics just for this user if they're an admin
    const [state, dispatch] = React.useReducer(
        topicListReducer,
        {error: null}
    )
    React.useEffect(() => {
        fetchTopicsByUser()
            .then((response) => {
                dispatch({ type: actiontype.SUCCESS, state, response })
            })
            .catch((err) => dispatch({ type: actiontype.ERROR, err }));
    }, [])

    const isLoading = () => !state.topics && state.error === null

    return (
        <div>
            <MainMenu />
            <hr/>
            <div className="sub-container">                
                 <ul className='grid-small space-around'>
                    {state.topics ? <TopicsGrid topics={state.topics} /> : null}
                    <li>{isLoading() ? <Loading text='Getting topics' /> : null}</li>
                </ul>
            </div>
        </div>
    )
}