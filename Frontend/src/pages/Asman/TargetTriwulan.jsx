import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Alert,
} from "@mui/material";

const TargetTriwulan = () => {
  // ================== STATE ==================
  const [nmiPerBulan, setNmiPerBulan] = useState(0);
  const [totalNmi, setTotalNmi] = useState(0);
  const [tanggal, setTanggal] = useState("");
  const [targetList, setTargetList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ================== FETCH DATA (GET) ==================
  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/target-triwulan");
      setTargetList(res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  // ================== SIMPAN DATA (POST) ==================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/target-triwulan", {
        nmi_per_bulan: nmiPerBulan,
        total_nmi: totalNmi,
        tanggal: tanggal, // format YYYY-MM-DD
      });

      setSuccessMessage("Data berhasil disimpan!");
      setErrorMessage("");

      // Reset form
      setNmiPerBulan("");
      setTotalNmi("");
      setTanggal("");

      // Refresh tabel
      fetchTargets();
    } catch (err) {
      console.error("Gagal simpan data:", err);
      setErrorMessage("Gagal menyimpan data. Pastikan semua input terisi benar.");
      setSuccessMessage("");
    }
  };

  // ================== RENDER ==================
  return (
    <div>
      {/* ================== FORM INPUT ================== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Input Target Triwulan</Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="NMI Per Bulan"
            type="number"
            value={nmiPerBulan}
            onChange={(e) => setNmiPerBulan(Number(e.target.value))}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Total NMI"
            type="number"
            value={totalNmi}
            onChange={(e) => setTotalNmi(Number(e.target.value))}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Tanggal"
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Simpan
          </Button>
        </form>
      </Paper>

      {/* ================== TABEL DATA ================== */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Daftar Target Triwulan</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NMI Per Bulan</TableCell>
              <TableCell>Total NMI</TableCell>
              <TableCell>Tanggal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {targetList.map((target) => (
              <TableRow key={target.id || target.tanggal}>
                <TableCell>{target.nmi_per_bulan}</TableCell>
                <TableCell>{target.total_nmi}</TableCell>
                <TableCell>{target.tanggal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default TargetTriwulan;
