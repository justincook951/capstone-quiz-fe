import React from 'react'
import { getToken } from '../utils/api'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as actiontype from '../utils/action_types'
import Loading from './Loading'

function loginReducer(state, action) {
    if (action.type === actiontype.SUCCESS && action.loginResponse.status !== 401) {
        return {
            loginResponse: action.loginResponse,
            loading: false,
            error: null
        }
    }
    else if (action.type === actiontype.SUCCESS && action.loginResponse.status === 401) {
        return {
            loginResponse: action.loginResponse,
            loading: false,
            error: "Invalid credentials"
        }
    }
    else if (action.type === actiontype.ERROR) {
        return {
            loginResponse: null,
            loading: false,
            error: action.message
        }
    }
    else if (action.type === actiontype.LOADING) {
        return {
            loginResponse: null,
            loading: true,
            error: null
        }
    }
    else {
        throw new Error("unsupported action type")
      }
}

export default function Login({authedFunc}) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [state, dispatch] = React.useReducer(
        loginReducer,
        {loginResponse: null, loading: false, error: null}
    )
    const { loginResponse, error, loading } = state

    const attemptLogin = () => { 
        dispatch({type: actiontype.LOADING, loginResponse: null, error: null})
        getToken({username: username, password: password})
            .then((response) => dispatch({type: actiontype.SUCCESS, loginResponse: response}))
            .catch((error) => dispatch({type: actiontype.ERROR, error: error.message})); 
    }

    if (loginResponse && loginResponse.status !== 401) {
        authedFunc(true);
        return <Redirect to='/' />
    }

    return (
        <div className="register-container flex-column-container">
            <h2 className="center-text header-lg">Welcome back!</h2>
            <div className="text-input space-top">
                <label htmlFor="username" className="reqd">Username: </label>
                <input 
                    className="input-fill" 
                    type="text" 
                    name="username" 
                    placeholder="Your Username"
                    id="username"
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div className="text-input">
                <label htmlFor="password" className="reqd">Password: </label>
                <input 
                    className="input-fill" 
                    type="password" 
                    name="password" 
                    placeholder="Your Password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="row">
                {loading
                    ? <Loading text="Checking Login" />
                    : 
                    <button 
                        className="btn btn-style"
                        disabled={(username === "") || (password === "") || loading}
                        onClick={attemptLogin}>Login</button>
                }
            </div>
            {(loginResponse && loginResponse.status === 401)
                ? <span className="warning-text">Invalid credentials. Please try again.</span>
                : null
            }
        </div>
    )
}

Login.propTypes = {
    authedFunc: PropTypes.func.isRequired
}