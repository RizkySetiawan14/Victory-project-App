// src/layout/MMLayout.jsx
import React from "react";
import MMNavbar from "../components/mm/MMNavbar";
import "../components/mm/mm.css";
import { Outlet } from "react-router-dom";

const MMLayout = ({ children }) => {
    return (
        <div className="mm-layout">
            <MMNavbar />
            <main className="mm-content">
                <Outlet />
                {children}
            </main>
        </div>
    );
};

export default MMLayout;
