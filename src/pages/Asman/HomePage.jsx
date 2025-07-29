import React from "react";
import "../components/asman/asman.css"; // ⬅️ tambahkan ini
import { Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

const HomePage = () => {
  const targetData = JSON.parse(localStorage.getItem("targetTriwulan")) || { kurangTarget: 0 };
  const raw = localStorage.getItem('targetTriwulan');
  const t = raw ? JSON.parse(raw) : { totalNmi: 0 };
  const totalNmi = t.totalNmi || 0;

  const kurs = 16300;
  const targetRp = 300_000_000;
  const targetUsd = targetRp / kurs;
  const kurang = Math.max(0, targetUsd - totalNmi);

  return (
    <Box className="asman-container">
      <Typography variant="h4" className="asman-title" gutterBottom>
        ASMAN WEEKLY REPORT 2025
      </Typography>

      <Paper className="asman-table-paper" sx={{ border: '2px solid red', maxWidth: 400 }}>
        <Typography variant="h6" fontWeight="bold">
          TARGET TRIWULAN 300 JUTA
        </Typography>
        <Typography variant="body1" className="asman-warning" mt={1}>
          KURANG TARGET: ${Number(targetData.kurangTarget).toLocaleString('en-US')}
        </Typography>
      </Paper>

      <Paper className="asman-table-paper">
        <Typography variant="h6" gutterBottom>
          SDM DIREKRUT
        </Typography>
        {/* ...lanjutan table... */}
      </Paper>

      {/* Table lainnya tetap, hanya tambahkan class CSS bila perlu */}
      <Paper className="asman-table-paper">
        <Typography variant="h6">TOTAL NEW DATA ALL TEAM</Typography>
        <Box className="centered-number">0</Box>
      </Paper>
    </Box>
  );
};

export default HomePage;
