import React, { useState } from "react";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

const InputSdmMM = () => {
    const [data, setData] = useState([]);
    const [sdm, setSdm] = useState("");
    const [perekut, setPerekut] = useState("");

    const handleSubmit = () => {
        if (sdm.trim() && perekut.trim()) {
            setData([...data, { sdm, perekut }]);
            setSdm("");
            setPerekut("");
        }
    };

    return (
        <Box
            sx={{
                px: 4,
                py: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
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
                    maxWidth: 600,
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Input SDM Baru
                </Typography>
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

            {/* Tabel review */}
            {data.length > 0 && (
                <Box sx={{ width: "100%", maxWidth: 800, overflowX: "auto" }}>
                    <Table sx={{ minWidth: 600 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="left"
                                    sx={{
                                        backgroundColor: "#FFD700",
                                        color: "#000",
                                        borderLeft: "4px solid #FFD700",
                                        fontWeight: "bold",
                                    }}
                                >
                                    NO
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        backgroundColor: "#FFD700",
                                        color: "#000",
                                        borderLeft: "4px solid #FFD700",
                                        fontWeight: "bold",
                                    }}
                                >
                                    SDM Baru
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        backgroundColor: "#FFD700",
                                        color: "#000",
                                        borderLeft: "4px solid #FFD700",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Perekrut
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        align="left"
                                        sx={{ borderLeft: "4px solid #FFD700" }}
                                    >
                                        {index + 1}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderLeft: "4px solid #FFD700" }}
                                    >
                                        {item.sdm}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ borderLeft: "4px solid #FFD700" }}
                                    >
                                        {item.perekut}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}
        </Box>
    );
};

export default InputSdmMM;
