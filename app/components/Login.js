import React from 'react'
import { getToken } from '../utils/api'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Login({authedFunc}) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginResponse, updateLoginResponse] = React.useState("");

    const attemptLogin = () => { 
        console.log(authedFunc);
        getToken({username: username, password: password})
            .then((response) => updateLoginResponse(response)); 
    }

    if (loginResponse && loginResponse.status !== 401) {
        console.log(loginResponse[0])
        //document.cookie="token=" + loginResponse[0].token + "; secure";
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
                <button 
                    className="btn btn-style"
                    disabled={(username === "") || (password === "")}
                    onClick={attemptLogin}>Login</button>
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