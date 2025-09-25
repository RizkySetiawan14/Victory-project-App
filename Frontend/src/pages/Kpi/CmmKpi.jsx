// src/pages/mm/MmKpi.jsx
import React, { useState } from "react";
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
} from "@mui/material";

const initialData = [
    {
        no: 1,
        area: "DISIPLIN KERJA",
        poin: "hari masuk kerja dalam 1 minggu",
        bobot: 5,
        target: 5,
        satuan: "HARI",
        keterangan: "Max",
    },
    {
        no: 2,
        area: "SDM",
        poin: "penambahan sdm team per minggu baik dari RO maupun MGM",
        bobot: 10,
        target: 2,
        satuan: "ORANG",
        keterangan: "Max",
    },
    {
        no: 3,
        area: "DATABASE NASABAH",
        poin: "jumlah new database nasabah per minggu",
        bobot: 10,
        target: 25,
        satuan: "ORANG",
        keterangan: "Max",
    },
    {
        no: 4,
        area: "NEW HOT PROSPEK",
        poin: "jumlah new hot prospek yang muncul dalam 1 minggu",
        bobot: 10,
        target: 5,
        satuan: "ORANG",
        keterangan: "Max",
    },
    {
        no: 5,
        area: "NEW PROJECTION",
        poin: "jumlah new projection yang muncul dari hot prospek minggu sebelumnya",
        bobot: 25,
        target: 1,
        satuan: "ORANG",
        keterangan: "Max",
    },
    {
        no: 6,
        area: "NMI",
        poin: "jumlah margin in plus inject dikurangi WD dalam 1 minggu sebelumnya",
        bobot: 40,
        target: 25,
        satuan: "JUTA",
        keterangan: "Max",
    },
];

const CmmKpi = () => {
    const [rows, setRows] = useState(
        initialData.map((row) => ({ ...row, hasil: 0 }))
    );

    const handleInputChange = (index, value) => {
        const newRows = [...rows];
        newRows[index].hasil = Number(value) || 0;
        setRows(newRows);
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
                KPI Marketing Manager Per Minggu
            </Typography>
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
                            <TableCell>Hasil Minggu Lalu</TableCell>
                            <TableCell>Satuan</TableCell>
                            <TableCell>Keterangan</TableCell>
                            <TableCell>Skor</TableCell>
                            <TableCell>Skor Akhir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
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
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={row.hasil}
                                            onChange={(e) =>
                                                handleInputChange(index, e.target.value)
                                            }
                                            size="small"
                                        />
                                    </TableCell>
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
                <Typography variant="h6">Total Skor KPI: {totalSkor.toFixed(2)}</Typography>
                <Typography variant="body1">
                    {getKeteranganSkor(totalSkor)}
                </Typography>
            </Box>
        </Box>
    );
};

export default CmmKpi;
