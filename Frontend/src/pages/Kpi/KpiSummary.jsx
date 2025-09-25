import React from "react";
import { Paper, Typography, Grid } from "@mui/material";

const KpiSummary = () => {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Ringkasan KPI Gabungan
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>Total ASMAN: 10</Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>Total MM: 15</Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>Total CMM: 8</Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default KpiSummary;
