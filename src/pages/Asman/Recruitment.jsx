import React, { useState } from "react";
import "../../components/asman/asman.css";

import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Recruitment = () => {
  const [formData, setFormData] = useState({
    lamaran: 1,
    interview: 1,
    training: 1,
  });

  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value),
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
      lamaran: 1,
      interview: 1,
      training: 1,
    });
  };

  return (
    <>
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
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Input Recruitment
        </Typography>

        {/* Form Input */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Lamaran</InputLabel>
              <Select
                name="lamaran"
                value={formData.lamaran}
                label="Lamaran"
                onChange={handleChange}
              >
                {[...Array(20)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Interview</InputLabel>
              <Select
                name="interview"
                value={formData.interview}
                label="Interview"
                onChange={handleChange}
              >
                {[...Array(20)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Training</InputLabel>
              <Select
                name="training"
                value={formData.training}
                label="Training"
                onChange={handleChange}
              >
                {[...Array(20)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button variant="contained" type="submit">
            Simpan
          </Button>
        </Box>

        {/* Table Output */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NO</TableCell>
                <TableCell>Lamaran</TableCell>
                <TableCell>Interview</TableCell>
                <TableCell>Training</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.lamaran}</TableCell>
                  <TableCell>{item.interview}</TableCell>
                  <TableCell>{item.training}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  );
};

export default Recruitment;
