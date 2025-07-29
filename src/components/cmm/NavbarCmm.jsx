import React from "react";
import { Link } from "react-router-dom";
import "./cmm.css";

const NavbarCmm = () => {
    return (
        <nav className="navbar-cmm">
            <Link to="/cmm" className="navbar-link">
                BERANDA
            </Link>
        </nav>
    );
};

export default NavbarCmm;
