// src/components/MM/DashboardCardMM.jsx
import React from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardCardMM = () => {
  const navigate = useNavigate();

  const reviewStyle = {
    backgroundColor: "#e0e0e0",
    color: "#777",
    cursor: "default",
  };

  // Style untuk garis kuning di kiri kartu
  const yellowBorderStyle = {
    borderLeft: "6px solid #002b5b",
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        MM WEEKLY REPORT
      </Typography>

      <Grid container spacing={2}>
        {/* 1. Progress MM */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ ...yellowBorderStyle, minHeight: 160 }}>
            <CardContent>
              <Typography variant="h6">Progress MM</Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate("/mm/review-progress-afp")}
              >
                BUKA
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* 2. Target Triwulan */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ ...yellowBorderStyle, minHeight: 160 }}>
            <CardContent>
              <Typography variant="h6">Target Triwulan</Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate("/mm/target-triwulan")}
              >
                BUKA
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* 3. Total New Data */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ ...yellowBorderStyle, minHeight: 160 }}>
            <CardContent>
              <Typography variant="h6">Total New Data</Typography>
              <Button variant="contained" sx={{ mt: 2, ...reviewStyle }} disabled>
                HANYA REVIEW
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* 4. Total Nasabah Ditemui */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ ...yellowBorderStyle, minHeight: 160 }}>
            <CardContent>
              <Typography variant="h6">Total Nasabah Ditemui</Typography>
              <Button variant="contained" sx={{ mt: 2, ...reviewStyle }} disabled>
                HANYA REVIEW
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* 5. New SDM */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ ...yellowBorderStyle, minHeight: 160 }}>
            <CardContent>
              <Typography variant="h6">New SDM</Typography>
              <Button variant="contained" sx={{ mt: 2, ...reviewStyle }} disabled>
                HANYA REVIEW
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCardMM;
