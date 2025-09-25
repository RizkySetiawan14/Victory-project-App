import React from "react";
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const KpiLayout = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Navbar */}
            <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Laporan KPI
                    </Typography>
                    <Button color="inherit" component={Link} to="/kpi/asman">
                        ASMAN
                    </Button>
                    <Button color="inherit" component={Link} to="/kpi/mm">
                        MM
                    </Button>
                    <Button color="inherit" component={Link} to="/kpi/cmm">
                        CMM
                    </Button>
                    <Button color="inherit" component={Link} to="/kpi/summary">
                        KPI
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Konten */}
            <Box sx={{ p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default KpiLayout;
