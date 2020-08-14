import React from 'react'
import MainMenu from './MainMenu'
import { fetchSessionsByUser, fetchTopicsByUser, generateNewTest } from '../utils/api'
import * as actiontype from '../utils/action_types'
import Loading from './Loading'
import { Redirect } from 'react-router-dom'
import { unixTimestampToLocalDate } from '../utils/generic_functions'
import Select from 'react-select';

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

    React.useEffect(() => {
        fetchTopicsByUser()
            .then((response) => {
                let topicsList = [];
                response.forEach(element => {
                    // Fill "Select" object
                    if (validateTopicEligible(element)) {
                        let newObj = {
                            "label": `${element.topicName} : ${element.id}`,
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
        generateNewTest(selectedTopic.value, 5)
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
                        {topic.topicName}: Last Visited {lastVisitedTime} ({id})
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