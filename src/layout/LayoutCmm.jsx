import React from "react";
import NavbarCmm from "../components/cmm/NavbarCmm";
import "../components/cmm/cmm.css";
import { Outlet } from "react-router-dom";

const LayoutCmm = () => {
    return (
        <div className="layout-cmm">
            <NavbarCmm />
            <main className="content-cmm">
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutCmm;
