import React, { useState, useEffect } from "react";
import axios from "axios";
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
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import "../../components/asman/asman.css";

export default function InputSDM() {
  const API_URL = "http://localhost:8000/api/input-sdm";

  const [nama, setNama] = useState("");
  const [tanggalMasuk, setTanggalMasuk] = useState(""); // ⬅️ state tanggal
  const [mgm, setMgm] = useState(false);
  const [ro, setRo] = useState(false);
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(API_URL)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nama_sdm_direkrut: nama,
      tanggal_masuk: tanggalMasuk, // ⬅️ kirim tanggal
      mgm,
      ro,
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Gagal simpan data:", error);
    }
  };

  const handleEdit = (item) => {
    setNama(item.nama_sdm_direkrut);
    setTanggalMasuk(item.tanggal_masuk || ""); // ⬅️ isi kalau ada
    setMgm(item.mgm);
    setRo(item.ro);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchData();
      } catch (error) {
        console.error("Gagal hapus data:", error);
      }
    }
  };

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long", // Nama bulan
      year: "numeric"
    });
  };

  const resetForm = () => {
    setNama("");
    setTanggalMasuk(""); // ⬅️ reset tanggal
    setMgm(false);
    setRo(false);
    setEditId(null);
  };

  return (
    <Box p={2}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer" }}
            onClick={() => (window.location.href = "/")}
          >
            BERANDA
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Form Input */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          {editId ? "Edit Data SDM" : "Tambah Data SDM"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama SDM Direkrut"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Tanggal Masuk"
            type="date"
            value={tanggalMasuk}
            onChange={(e) => setTanggalMasuk(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={mgm}
                onChange={() => {
                  setMgm(true);
                  setRo(false);
                }}
              />
            }
            label="MGM"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={ro}
                onChange={() => {
                  setRo(true);
                  setMgm(false);
                }}
              />
            }
            label="RO"
          />

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
              {editId ? "Update" : "Tambah"}
            </Button>
            {editId && (
              <Button variant="outlined" color="secondary" onClick={resetForm}>
                Batal
              </Button>
            )}
          </Box>
        </form>
      </Paper>

      {/* Tabel Data */}
      <Paper sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>No</TableCell>
              <TableCell>Nama SDM Direkrut</TableCell>
              <TableCell>Tanggal Masuk</TableCell>
              <TableCell>MGM</TableCell>
              <TableCell>RO</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.nama_sdm_direkrut}</TableCell>
                <TableCell>{formatTanggal(item.tanggal_masuk)}</TableCell>
                <TableCell>{item.mgm ? "✔" : ""}</TableCell>
                <TableCell>{item.ro ? "✔" : ""}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
