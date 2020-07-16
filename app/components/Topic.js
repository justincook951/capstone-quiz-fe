import React, { useState } from 'react'
import MainMenu from './MainMenu';
import Loading from './Loading';

// This isn't a "test reducer", it's a "reducer for the test component" ;) that's confusing!

export default function Topic() {
    const [topicName, setTopicName] = React.useState("");
    const [description, setDescription] = React.useState("")
    return (
        <div>
            <MainMenu />
            <hr/>
            Take dat topic!
        </div>
    )
}