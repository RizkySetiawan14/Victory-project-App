// FILE: src/layout/AsmanLayout.jsx
import React from "react";
import MMNavbar from "../components/cmm/NavbarCmm";
import "../components/cmm/cmm.css";
import { Outlet } from "react-router-dom";

const LayoutCmm = () => {
    return (
        <div className="cmm-layout-wrapper">
            {/* Navbar tetap di atas */}
            <MMNavbar />

            {/* Main content berada di bawah navbar dan rata kiri */}
            <main className="cmm-content">
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutCmm;
