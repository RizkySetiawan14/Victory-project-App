// src/pages/ProgressAFP.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const ProgressAfp = () => {
  const [nasabah, setNasabah] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchNasabah = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/nasabah");
      setNasabah(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNasabah();
  }, []);

  // Group by nama_afp
  const grouped = nasabah.reduce((acc, item) => {
    if (!acc[item.nama_afp]) acc[item.nama_afp] = [];
    acc[item.nama_afp].push(item);
    return acc;
  }, {});

  // Edit handler
  const handleEdit = (row) => setEditData({ ...row });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/api/nasabah/${editData.id}`, editData);
      setEditData(null);
      fetchNasabah();
      alert("Data berhasil diupdate");
    } catch (err) {
      console.error(err);
      alert("Gagal update data");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Progress AFP (Rekap Nasabah per AFP)
      </Typography>

      {Object.keys(grouped).map((afp) => (
        <Paper key={afp} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {afp}
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama Nasabah</TableCell>
                <TableCell>New Data</TableCell>
                <TableCell>No</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tgl TF Projection</TableCell>
                <TableCell>Top Up (USD)</TableCell>
                <TableCell>Progress Terakhir</TableCell>
                <TableCell>Strategi Closing</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grouped[afp].map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nama_nasabah}</TableCell>
                  <TableCell>{row.new_data ?? "-"}</TableCell>
                  <TableCell>{row.no ?? "-"}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.tgl_tf_projection || "-"}</TableCell>
                  <TableCell>{row.top_up ?? "-"}</TableCell>
                  <TableCell>{row.progress_terakhir ?? "-"}</TableCell>
                  <TableCell>{row.strategi_closing ?? "-"}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" onClick={() => handleEdit(row)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ))}

      {/* Modal Edit */}
      <Dialog open={!!editData} onClose={() => setEditData(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Data Nasabah</DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2, mt: 2 }}>
          {editData && (
            <>
              <TextField label="Nama AFP" name="nama_afp" value={editData.nama_afp} onChange={handleChange} />
              <TextField label="Nama Nasabah" name="nama_nasabah" value={editData.nama_nasabah} onChange={handleChange} />
              <TextField label="Status" name="status" value={editData.status} onChange={handleChange} />
              <TextField label="Top Up (USD)" name="top_up" type="number" value={editData.top_up || ""} onChange={handleChange} />
              <TextField label="Progress Terakhir" name="progress_terakhir" value={editData.progress_terakhir || ""} onChange={handleChange} />
              <TextField label="Strategi Closing" name="strategi_closing" value={editData.strategi_closing || ""} onChange={handleChange} />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditData(null)}>Batal</Button>
          <Button variant="contained" onClick={handleSave}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProgressAfp;
