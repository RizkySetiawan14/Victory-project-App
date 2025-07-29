import React from "react";
import NavbarCmm from "../components/cmm/NavbarCmm";
import "../components/cmm/cmm.css";
import { Outlet } from "react-router-dom";

const LayoutCmm = ({ children }) => {
    return (
        <div className="layout-cmm">
            <NavbarCmm />
            <Outlet />
            <main className="content-cmm">{children}</main>
        </div>
    );
};

export default LayoutCmm;
