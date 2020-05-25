import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AuthedContext, { AuthedProvider } from './contexts/authed'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'
import Home from './components/Home'
import Login from './components/Login'
import MainMenu from './components/MainMenu'

function App()  {
    const [authed, setAuthed] = React.useState(false);
    const toggleAuthed = () => setAuthed((authed) => authed = !authed)
    return (
        <div className='container'>
            <Router>
                <AuthedProvider value={authed}>
                    <h1>Hello there!</h1>
                    <React.Suspense fallback={<Loading/>} >
                        
                        <Switch>
                            {authed === true 
                                ? <Route exact path='/' component={Home} /> 
                                : <Route exact path='/' component={Login} />}
                            
                            <Route render={() => <h1>404</h1>} />
                        </Switch>
                        <button onClick={toggleAuthed}>Log in / out</button>
                        <hr/>
                        <MainMenu />
                    </React.Suspense>
                </AuthedProvider>
            </Router>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
)
