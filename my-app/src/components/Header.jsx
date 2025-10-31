import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="app-navbar"> 
            <div className="navbar-logo">
                {/* <img src="%PUBLIC_URL%/logo192.png" alt="CryptoTracker Logo" style={{height: '30px', marginRight: '10px'}}/>  */}
                <span className="app-title">CryptoTracker</span>
            </div>
            
            <ul className="navbar-links">
                <li>
                    <NavLink to="/" end>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/portfolio">Portfolio</NavLink>
                </li>
                <li>
                    <NavLink to="/compare">Compare</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;