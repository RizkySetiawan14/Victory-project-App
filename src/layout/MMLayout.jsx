// src/layout/MMLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

import MMNavbar from "../components/mm/MMNavbar";

const MMLayout = () => {
    return (
        <div style={{ textAlign: "left" }}>
            <MMNavbar />
            <Outlet />
        </div>
    );
};

export default MMLayout;
