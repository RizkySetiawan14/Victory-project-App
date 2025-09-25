// src/pages/kpi/AsmanKpi.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    CircularProgress,
    Paper,
    Grid,
} from "@mui/material";

const AsmanKpi = () => {
    const [sdmList, setSdmList] = useState([]);
    const [recruitmentList, setRecruitmentList] = useState([]);
    const [naTeamList, setNaTeamList] = useState([]);
    const [progressSummary, setProgressSummary] = useState({});
    const [progressList, setProgressList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [sdmRes, recRes, naRes, progSumRes, progRes] = await Promise.all([
                    axios.get("http://localhost:8000/api/input-sdm"),
                    axios.get("http://localhost:8000/api/recruitment"),
                    axios.get("http://localhost:8000/api/na-teams"),
                    axios.get("http://localhost:8000/api/asman/progress-afp/summary"),
                    axios.get("http://localhost:8000/api/nasabah"),
                ]);

                setSdmList(sdmRes.data || []);
                setRecruitmentList(recRes.data || []);
                setNaTeamList(naRes.data || []);
                setProgressSummary(progSumRes.data || {});
                setProgressList(progRes.data || []);
            } catch (err) {
                console.error("Gagal ambil KPI Asman:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    // === Hitung KPI ===
    const totalSDM = sdmList.length;

    const totalLamaran = recruitmentList.reduce((sum, r) => sum + (parseInt(r.lamaran) || 0), 0);
    const totalTraining = recruitmentList.reduce((sum, r) => sum + (parseInt(r.training) || 0), 0);
    const recruitmentRate = totalLamaran > 0 ? ((totalTraining / totalLamaran) * 100).toFixed(2) : 0;

    const totalNMI = naTeamList.reduce((sum, n) => sum + (parseFloat(n.margin) || 0), 0);
    const kursUSD = 16000;
    const targetIDR = 300_000_000;
    const targetUSD = targetIDR / kursUSD;
    const capaianTarget = targetUSD > 0 ? ((totalNMI / targetUSD) * 100).toFixed(2) : 0;

    const totalNewData = progressSummary.total_new_data || 0;
    const nasabahDitemui = progressSummary.nasabah_ditemui || 0;
    const totalTopUp = progressList.reduce((sum, p) => sum + (parseFloat(p.top_up_usd) || 0), 0);

    // === Data Tabel KPI ===
    const kpiData = [
        {
            no: 1,
            area: "DISIPLIN KERJA",
            poin: "Hari masuk kerja dalam 1 minggu",
            bobot: 5,
            target: 5,
            satuan: "HARI",
            hasil: 5, // contoh default
        },
        {
            no: 2,
            area: "SDM",
            poin: "Penambahan SDM team per minggu baik dari RO maupun MGM",
            bobot: 10,
            target: 2,
            satuan: "ORANG",
            hasil: totalSDM,
        },
        {
            no: 3,
            area: "DATABASE NASABAH",
            poin: "Jumlah new database nasabah per minggu",
            bobot: 10,
            target: 25,
            satuan: "ORANG",
            hasil: totalNewData,
        },
        {
            no: 4,
            area: "NEW HOT PROSPEK",
            poin: "Jumlah new hot prospek yang muncul dalam 1 minggu",
            bobot: 10,
            target: 5,
            satuan: "ORANG",
            hasil: nasabahDitemui,
        },
        {
            no: 5,
            area: "NEW PROJECTION",
            poin: "Jumlah new projection yang muncul dari hot prospek minggu sebelumnya",
            bobot: 25,
            target: 1,
            satuan: "ORANG",
            hasil: totalTraining,
        },
        {
            no: 6,
            area: "NMI",
            poin: "Jumlah margin in plus inject dikurangi WD dalam 1 minggu sebelumnya",
            bobot: 40,
            target: 25,
            satuan: "JUTA",
            hasil: parseFloat(totalNMI / 1_000_000).toFixed(2),
        },
    ];

    // === Total Skor KPI ===
    const totalSkor = kpiData.reduce((sum, row) => {
        const skor = row.target > 0 ? (row.hasil / row.target) * row.bobot : 0;
        return sum + skor;
    }, 0).toFixed(2);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
                KPI CHIEF MARKETING MANAGER PER MINGGU
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <Paper elevation={3} sx={{ overflowX: "auto", mb: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell align="center"><strong>No</strong></TableCell>
                                    <TableCell align="center"><strong>Area Kinerja Utama</strong></TableCell>
                                    <TableCell align="center"><strong>Poin Penilaian</strong></TableCell>
                                    <TableCell align="center"><strong>Bobot KPI (%)</strong></TableCell>
                                    <TableCell align="center"><strong>Target KPI</strong></TableCell>
                                    <TableCell align="center"><strong>Satuan</strong></TableCell>
                                    <TableCell align="center"><strong>Hasil Minggu Ini</strong></TableCell>
                                    <TableCell align="center"><strong>Satuan</strong></TableCell>
                                    <TableCell align="center"><strong>Keterangan</strong></TableCell>
                                    <TableCell align="center"><strong>Skor</strong></TableCell>
                                    <TableCell align="center"><strong>Skor Akhir</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {kpiData.map((row) => {
                                    const skor = row.target > 0 ? ((row.hasil / row.target) * row.bobot).toFixed(2) : 0;
                                    return (
                                        <TableRow key={row.no}>
                                            <TableCell align="center">{row.no}</TableCell>
                                            <TableCell>{row.area}</TableCell>
                                            <TableCell>{row.poin}</TableCell>
                                            <TableCell align="center">{row.bobot}</TableCell>
                                            <TableCell align="center">{row.target}</TableCell>
                                            <TableCell align="center">{row.satuan}</TableCell>
                                            <TableCell align="center">{row.hasil}</TableCell>
                                            <TableCell align="center">{row.satuan}</TableCell>
                                            <TableCell align="center">Max</TableCell>
                                            <TableCell align="center">{(row.hasil / row.target * 100).toFixed(0)}</TableCell>
                                            <TableCell align="center">{skor}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>

                    {/* Footer Section */}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 2, border: "1px solid #ddd", backgroundColor: "#ffffcc" }}>
                                <Typography variant="body2"><strong>Keterangan:</strong></Typography>
                                <Typography variant="body2">Max = Semakin besar nilai/skor semakin baik</Typography>
                                <Typography variant="body2">Min = Semakin kecil nilai/skor semakin baik</Typography>
                                <Typography variant="body2" color="red">GENERAL ADVISE</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Box sx={{ p: 1, backgroundColor: "#d9ead3", textAlign: "center", borderRadius: 1 }}>
                                    <Typography variant="body2"><strong>Skor KPI: {totalSkor}</strong></Typography>
                                </Box>
                                <Box sx={{ p: 1, backgroundColor: "#d9d2e9", textAlign: "center", borderRadius: 1 }}>
                                    <Typography variant="body2"><strong>ACTUAL NMI MINGGUAN</strong></Typography>
                                    <Typography variant="body2">-</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default AsmanKpi;
