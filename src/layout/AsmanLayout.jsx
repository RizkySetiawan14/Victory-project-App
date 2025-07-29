import React from "react";
import { Outlet } from "react-router-dom";
// Tes apakah ini error
import AsmanNavbar from "../components/asman/AsmanNavbar";

const AsmanLayout = () => {
  return (
    <div style={{ textAlign: "left" }}>
      <AsmanNavbar />
      <Outlet />
    </div>
  );
};

export default AsmanLayout;