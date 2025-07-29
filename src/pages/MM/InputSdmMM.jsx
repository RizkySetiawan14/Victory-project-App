import React, { useState } from "react";
import './InputSdmMM.css';
import {
    Box,
    Button,
    TextField,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";

const InputSdmMM = () => {
    const [sdm, setSdm] = useState("");
    const [perekut, setPerekut] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = () => {
        if (!sdm || !perekut) return;
        setData([...data, { sdm, perekut }]);
        setSdm("");
        setPerekut("");
    };

    return (
        <Box
            sx={{
                px: 4,
                py: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",   // Pastikan konten mulai dari kiri
                textAlign: "left",          // Pastikan teks tidak center
                width: "100%",
            }}
        >
            {/* Form input */}
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    mb: 4,
                }}
            >
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Input SDM Baru
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Nama SDM Baru"
                        variant="outlined"
                        value={sdm}
                        onChange={(e) => setSdm(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Perekrut"
                        variant="outlined"
                        value={perekut}
                        onChange={(e) => setPerekut(e.target.value)}
                        fullWidth
                    />
                    <Button type="submit" variant="contained">
                        SIMPAN DATA
                    </Button>
                </Box>
            </Box>

            {/* Tabel review */}
            <Box sx={{ width: "100%", overflowX: "auto" }}>
                <Table sx={{ minWidth: 600 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                sx={{ backgroundColor: "#002b5b", color: "#fff" }}
                            >
                                NO
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ backgroundColor: "#002b5b", color: "#fff" }}
                            >
                                SDM Baru
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ backgroundColor: "#002b5b", color: "#fff" }}
                            >
                                Perekrut
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{item.sdm}</TableCell>
                                <TableCell align="center">{item.perekut}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default InputSdmMM;
