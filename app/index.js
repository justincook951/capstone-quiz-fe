import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AuthedContext, { AuthedProvider } from './contexts/authed'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Loading from './components/Loading'
import Home from './components/Home'
import Demo from './components/Demo'
import { NavLink } from 'react-router-dom'
import TestMaker from './components/TestMaker'
import TestTaker from './components/TestTaker'

function authedPaths() {
    return (
        <React.Fragment>
            <Route exact path='/' component={Home} />
            <Route exact path='/create/test' component={TestMaker} />
            <Route path='/get/test' component={TestTaker} />
        </React.Fragment>
    )
}

function notAuthedPaths() {
    return (
        <Route exact path='/' component={Demo} />
    )
}

function App()  {
    const [authed, setAuthed] = React.useState(false);
    const toggleAuthed = (() => {
        setAuthed((authed) => authed = !authed)
        if (authed === false) {
            console.log("Returning a redirect");
            return <Redirect to='/' />
        }
    })
    return (
        <div className='container'>
            <Router>
                <AuthedProvider value={authed}>
                    <div className='row space-between'>
                        <h1>Quiz Engine 2.0</h1>
                        <button className='btn reg-button' onClick={toggleAuthed}>{!authed ? 'Login' : 'Logout'}</button>
                    </div>
                    <h3><i>Testing, made better</i></h3>
                    <React.Suspense fallback={<Loading/>} >
                        
                        <Switch>
                            {authed === true 
                                ? authedPaths()
                                : notAuthedPaths()
                            }
                            
                            <Route render={() => <h1>Could not locate page! 
                                <NavLink 
                                    to='/' 
                                    exact
                                    className='reg-link'>Return home.</NavLink>
                                </h1>} />
                        </Switch>                        
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
