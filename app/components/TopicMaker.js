import React from 'react'
import MainMenu from './MainMenu'

export default function TopicMaker() {
    const [topicName, setTopicName] = React.useState("");
    const [description, setDescription] = React.useState("")
    return (
        <div>
        <MainMenu />
        <hr/>
        <div className="register-container flex-column-container">
            <h2 className="center-text header-lg">Topic Creator</h2>
            <div className="text-input space-top">
                <label htmlFor="topicName" className="reqd">Topic Name: </label>
                <input 
                    className="input-fill" 
                    type="text" 
                    name="topicName" 
                    placeholder="Descriptive name or chapter number" 
                    id="topicName"
                    onChange={e => setTopicName(e.target.value)}
                />
            </div>
            <div className="text-input">
                <label htmlFor="description" className="reqd">Description for your topic: </label>
                <input 
                    className="input-fill" 
                    type="text" 
                    name="description" 
                    placeholder="Some description" 
                    id="description"
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="row">
                <button 
                    className="btn btn-style"
                    disabled={false}
                    onClick={() => alert("create")}>Create and Add Questions</button>
            </div>
        </div>
    </div>
    )
}