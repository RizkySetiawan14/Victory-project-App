import React, { useState, useEffect } from "react";
import "../../components/asman/asman.css";

import {
    Box,
    Typography,
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

const RecruitmentCmm = () => {
    const [formData, setFormData] = useState({
        lamaran: 1,
        interview: 1,
        training: 1,
    });

    const navigate = useNavigate();
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/recruitment")
            .then(res => {
                console.log("Fetch status:", res.status);
                if (!res.ok) throw new Error("Fetch failed with status " + res.status);
                return res.json();
            })
            .then(data => {
                console.log("Data from API:", data);
                setDataList(data);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                alert("Gagal mengambil data dari server: " + err.message);
            });
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseInt(value),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/api/recruitment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to save");
                return res.json();
            })
            .then(data => {
                if (data.data) {
                    setDataList(prev => [data.data, ...prev]);
                    setFormData({ lamaran: 1, interview: 1, training: 1 });
                } else {
                    alert("Gagal menyimpan data");
                }
            })
            .catch(err => {
                console.error("Submit error:", err);
                alert("Gagal menyimpan data ke server");
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

                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Lamaran</InputLabel>
                            <Select
                                name="lamaran"
                                value={formData.lamaran}
                                onChange={handleChange}
                                label="Lamaran"
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
                                onChange={handleChange}
                                label="Interview"
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
                                onChange={handleChange}
                                label="Training"
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
                            {dataList.map(item => (
                                <TableRow key={item.id}>
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

export default RecruitmentCmm;
