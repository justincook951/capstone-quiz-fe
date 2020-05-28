import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { AuthedProvider } from './contexts/authed'
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom'
import Loading from './components/Loading'
import Home from './components/Home'
import Demo from './components/Demo'
import TestMaker from './components/TestMaker'
import TestTaker from './components/TestTaker'
import Test from './components/Test'

function authedPaths() {
    return (
        <React.Fragment>
            <Route exact path='/' component={Home} />
            <Route exact path='/test/create' component={TestMaker} />
            <Route exact path='/test/get' component={TestTaker} />
            <Route path='/test/get/:sessionId' component={Test} />
        </React.Fragment>
    )
}

function notAuthedPaths() {
    return (
        <Route exact path='/' component={Demo} />
    )
}

function App()  {
    const [authed, setAuthed] = React.useState(true);
    const toggleAuthed = (() => {
        setAuthed((authed) => authed = !authed)
    })
    return (
        <div className='container'>
            <Router>
                <AuthedProvider value={authed}>
                    <div className='row space-between'>
                        <Link
                            to='/'
                        >
                            <img className='logo' src='/app/assets/logo.png' alt='Quiz Engine' />
                        </Link>
                        <button className='btn btn-style' onClick={toggleAuthed}>{!authed ? 'Login' : 'Logout'}</button>
                    </div>
                    <h3><i>Learning, made better</i></h3>
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
