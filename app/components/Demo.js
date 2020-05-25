import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Demo() {
    return (
        <div>
            <h1>This is the demo page!</h1>
            <NavLink 
                to='/create/test' 
                className='nav-link'>This is a broken link</NavLink>
        </div>
    )
}