// src/components/ro/NavbarRo.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./ro.css";

const NavbarRo = () => {
    return (
        <nav className="navbar-ro">
            <div className="navbar-brand">RO SYSTEM</div>
            <ul className="navbar-links">
                <li>
                    <Link to="/ro/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/ro/recruitment">Recruitment</Link>
                </li>
                <li>
                    <Link to="/ro/masuk-team">Masuk Team</Link>
                </li>
                <li>
                    <Link to="/ro/market-closing">Market Closing</Link>
                </li>
                <li>
                    <Link to="/ro/event">Event</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarRo;
