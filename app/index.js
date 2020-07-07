import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom'
import Loading from './components/Loading'
import Home from './components/Home'
import Demo from './components/Demo'
import Login from './components/Login'
import Register from './components/Register'
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

function notAuthedPaths(setAuthed) {
    return (
        <React.Fragment>
            <Route exact path='/' component={Demo} />
            <Route exact path='/login' >
                <Login 
                    authedFunc={(newVal) => setAuthed(newVal)} />
            </Route>
            <Route exact path='/register' component={Register} />
        </React.Fragment>
    )
}

function App()  {
    const [authed, setAuthed] = React.useState(false);
    const toggleAuthed = (() => {
        setAuthed((authed) => authed = !authed)
    })
    return (
        <div className='container'>
            <Router>
                <div className='row space-between'>
                    <Link
                        to='/'
                        className='partial-fill'
                    >
                        <img className='logo' src='/app/assets/logo.png' alt='Quiz Engine' />
                    </Link>
                    {!authed
                        ? <React.Fragment>
                            <NavLink 
                                to='/login' 
                                className='btn btn-style'>
                                    Login
                            </NavLink>
                            <NavLink 
                                to='/register' 
                                className='btn btn-style'>
                                    Register
                                </NavLink>
                            </React.Fragment>
                        : <button className='btn btn-style' onClick={toggleAuthed}>Logout</button>}
                    
                </div>
                <h3><i>Learning, made better</i></h3>
                <hr/>
                <React.Suspense fallback={<Loading/>} >
                    
                    <Switch>
                        {authed === true 
                            ? authedPaths()
                            : notAuthedPaths(setAuthed)
                        }
                        
                        <Route render={() => <h1>Could not locate page! 
                            <NavLink 
                                to='/' 
                                exact
                                className='reg-link'>Return home.</NavLink>
                            </h1>} />
                    </Switch>                        
                </React.Suspense>
            </Router>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
)
