import React from 'react'
import { registerUser } from '../utils/api'
import Loading from './Loading';

function registerReducer(state, action) {
    if (action.type === 'success') {
        return {
            registerStatus: "success",
            loading: false
        }
    }
    else if (action.type === 'error') {
        return {
            registerStatus: "error",
            loading: false
        }
    }
    else if (action.type === 'loading') {
        return {
            registerStatus: "",
            loading: true
        }
    }
    else {
        throw new Error("unsupported action");
    }
}

export default function Register() {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordVerify, setPasswordVerify] = React.useState("");
    const [state, dispatch] = React.useReducer(
        registerReducer,
        {registerStatus: "", loading: false}
    )
    React.useEffect(() => {
        if ((firstName === "") || (lastName === "") || (username === "") || (password === "") || (passwordVerify !== password) || loading !== true) {
            // Registration shouldn't execute, do nothing.
        }
        else {
            registerUser({username: username, lastName: lastName, firstName: firstName, password: password})
                .then(() => dispatch({type: 'success'}))
                .catch(() => dispatch({type: 'error'}))
        }
    });

    const { loading, registerStatus } = state;

    const register = () => { dispatch({type: 'loading'}); }

    if (loading === true) {
        return <Loading text="Creating your account" />
    }
    else if (registerStatus === "success") {
        return <h1>Registration was successful! (Pretty fast, right?) Feel free to login with your new user account.</h1>
    }
    else if (registerStatus === "error") {
        return <p>Error encountered.</p>
    }
    return (
        <div className="register-container flex-column-container">
            <h2 className="center-text header-lg">Let's make your account!</h2>
            <div className="text-input space-top">
                <label htmlFor="firstName" className="reqd">First name: </label>
                <input 
                    className="input-fill" 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    id="firstName"
                    onChange={e => setFirstName(e.target.value)}
                />
            </div>
            <div className="text-input">
                <label htmlFor="lastName" className="reqd">Last name: </label>
                <input 
                    className="input-fill" 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    id="lastName"
                    onChange={e => setLastName(e.target.value)}
                />
            </div>
            <div className="text-input">
                <label htmlFor="username" className="reqd">Username: </label>
                <input 
                    className="input-fill" 
                    type="text" 
                    name="username" 
                    placeholder="Unique username"
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
                    placeholder="Strong password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="text-input">
                <label htmlFor="passwordVerify" className="reqd">Retype Password: </label>
                {password !== passwordVerify && passwordVerify !== ""
                    ? <p className="warning-text">Passwords don't match.</p>
                    : null}
                <input 
                    className="input-fill" 
                    type="password" 
                    name="passwordVerify" 
                    placeholder="Retype Password"
                    id="passwordVerify"
                    onChange={e => setPasswordVerify(e.target.value)}
                />
            </div>
            <div className="row">
                <button 
                    className="btn btn-style"
                    disabled={(firstName === "") || (lastName === "") || (username === "") || (password === "") || (passwordVerify !== password)}
                    onClick={register}>Register</button>
            </div>
        </div>
    )
}