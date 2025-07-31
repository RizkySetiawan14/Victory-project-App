import React, { useState } from 'react';
import "../../components/asman/asman.css";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const InputSDM = () => {
  const [formData, setFormData] = useState({
    nama: '',
    mgm: false,
    ro: false
  });

  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nama.trim() === '') return;
    setDataList([
      ...dataList,
      { id: dataList.length + 1, ...formData }
    ]);
    setFormData({ nama: '', mgm: false, ro: false });
  };

  return (
    <div className="asman-layout">
      <AppBar position="static" sx={{ bgcolor: "#002b5b" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate("/asman")}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>
            BERANDA
          </Typography>
        </Toolbar>
      </AppBar>

      <Box className="asman-content" sx={{ p: 4, textAlign: 'left' }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Input SDM Direkrut
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <TextField
            label="Nama SDM Direkrut"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={formData.mgm} onChange={handleChange} name="mgm" />}
              label="MGM"
            />
            <FormControlLabel
              control={<Checkbox checked={formData.ro} onChange={handleChange} name="ro" />}
              label="RO"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Simpan Data
          </Button>
        </Box>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NO</TableCell>
                <TableCell>Nama SDM Direkrut</TableCell>
                <TableCell>MGM</TableCell>
                <TableCell>RO</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.mgm ? '✓' : '-'}</TableCell>
                  <TableCell>{item.ro ? '✓' : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </div>
  );
};

export default InputSDM;
