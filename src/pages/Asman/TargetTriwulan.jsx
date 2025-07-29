import React, { useState } from "react";
import "../../components/asman/asman.css";
import {
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const TargetTriwulan = () => {
  const [nmiPerBulan, setNmiPerBulan] = useState("");
  const [totalNmi, setTotalNmi] = useState("");
  const navigate = useNavigate();

  const kursDollar = 10000;
  const targetRupiah = 300_000_000;
  const targetDollar = targetRupiah / kursDollar;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nmiPerBulan || !totalNmi) {
      alert("Mohon lengkapi semua data terlebih dahulu.");
      return;
    }

    const data = {
      nmiPerBulan: parseFloat(nmiPerBulan),
      totalNmi: parseFloat(totalNmi),
    };

    localStorage.setItem("targetTriwulan", JSON.stringify(data));
    navigate("/");
  };

  const kurangTarget = totalNmi ? targetDollar - parseFloat(totalNmi) : null;

  return (
    <>
      {/* Navbar biru + tombol kembali */}
      <AppBar position="static" sx={{ bgcolor: "#002b5b" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>
            BERANDA
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Konten utama */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Input Target Triwulan
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500 }}>
          <TextField
            label="NMI Periode Bulan Ini (USD)"
            fullWidth
            margin="normal"
            type="number"
            value={nmiPerBulan}
            onChange={(e) => setNmiPerBulan(e.target.value)}
            required
          />
          <TextField
            label="Total NMI Bulan Ini (USD)"
            fullWidth
            margin="normal"
            type="number"
            value={totalNmi}
            onChange={(e) => setTotalNmi(e.target.value)}
            required
          />

          {/* Tampilkan hasil kurang target secara otomatis */}
          {kurangTarget !== null && (
            <Box mt={2}>
              <Typography fontWeight="bold">Kurang Target:</Typography>
              <Typography color="error">
                {kurangTarget >= 0
                  ? `$${kurangTarget.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}`
                  : "Target tercapai!"}
              </Typography>
            </Box>
          )}

          <Button variant="contained" type="submit" sx={{ mt: 3 }}>
            Simpan
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TargetTriwulan;
