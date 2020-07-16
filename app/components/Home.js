import React from 'react'
import MainMenu from './MainMenu'
import { getLoggedInUserObject } from '../utils/generic_functions'

export default function Home() {
    const [userObj, setUserObj] = React.useState(getLoggedInUserObject())
    return (
        <div>
            <MainMenu />
            <hr/>
            <h1>Welcome home, {userObj.firstName}!</h1>
        </div>
    )
}