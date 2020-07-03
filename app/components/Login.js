import React from 'react'

export default function Login() {
    const authed = React.useContext(AuthedContext)
    const toggleAuthed = (() => {
        setAuthed((authed) => authed = !authed)
    })
    return (
        <h1>You must log in! <button onClick={toggleAuthed}>Login</button></h1> 
    )
}