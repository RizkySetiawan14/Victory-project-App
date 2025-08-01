// src/components/mm/MMNavbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./mm.css";

const MMNavbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#002b5b" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    Aplikasi Laporan Mingguan
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button color="inherit" component={Link} to="/mm">Beranda</Button>
                    <Button color="inherit" component={Link} to="/mm/input-sdm">Input SDM</Button>
                    <Button color="inherit" component={Link} to="/mm/target-triwulan">Target Triwulan</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MMNavbar;
