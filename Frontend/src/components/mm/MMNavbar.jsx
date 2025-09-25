import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const MMNavbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#002b5b" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Aplikasi Laporan Mingguan
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/mm">Beranda</Button>
          <Button color="inherit" component={Link} to="/mm/recruitment-mm">Recruitment</Button>
          <Button color="inherit" component={Link} to="/mm/input-sdm-mm">Input SDM</Button>
          <Button color="inherit" component={Link} to="/mm/nasabah-form-mm">Nasabah</Button>
          <Button color="inherit" component={Link} to="/mm/na-team-mm">Na Team</Button>
          <Button color="inherit" component={Link} to="/mm/target-triwulan-mm">Target Triwulan</Button>
          <Button color="inherit" component={Link} to="/mm/progress-afp-mm">Progress AFP</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MMNavbar;
