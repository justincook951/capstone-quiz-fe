import React from 'react'
import MainMenu from './MainMenu'
import { fetchSessionsByUser } from '../utils/api'
import * as actiontype from '../utils/action_types'
import Loading from './Loading'
import { useHistory } from 'react-router-dom'

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

function loadTest(session, history) {
    history.push(`/test/get/${session}`);
}

function SessionsGrid({ sessions }) {
    const history = useHistory();
    return (
        <React.Fragment>
            <li className='btn-style' onClick={() => loadTest('new', history)}>
                Start New Test
            </li>
            <li></li>
            {sessions.map((session, index) => {
                const { sessionId, name, lastAccessed } = session

                return (
                    <li 
                        key={sessionId}
                        className='btn-style'
                        onClick={() => loadTest(sessionId, history)}
                    >
                        {name}: {lastAccessed} ({sessionId})
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