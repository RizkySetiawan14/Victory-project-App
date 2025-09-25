import React, { useState, useEffect } from "react";
import "../../components/asman/asman.css";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NaTeam = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [formData, setFormData] = useState({ nama_afp: "", margin: "" });

  // Load data saat pertama kali
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/na-teams")
      .then((res) => res.json())
      .then((data) => setDataList(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "margin" ? value.replace(/[^0-9]/g, "") : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/na-teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_afp: formData.nama_afp,
        margin: formData.margin
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal simpan data");
        return res.json();
      })
      .then((data) => {
        setDataList([...dataList, data.data]); // update tabel
        setFormData({ nama_afp: "", margin: "" });
      })
      .catch((err) => console.error(err));
  };

  const formatUSD = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

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

      {/* Halaman utama */}
      <Box p={4}>
        <Typography variant="h5" fontWeight="bold">Input Na Team</Typography>
        <Box component="form" onSubmit={handleSubmit} mt={2} display="flex" gap={2} flexWrap="wrap">
          <TextField label="Nama AFP" name="nama_afp" value={formData.nama_afp} onChange={handleChange} required />
          <TextField label="Margin ($)" name="margin" value={formData.margin} onChange={handleChange} required />
          <Button type="submit" variant="contained">Simpan</Button>
        </Box>
        <Paper sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NO</TableCell>
                <TableCell>Nama AFP</TableCell>
                <TableCell>Margin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.nama_afp}</TableCell>
                  <TableCell>{formatUSD(item.margin)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  );
};

export default NaTeam;
