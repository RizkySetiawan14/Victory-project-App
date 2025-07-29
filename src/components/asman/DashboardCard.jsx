import React from "react";
import "../../components/asman/asman.css";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const DashboardCard = () => {
  const inputMenus = [
    { title: "Input SDM Direkrut", path: "/asman/input-sdm" },
    { title: "Recruitment", path: "/asman/recruitment" },
    { title: "Na Team", path: "/asman/na-team" },
    { title: "Progres AFP", path: "/asman/progres-afp" },
    { title: "Target Triwulan", path: "/asman/target-triwulan" },
  ];

  const reviewMenus = [
    { title: "Total New Data" },
    { title: "Nasabah Ditemui" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">ASMAN WEEKLY REPORT 2025</h1>

      <Grid container spacing={2}>
        {[...inputMenus, ...reviewMenus].map((menu, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <div className="card-custom">
              <CardContent>
                <Typography variant="h6" gutterBottom>{menu.title}</Typography>
                {menu.path ? (
                  <Button
                    className="card-button"
                    component={Link}
                    to={menu.path}
                  >
                    BUKA
                  </Button>
                ) : (
                  <Button className="card-button-disabled" disabled>
                    Hanya Review
                  </Button>
                )}
              </CardContent>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DashboardCard;
