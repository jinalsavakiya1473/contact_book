import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='border-bottom mb-5'>
            <div className="container">
                <header className='d-flex align-items-center justify-content-between py-3'>
                    <div className="left">
                        <h2><Link to="/">Contact Book</Link></h2>
                    </div>
                    <div className="right">
                        <ul className='d-flex align-items-center'>
                            <li><Link to="/">Add Contact</Link></li>
                            <li><Link to="/view">View Contact</Link></li>
                        </ul>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default Header
