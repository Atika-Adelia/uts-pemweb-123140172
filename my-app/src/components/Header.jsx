import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Scale, Wallet } from 'lucide-react';
import { Coins } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="app-navbar"> 
        <div className="navbar-logo">
            <Coins size={30} color="#facc15" style={{ marginRight: "8px" }} />
            <span className="app-title">Crypto Tracker</span>
            </div>
            
            <ul className="navbar-links">
                <li>
                    <NavLink to="/" end className="nav-item">
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/compare" className="nav-item">
                        <Scale size={18} />
                        <span>Compare</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/portfolio" className="nav-item">
                        <Wallet size={18} />
                        <span>Portfolio</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
