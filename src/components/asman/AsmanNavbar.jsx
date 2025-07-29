import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AsmanNavbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#002b5b" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Aplikasi Laporan Mingguan
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/asman">Beranda</Button>
          <Button color="inherit" component={Link} to="/asman/input-sdm">Input SDM</Button>
          <Button color="inherit" component={Link} to="/asman/recruitment">Recruitment</Button>
          <Button color="inherit" component={Link} to="/asman/na-team">Na Team</Button>
          <Button color="inherit" component={Link} to="/asman/progres-afp">Progres AFP</Button>
          <Button color="inherit" component={Link} to="/asman/target-triwulan">Target Triwulan</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AsmanNavbar;
