import React, { useState } from "react";
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
  MenuItem,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProgressAfp = () => {
  const [formData, setFormData] = useState({
    namaAfp: "",
    newData: "",
    namaNasabah: "",
    status: "",
    tglTf: "",
    topUp: "",
    progresNasabah: "",
    strategiClosing: "",
  });

  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = ["newData", "topUp"].includes(name)
      ? value.replace(/[^0-9]/g, "")
      : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataList([
      ...dataList,
      {
        id: dataList.length + 1,
        ...formData,
      },
    ]);
    setFormData({
      namaAfp: "",
      newData: "",
      namaNasabah: "",
      status: "",
      tglTf: "",
      topUp: "",
      progresNasabah: "",
      strategiClosing: "",
    });
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

      {/* Konten utama */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Input Progres AFP
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <div className="form-grid">
            <div>
              <TextField
                label="Nama AFP *"
                name="namaAfp"
                value={formData.namaAfp}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField
                label="New Data *"
                name="newData"
                type="number"
                value={formData.newData}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField label="NO" value={dataList.length + 1} disabled />
            </div>
            <div>
              <TextField
                label="Nama Nasabah *"
                name="namaNasabah"
                value={formData.namaNasabah}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="">-- Pilih --</MenuItem>
                <MenuItem value="Prospek">Prospek</MenuItem>
                <MenuItem value="FU-1">FU 1</MenuItem>
                <MenuItem value="FU-2">FU 2</MenuItem>
                <MenuItem value="FU-3">FU 3</MenuItem>
                <MenuItem value="HOT-PROSPEK">HOT PROSPEK</MenuItem>
                <MenuItem value="PROJECTION">PROJECTION</MenuItem>
              </TextField>
            </div>
            <div>
              <TextField
                label="TGL TF Projection"
                name="tglTf"
                type="date"
                value={formData.tglTf}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </div>
            <div>
              <TextField
                label="Top Up (USD) *"
                name="topUp"
                value={formData.topUp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="full-width">
              <TextField
                label="Progres Terakhir Nasabah"
                name="progresNasabah"
                value={formData.progresNasabah}
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div className="full-width">
              <TextField
                label="Strategi Closing"
                name="strategiClosing"
                value={formData.strategiClosing}
                onChange={handleChange}
                fullWidth
              />
            </div>
          </div>

          <Button variant="contained" sx={{ mt: 2 }} type="submit">
            Simpan
          </Button>
        </Box>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama AFP</TableCell>
                <TableCell>New Data</TableCell>
                <TableCell>NO</TableCell>
                <TableCell>Nama Nasabah</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>TGL TF Projection</TableCell>
                <TableCell>Top Up</TableCell>
                <TableCell>Progres Terakhir</TableCell>
                <TableCell>Strategi Closing</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.namaAfp}</TableCell>
                  <TableCell>{item.newData}</TableCell>
                  <TableCell>{item.namaNasabah}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.tglTf}</TableCell>
                  <TableCell>{formatUSD(item.topUp)}</TableCell>
                  <TableCell>{item.progresNasabah}</TableCell>
                  <TableCell>{item.strategiClosing}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  );
};

export default ProgressAfp;
