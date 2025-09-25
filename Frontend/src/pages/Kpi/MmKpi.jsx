// src/pages/mm/MmKpi.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Paper,
    Button,
} from "@mui/material";

const initialData = [
    { no: 1, area: "DISIPLIN KERJA", poin: "hari masuk kerja dalam 1 minggu", bobot: 5, target: 5, satuan: "HARI", keterangan: "Max" },
    { no: 2, area: "SDM", poin: "penambahan sdm team per minggu baik dari RO maupun MGM", bobot: 10, target: 2, satuan: "ORANG", keterangan: "Max" },
    { no: 3, area: "DATABASE NASABAH", poin: "jumlah new database nasabah per minggu", bobot: 10, target: 25, satuan: "ORANG", keterangan: "Max" },
    { no: 4, area: "NEW HOT PROSPEK", poin: "jumlah new hot prospek yang muncul dalam 1 minggu", bobot: 10, target: 5, satuan: "ORANG", keterangan: "Max" },
    { no: 5, area: "NEW PROJECTION", poin: "jumlah new projection dari hot prospek minggu sebelumnya", bobot: 25, target: 1, satuan: "ORANG", keterangan: "Max" },
    { no: 6, area: "NMI", poin: "jumlah margin in plus inject dikurangi WD dalam 1 minggu", bobot: 40, target: 25, satuan: "JUTA", keterangan: "Max" },
];

const MmKpi = () => {
    const [rows, setRows] = useState(initialData.map((row) => ({ ...row, hasil: 0 })));
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/kpi", {
                params: { role: "mm", start_date: startDate, end_date: endDate },
            });

            // asumsi API balikin array hasil sesuai nomor KPI
            const hasilData = res.data.data;

            const updatedRows = rows.map((row) => {
                const match = hasilData.find((d) => d.no === row.no);
                return { ...row, hasil: match ? match.hasil : 0 };
            });

            setRows(updatedRows);
        } catch (err) {
            console.error("Error fetching KPI data:", err);
        }
    };

    const calculateSkor = (hasil, target) => {
        if (target <= 0) return 0;
        return Math.min((hasil / target) * 100, 100);
    };

    const calculateSkorAkhir = (skor, bobot) => {
        return (skor * bobot) / 100;
    };

    const totalSkor = rows.reduce((sum, row) => {
        const skor = calculateSkor(row.hasil, row.target);
        const skorAkhir = calculateSkorAkhir(skor, row.bobot);
        return sum + skorAkhir;
    }, 0);

    const getKeteranganSkor = (skor) => {
        if (skor >= 71) return "KINERJA TEAM EFEKTIF DAN TEPAT SASARAN";
        if (skor >= 41) return "KINERJA TEAM KURANG EFEKTIF";
        return "KINERJA TEAM BURUK DAN PERLU EVALUASI MENYELURUH";
    };

    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>
                KPI Marketing Manager
            </Typography>

            {/* Filter tanggal */}
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    type="date"
                    label="Start Date"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <TextField
                    type="date"
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Button variant="contained" onClick={fetchData}>
                    Load Data
                </Button>
            </Box>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Area Kinerja Utama</TableCell>
                            <TableCell>Poin Penilaian</TableCell>
                            <TableCell>Bobot KPI (%)</TableCell>
                            <TableCell>Target KPI</TableCell>
                            <TableCell>Satuan</TableCell>
                            <TableCell>Hasil</TableCell>
                            <TableCell>Satuan</TableCell>
                            <TableCell>Keterangan</TableCell>
                            <TableCell>Skor</TableCell>
                            <TableCell>Skor Akhir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            const skor = calculateSkor(row.hasil, row.target);
                            const skorAkhir = calculateSkorAkhir(skor, row.bobot);
                            return (
                                <TableRow key={row.no}>
                                    <TableCell>{row.no}</TableCell>
                                    <TableCell>{row.area}</TableCell>
                                    <TableCell>{row.poin}</TableCell>
                                    <TableCell>{row.bobot}</TableCell>
                                    <TableCell>{row.target}</TableCell>
                                    <TableCell>{row.satuan}</TableCell>
                                    <TableCell>{row.hasil}</TableCell>
                                    <TableCell>{row.satuan}</TableCell>
                                    <TableCell>{row.keterangan}</TableCell>
                                    <TableCell>{skor.toFixed(2)}</TableCell>
                                    <TableCell>{skorAkhir.toFixed(2)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>

            <Box mt={2}>
                <Typography variant="h6">
                    Total Skor KPI: {totalSkor.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                    {getKeteranganSkor(totalSkor)}
                </Typography>
            </Box>
        </Box>
    );
};

export default MmKpi;
