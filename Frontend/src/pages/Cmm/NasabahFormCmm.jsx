// src/pages/NasabahForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";

const NasabahFormCmm = () => {
    const [form, setForm] = useState({
        nama_afp: "",
        nama_nasabah: "",
        no: "",
        new_data: "",
        status: "Prospek", // default status
        tgl_tf_projection: "",
        top_up: "",
        progress_terakhir: "",
        strategi_closing: "",
    });

    const [nasabahList, setNasabahList] = useState([]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const fetchNasabah = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/nasabah");
            setNasabahList(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNasabah();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...form,
                no: form.no ? Number(form.no) : null,
                new_data: form.new_data ? Number(form.new_data) : null,
                top_up: form.top_up ? Number(form.top_up) : null,
                status: form.status || "Prospek",
            };
            await axios.post("http://localhost:8000/api/nasabah", payload);
            alert("Berhasil disimpan");
            setForm({
                nama_afp: "",
                nama_nasabah: "",
                no: "",
                new_data: "",
                status: "Prospek",
                tgl_tf_projection: "",
                top_up: "",
                progress_terakhir: "",
                strategi_closing: "",
            });
            fetchNasabah();
        } catch (err) {
            console.error(err);
            alert("Gagal menyimpan. Cek console.");
        }
    };

    // urutkan: nama_afp → nama_nasabah → no → new_data
    const sortedNasabah = [...nasabahList].sort((a, b) => {
        if (a.nama_afp !== b.nama_afp) return a.nama_afp.localeCompare(b.nama_afp);
        if (a.nama_nasabah !== b.nama_nasabah) return a.nama_nasabah.localeCompare(b.nama_nasabah);
        if ((a.no ?? 0) !== (b.no ?? 0)) return (a.no ?? 0) - (b.no ?? 0);
        return (a.new_data ?? 0) - (b.new_data ?? 0);
    });

    return (
        <Box p={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Input Progress AFP (Nasabah)
            </Typography>

            {/* Form input */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Box component="form" onSubmit={onSubmit} display="grid" gap={2}>
                    <TextField
                        label="Nama AFP *"
                        name="nama_afp"
                        value={form.nama_afp}
                        onChange={onChange}
                        required
                    />

                    <TextField
                        label="Nama Nasabah *"
                        name="nama_nasabah"
                        value={form.nama_nasabah}
                        onChange={onChange}
                        required
                    />

                    <TextField
                        label="No (Urutan Nasabah)"
                        name="no"
                        type="number"
                        value={form.no}
                        onChange={onChange}
                        helperText="Boleh kosong; akan otomatis diurutkan."
                    />

                    <TextField
                        label="New Data (AFP)"
                        name="new_data"
                        type="number"
                        value={form.new_data}
                        onChange={onChange}
                        helperText="Boleh kosong; akan ditampilkan di baris pertama AFP."
                    />

                    <TextField
                        select
                        label="Status"
                        name="status"
                        value={form.status}
                        onChange={onChange}
                    >
                        <MenuItem value="Prospek">Prospek</MenuItem>
                        <MenuItem value="FU-1">FU-1</MenuItem>
                        <MenuItem value="FU-2">FU-2</MenuItem>
                        <MenuItem value="FU-3">FU-3</MenuItem>
                        <MenuItem value="F1">F1</MenuItem>
                        <MenuItem value="F21">F21</MenuItem>
                        <MenuItem value="Projection">Projection</MenuItem>
                        <MenuItem value="HOT-PROSPEK">HOT-PROSPEK</MenuItem>
                    </TextField>

                    <TextField
                        label="TGL TF Projection"
                        name="tgl_tf_projection"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={form.tgl_tf_projection}
                        onChange={onChange}
                    />

                    <TextField
                        label="Top Up (USD)"
                        name="top_up"
                        type="number"
                        value={form.top_up}
                        onChange={onChange}
                    />

                    <TextField
                        label="Progress Terakhir Nasabah"
                        name="progress_terakhir"
                        value={form.progress_terakhir}
                        onChange={onChange}
                        multiline
                    />

                    <TextField
                        label="Strategi Closing"
                        name="strategi_closing"
                        value={form.strategi_closing}
                        onChange={onChange}
                        multiline
                    />

                    <Button variant="contained" type="submit">
                        Simpan
                    </Button>
                </Box>
            </Paper>

            {/* Tabel daftar nasabah */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Data Nasabah
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nama AFP</TableCell>
                            <TableCell>Nama Nasabah</TableCell>
                            <TableCell>No</TableCell>
                            <TableCell>New Data (AFP)</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Tgl TF Projection</TableCell>
                            <TableCell>Top Up (USD)</TableCell>
                            <TableCell>Progress Terakhir</TableCell>
                            <TableCell>Strategi Closing</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedNasabah.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.nama_afp}</TableCell>
                                <TableCell>{row.nama_nasabah}</TableCell>
                                <TableCell>{row.no ?? "-"}</TableCell>
                                <TableCell>{row.new_data ?? "-"}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.tgl_tf_projection || "-"}</TableCell>
                                <TableCell>{row.top_up ?? "-"}</TableCell>
                                <TableCell>{row.progress_terakhir ?? "-"}</TableCell>
                                <TableCell>{row.strategi_closing ?? "-"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};

export default NasabahFormCmm;
