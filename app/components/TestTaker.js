import React from 'react'
import MainMenu from './MainMenu'
import { fetchSessionsByUser, fetchTopicsByUser, generateNewTest } from '../utils/api'
import * as actiontype from '../utils/action_types'
import Loading from './Loading'
import { Redirect } from 'react-router-dom'
import { unixTimestampToLocalDate, getUserData } from '../utils/generic_functions'
import Select from 'react-select';
import Tooltip from './Tooltip'

function testTakerReducer(state, action) {
    if (action.type === actiontype.SUCCESS) {
        return {
            error: null,
            sessions: action.response
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

function validateTopicEligible(topic) {
    let isValidForTest = false;
    if (topic.questions.length < 2) {
        return isValidForTest;
    }
    isValidForTest = true;
    return isValidForTest;
}

function SessionsGrid({ sessions }) {
    const [sendToTest, setSendToTest] = React.useState(false);
    const [topics, setTopics] = React.useState([]);
    const [showTopics, setShowTopics] = React.useState(false);
    const [selectedTopic, setSelectedTopic] = React.useState(false);
    const [userId,] = React.useState(getUserData("id"))

    React.useEffect(() => {
        fetchTopicsByUser()
            .then((response) => {
                let topicsList = [];
                response.forEach(element => {
                    if (validateTopicEligible(element)) {
                        // Fill "Select" object
                        let newObj = {
                            "label": element.topicName,
                            "value": element.id
                        };
                        topicsList.push(newObj)
                    }   
                });
                setTopics(topicsList)
            })
            //.catch((err) => dispatch({ type: actiontype.ERROR, err }));
    }, [])

    const startNewTest = () => {
        generateNewTest(selectedTopic.value, userId)
            .then((response) => {
                setSendToTest(response.id)
            })
            //.catch((err) => dispatch({ type: actiontype.ERROR, err }));
    }

    if (sendToTest) {
        var targetStr = `/test/get/${sendToTest}`
        return <Redirect to={targetStr} />
    }

    return (
        <React.Fragment>
            <li className='btn-style' onClick={() => setShowTopics(true)}>
                Start New Test
            </li>
            <li>
                {showTopics
                    ? 
                    <React.Fragment>
                        <div>
                        <Select options={topics} 
                            placeholder="Select a Topic"
                            onChange={(topic) => setSelectedTopic(topic)} />
                        </div>
                        <div>
                            <button 
                                className='btn btn-style' 
                                disabled={!selectedTopic}
                                onClick={startNewTest}>Go To New Test!</button>
                        </div>
                    </React.Fragment>
                    : null}
            </li>
            {sessions.map((session, index) => {
                const { id, topic } = session
                const lastVisitedTime = unixTimestampToLocalDate(session.lastVisitedTime)

                return (
                    
                    <li 
                        key={id}
                        className='btn-style'
                        onClick={() => setSendToTest(id)}
                    >
                        <Tooltip text={`Created ${lastVisitedTime}`}>
                            {topic.topicName.length > 20 ? `${topic.topicName.substring(0, 17)}...`  : topic.topicName}
                        </Tooltip>
                    </li>
                )
            })}
        </React.Fragment>
    )
}

export default function TestTaker() {
    // Fetch all existing sessions (tests in progress) for this user
    const [state, dispatch] = React.useReducer(
        testTakerReducer,
        {error: null}
    )
    React.useEffect(() => {
        fetchSessionsByUser()
            .then((response) => {
                dispatch({ type: actiontype.SUCCESS, state, response })
            })
            .catch((err) => dispatch({ type: actiontype.ERROR, err }));
    }, [])

    const isLoading = () => !state.sessions && state.error === null

    return (
        <div>
            <MainMenu />
            <hr/>
            <div className="sub-container">                
                 <ul className='grid-small space-around'>
                    {state.sessions ? <SessionsGrid sessions={state.sessions} /> : null}
                    <li>{isLoading() ? <Loading text='Getting tests' /> : null}</li>
                </ul>
            </div>
        </div>
    )
}