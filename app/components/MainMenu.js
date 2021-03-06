import React from 'react'
import Login from './Login'
import { NavLink } from 'react-router-dom'

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

function MainMenuNav() {
    const authed = true;
    if (!authed) {
        return (<Login />)
    }
    else {
        return (
            <nav className='row space-between'>
                <ul className='row nav'>
                    <li>
                        <NavLink 
                            to='/' 
                            exact
                            className='nav-link'
                            activeStyle={activeStyle}>
                                Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/topic/create' 
                            exact
                            className='nav-link'
                            activeStyle={activeStyle}>
                                Create New Topic
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/topic/get' 
                            exact
                            className='nav-link'
                            activeStyle={activeStyle}>
                                Edit Existing Topics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/test/get' 
                            className='nav-link'
                            activeStyle={activeStyle}>
                                Take A Test
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/reports/get/qperformance' 
                            className='nav-link'
                            activeStyle={activeStyle}>
                                See Past Performance
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default function MainMenu() {
    return (
        <React.Fragment>
            <MainMenuNav />
        </React.Fragment>
    )
}