import React from 'react'
import MainMenu from './MainMenu'
import Test from './Test'

export default function TestTaker() {
    // Fetch all existing tests (sessions) for this user
    return (
        <div>
            <MainMenu />
            <hr/>
            <h1>Take a test</h1>
            <Test 
                inbAnswers={["answer1", "answer2"]}
            />
        </div>
    )
}