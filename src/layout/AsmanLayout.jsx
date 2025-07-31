// FILE: src/layout/AsmanLayout.jsx
import React from "react";
import AsmanNavbar from "../components/asman/AsmanNavbar";
import "../components/asman/asman.css";
import { Outlet } from "react-router-dom";

const AsmanLayout = () => {
  return (
    <div className="asman-layout-wrapper">
      {/* Navbar tetap di atas */}
      <AsmanNavbar />

      {/* Main content berada di bawah navbar dan rata kiri */}
      <main className="asman-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AsmanLayout;
