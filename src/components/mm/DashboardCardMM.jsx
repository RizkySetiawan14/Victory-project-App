// src/components/MM/DashboardCardMM.jsx
import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

const DashboardCardMM = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 150 }}>
            <CardContent>
              <Typography variant="h6">New SDM Review</Typography>
              <Typography>Total SDM baru yang direkrut minggu ini.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 150 }}>
            <CardContent>
              <Typography variant="h6">Total New Data</Typography>
              <Typography>Gabungan data dari ASMAN dan MM.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 150 }}>
            <CardContent>
              <Typography variant="h6">Total Nasabah Ditemui</Typography>
              <Typography>Diambil dari data ASMAN.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ minHeight: 150 }}>
            <CardContent>
              <Typography variant="h6">Review Laporan Progress AFP</Typography>
              <Typography>Data dari progress AFP bagian ASMAN.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCardMM;

