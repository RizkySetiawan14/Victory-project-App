// FILE: src/layout/AsmanLayout.jsx
import React from "react";
import MMNavbar from "../components/mm/MMNavbar";
import "../components/mm/mm.css";
import { Outlet } from "react-router-dom";

const MMLayout = () => {
    return (
        <div className="mm-layout-wrapper">
            {/* Navbar tetap di atas */}
            <MMNavbar />

            {/* Main content berada di bawah navbar dan rata kiri */}
            <main className="mm-content">
                <Outlet />
            </main>
        </div>
    );
};

export default MMLayout;
