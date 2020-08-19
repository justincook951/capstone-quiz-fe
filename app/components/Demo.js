import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Demo() {
    return (
        <div>
            <NavLink 
                to='/login' 
                className='nav-link'>Please log in to continue.</NavLink>
        </div>
    )
}