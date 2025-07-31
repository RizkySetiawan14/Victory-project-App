// src/components/mm/MMNavbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./cmm.css";

const NavbarCmm = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#002b5b" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    Aplikasi Laporan Mingguan
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button color="inherit" component={Link} to="/cmm">Beranda</Button>
                    <Button color="inherit" component={Link} to="/cmm/progress-cmm">Input SDM</Button>
                    <Button color="inherit" component={Link} to="/cmm/target-triwulan">Target Triwulan</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavbarCmm;
