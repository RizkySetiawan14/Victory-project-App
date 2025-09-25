import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarCmm = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#002b5b" }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    Aplikasi Laporan Mingguan
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button color="inherit" component={Link} to="/cmm">Beranda</Button>
                    <Button color="inherit" component={Link} to="/cmm/recruitment-cmm">Recruitment</Button>
                    <Button color="inherit" component={Link} to="/cmm/input-sdm-cmm">Input SDM</Button>
                    <Button color="inherit" component={Link} to="/cmm/nasabah-form-cmm">Nasabah</Button>
                    <Button color="inherit" component={Link} to="/cmm/na-team-cmm">Na Team</Button>
                    <Button color="inherit" component={Link} to="/cmm/target-triwulan-cmm">Target Triwulan</Button>
                    <Button color="inherit" component={Link} to="/cmm/progress-afp-cmm">Progress AFP</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavbarCmm;
