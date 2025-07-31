import React from "react";
import "../../components/cmm/cmm.css";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const DashboardCard = () => {
    const inputMenus = [
        { title: "Progress MM", path: "/cmm/progress-Cmm" },
        { title: "Target Triwulan", path: "/cmm/target-triwulan-Cmm" },
    ];

    const reviewMenus = [
        { title: "Total New Data All Team" },
        { title: "Total Nasabah Ditemui" },
        { title: "Progress Afp" }
    ];

    return (
        <Box className="dashboard-cmm-container">
            <Typography variant="h4" gutterBottom className="dashboard-cmm-title">
                CMM WEEKLY REPORT
            </Typography>

            <Grid container spacing={2}>
                {[...inputMenus, ...reviewMenus].map((menu, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card className="card-cmm">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>{menu.title}</Typography>
                                {menu.path ? (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        component={Link}
                                        to={menu.path}
                                        className="card-button"
                                    >
                                        BUKA
                                    </Button>
                                ) : (
                                    <Button variant="contained" fullWidth disabled className="card-button-disabled">
                                        Hanya Review
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DashboardCard;
