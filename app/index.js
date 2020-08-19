import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom'
import Loading from './components/Loading'
import Home from './components/Home'
import Demo from './components/Demo'
import Login from './components/Login'
import Register from './components/Register'
import TestTaker from './components/TestTaker'
import Test from './components/Test'
import TopicMaker from './components/TopicMaker'
import Topic from './components/Topic'
import TopicList from './components/TopicList'
import Logo from './assets/logo.png'
import { hasValidLogin, expireToken } from './utils/generic_functions'
import QuestionEditor from './components/QuestionEditor'
import QuestionPerformance from './components/QuestionPerformance'

function authedPaths() {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/test/get' component={TestTaker} />
            <Route path='/test/get/:sessionId' component={Test} />
            <Route exact path='/topic/create' component={TopicMaker} />
            <Route exact path='/topic/get' component={TopicList} />
            <Route path='/topic/get/:topicId' component={Topic} />
            <Route path='/question/get/:questionId' component={QuestionEditor} />
            <Route path='/reports/get/qperformance' component={QuestionPerformance} />
            <Route path='*' component={NotFound} />
        </Switch>
    )
}

function notAuthedPaths(setAuthed) {
    return (
        <Switch>
            <Route exact path='/' component={Demo} />
            <Route exact path='/login' >
                <Login 
                    authedFunc={(newVal) => setAuthed(newVal)} />
            </Route>
            <Route exact path='/register' component={Register} />
            <Route path='*' component={NotFound} />
        </Switch>
    )
}

function NotFound() {
    return (
        <div>
            <h1>Could not locate page! 
            <NavLink 
                to='/' 
                exact
                className='reg-link'>Return home.</NavLink>
            </h1>
        </div>
    )
}

function App()  {
    const [authed, setAuthed] = React.useState(hasValidLogin());
    const logout = (() => {
        expireToken()
        setAuthed(false)
    })
    return (
        <div className='container'>
            <Router>
                <div className='row space-between'>
                    <Link
                        to='/'
                        className='partial-fill'
                    >
                        <img className='logo' src={Logo} alt='Quiz Engine' />
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
                        : <button className='btn btn-style' onClick={logout}>Logout</button>}
                    
                </div>
                <h3><i>Learning, made better</i></h3>
                <hr/>
                {authed === true 
                    ? authedPaths()
                    : notAuthedPaths(setAuthed)
                }
            </Router>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
)
