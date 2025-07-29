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
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NaTeam = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [formData, setFormData] = useState({ namaAfp: "", margin: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "margin" ? value.replace(/[^0-9]/g, "") : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataList([...dataList, { id: dataList.length + 1, ...formData }]);
    setFormData({ namaAfp: "", margin: "" });
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

      {/*halaman utama */}
      <Box p={4}>
        <Typography variant="h5" fontWeight="bold">Input Na Team</Typography>
        <Box component="form" onSubmit={handleSubmit} mt={2} display="flex" gap={2} flexWrap="wrap">
          <TextField label="Nama AFP" name="namaAfp" value={formData.namaAfp} onChange={handleChange} required />
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
              {dataList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.namaAfp}</TableCell>
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
