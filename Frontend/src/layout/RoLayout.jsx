import React, { useState, useEffect } from "react";
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
    AppBar,
    Toolbar,
} from "@mui/material";
import axios from "axios";

const RoLayout = () => {
    // State gabungan
    const [form, setForm] = useState({
        lamaran: "",
        interview: "",
        training: "",
        masuk_team: "",
        closing: "",
        event: "",
    });

    const [data, setData] = useState([]);

    // Ambil data dari API
    const fetchData = async () => {
        const rec = await axios.get("http://127.0.0.1:8000/api/ro/recruitment");
        const mt = await axios.get("http://127.0.0.1:8000/api/ro/masuk-team");
        const mc = await axios.get("http://127.0.0.1:8000/api/ro/market-closing");
        const ev = await axios.get("http://127.0.0.1:8000/api/ro/event");

        // Gabungin jadi satu row
        const merged = rec.data.map((r, i) => ({
            id: r.id,
            lamaran: r.lamaran,
            interview: r.interview,
            training: r.training,
            masuk_team: mt.data[i]?.jumlah || 0,
            closing: mc.data[i]?.closing || 0,
            event: ev.data[i]?.jumlah_event || 0,
        }));

        setData(merged);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Simpan semua data sekaligus
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simpan ke masing-masing endpoint
        await axios.post("http://127.0.0.1:8000/api/ro/recruitment", {
            lamaran: form.lamaran,
            interview: form.interview,
            training: form.training,
        });

        await axios.post("http://127.0.0.1:8000/api/ro/masuk-team", {
            jumlah: form.masuk_team,
        });

        await axios.post("http://127.0.0.1:8000/api/ro/market-closing", {
            closing: form.closing,
        });

        await axios.post("http://127.0.0.1:8000/api/ro/event", {
            jumlah_event: form.event,
        });

        setForm({
            lamaran: "",
            interview: "",
            training: "",
            masuk_team: "",
            closing: "",
            event: "",
        });

        fetchData();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Navbar */}
            <AppBar position="static" sx={{ bgcolor: "#0d47a1" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Aplikasi Laporan Mingguan - RO
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Input Data RO
                </Typography>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
                        <TextField
                            type="number"
                            label="Lamaran"
                            name="lamaran"
                            value={form.lamaran}
                            onChange={handleChange}
                        />
                        <TextField
                            type="number"
                            label="Interview"
                            name="interview"
                            value={form.interview}
                            onChange={handleChange}
                        />
                        <TextField
                            type="number"
                            label="Training"
                            name="training"
                            value={form.training}
                            onChange={handleChange}
                        />
                        <TextField
                            type="number"
                            label="Masuk Team"
                            name="masuk_team"
                            value={form.masuk_team}
                            onChange={handleChange}
                        />
                        <TextField
                            type="number"
                            label="Market Closing"
                            name="closing"
                            value={form.closing}
                            onChange={handleChange}
                        />
                        <TextField
                            type="number"
                            label="Event"
                            name="event"
                            value={form.event}
                            onChange={handleChange}
                        />
                    </Box>

                    <Button variant="contained" color="primary" type="submit">
                        SIMPAN
                    </Button>
                </form>

                {/* Table Review */}
                <Table sx={{ mt: 3 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Lamaran</TableCell>
                            <TableCell>Interview</TableCell>
                            <TableCell>Training</TableCell>
                            <TableCell>Masuk Team</TableCell>
                            <TableCell>Market Closing</TableCell>
                            <TableCell>Event</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((d, i) => (
                            <TableRow key={d.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{d.lamaran}</TableCell>
                                <TableCell>{d.interview}</TableCell>
                                <TableCell>{d.training}</TableCell>
                                <TableCell>{d.masuk_team}</TableCell>
                                <TableCell>{d.closing}</TableCell>
                                <TableCell>{d.event}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default RoLayout;
