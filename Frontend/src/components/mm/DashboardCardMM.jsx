// src/components/DashboardCard.jsx
import React, { useState, useEffect } from "react";
import "../../components/asman/asman.css";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const DashboardCardMM = () => {
  const inputMenus = [
    { title: "Recruitment", path: "/mm/recruitment-mm" },
    { title: "Input SDM Direkrut", path: "/mm/input-sdm-mm" },
    { title: "Na Team", path: "/mm/na-team-mm" },
    { title: "Target Triwulan", path: "/mm/target-triwulan-mm" },
    { title: "Progress AFP", path: "/mm/progress-afp-mm" },
  ];

  const reviewMenus = [
    { title: "Total New Data" },
    { title: "Total Nasabah" }, // ⬅️ samakan dengan backend field
  ];


  // === STATE SDM ===
  const [sdmList, setSdmList] = useState([]);
  const [loadingSdm, setLoadingSdm] = useState(false);
  const [sdmError, setSdmError] = useState(null);

  // === STATE Recruitment ===
  const [recruitmentList, setRecruitmentList] = useState([]);
  const [loadingRecruitment, setLoadingRecruitment] = useState(false);
  const [recruitmentError, setRecruitmentError] = useState(null);

  // === STATE Na Team ===
  const [naTeamList, setNaTeamList] = useState([]);
  const [loadingNaTeam, setLoadingNaTeam] = useState(false);
  const [naTeamError, setNaTeamError] = useState(null);
  const [totalMargin, setTotalMargin] = useState(0);
  const [totalDataNaTeam, setTotalDataNaTeam] = useState(0);

  // === STATE Progress AFP ===
  const [progressList, setProgressList] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [progressError, setProgressError] = useState(null);

  // === STATE Progress Summary ===
  const [progressSummary, setProgressSummary] = useState({ total_new_data: 0, total_nasabah: 0 });
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  // === STATE Target Triwulan === ⬅️ ditambahkan
  const [triwulanList, setTriwulanList] = useState([]);
  const [loadingTriwulan, setLoadingTriwulan] = useState(false);
  const [triwulanError, setTriwulanError] = useState(null);

  useEffect(() => {
    fetchSdm();
    fetchRecruitment();
    fetchNaTeam();
    fetchProgress();
    fetchTriwulan(); // ⬅️ dipanggil juga
    fetchProgressSummary();
  }, []);

  const fetchSdm = async () => {
    setLoadingSdm(true);
    setSdmError(null);
    try {
      const res = await axios.get("http://localhost:8000/api/input-sdm");
      setSdmList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setSdmError("Gagal mengambil data SDM");
      setSdmList([]);
    } finally {
      setLoadingSdm(false);
    }
  };

  const fetchRecruitment = async () => {
    setLoadingRecruitment(true);
    setRecruitmentError(null);
    try {
      const res = await axios.get("http://localhost:8000/api/recruitment");
      setRecruitmentList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setRecruitmentError("Gagal mengambil data Recruitment");
      setRecruitmentList([]);
    } finally {
      setLoadingRecruitment(false);
    }
  };

  const fetchNaTeam = async () => {
    setLoadingNaTeam(true);
    setNaTeamError(null);
    try {
      const res = await axios.get("http://localhost:8000/api/na-teams");
      const list = Array.isArray(res.data) ? res.data : [];
      setNaTeamList(list);

      const total = list.reduce((sum, item) => sum + (parseFloat(item.margin) || 0), 0);
      setTotalMargin(total);
      setTotalDataNaTeam(list.length);
    } catch (err) {
      setNaTeamError("Gagal mengambil data Na Team");
      setNaTeamList([]);
      setTotalMargin(0);
      setTotalDataNaTeam(0);
    } finally {
      setLoadingNaTeam(false);
    }
  };
  const fetchProgress = async () => {
    setLoadingProgress(true);
    setProgressError(null);
    try {
      const res = await axios.get("http://localhost:8000/api/nasabah");
      setProgressList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setProgressError("Gagal mengambil data Progress AFP");
      setProgressList([]);
    } finally {
      setLoadingProgress(false);
    }
  };

  const fetchProgressSummary = async () => {
    setLoadingSummary(true);
    setSummaryError(null);
    try {
      const res = await axios.get("http://localhost:8000/api/asman/progress-afp/summary");
      setProgressSummary(res.data);
    } catch (err) {
      setSummaryError("Gagal mengambil summary Progress AFP");
      setProgressSummary({ total_new_data: 0, total_nasabah: 0 });
    } finally {
      setLoadingSummary(false);
    }
  };

  // fetch Target Triwulan
  const fetchTriwulan = async () => {
    setLoadingTriwulan(true);
    setTriwulanError(null);
    try {
      const res = await axios.get("http://localhost:8000/api/target-triwulan");
      setTriwulanList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setTriwulanError("Gagal mengambil data Target Triwulan");
      setTriwulanList([]);
    } finally {
      setLoadingTriwulan(false);
    }
  };

  const formatDollar = (value) => {
    if (value === null || value === undefined) return "-";
    return `$${Number(value).toLocaleString("en-US")}`;
  };

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Box className="dashboard-cmm-container">
      <Typography variant="h4" gutterBottom className="dashboard-cmm-title">
        MM WEEKLY REPORT
      </Typography>

      <Grid container spacing={2}>
        {inputMenus.map((menu, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card className="card-cmm">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {menu.title}
                </Typography>

                {/* === Input SDM === */}
                {menu.title === "Input SDM Direkrut" ? (
                  // ... (tidak diubah)
                  <>
                    {loadingSdm ? (
                      <CircularProgress size={24} />
                    ) : sdmError ? (
                      <Typography color="error">{sdmError}</Typography>
                    ) : sdmList.length === 0 ? (
                      <Typography>Belum ada data</Typography>
                    ) : (
                      <Box sx={{ maxHeight: 180, overflow: "auto", mb: 1 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ backgroundColor: "#003366" }}>
                              <TableCell sx={{ color: "white", }}>No</TableCell>
                              <TableCell sx={{ color: "white", }}>Nama</TableCell>
                              <TableCell sx={{ color: "white", }}>Tanggal Masuk</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {sdmList.slice(0, 5).map((row, i) => (
                              <TableRow key={row.id || i}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{row.nama_sdm_direkrut}</TableCell>
                                <TableCell>{formatTanggal(row.tanggal_masuk)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                    <Button variant="contained" fullWidth component={Link} to={menu.path}>
                      Lihat Semua
                    </Button>
                  </>
                ) : menu.title === "Recruitment" ? (

                  <>
                    {loadingRecruitment ? (
                      <CircularProgress size={24} />
                    ) : recruitmentError ? (
                      <Typography color="error">{recruitmentError}</Typography>
                    ) : recruitmentList.length === 0 ? (
                      <Typography>Belum ada data</Typography>
                    ) : (
                      <Box sx={{ maxHeight: 180, overflow: "auto", mb: 1 }}>
                        <Table size="small">
                          <TableBody>
                            {recruitmentList.slice(0, 5).map((row, i) => (
                              <TableRow key={row.id || i}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{row.lamaran}</TableCell>
                                <TableCell>{row.interview}</TableCell>
                                <TableCell>{row.training}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                    <Button variant="contained" fullWidth component={Link} to={menu.path}>
                      Lihat Semua
                    </Button>
                  </>
                ) : menu.title === "Na Team" ? (
                  // ... (tidak diubah)
                  <>
                    {loadingNaTeam ? (
                      <CircularProgress size={24} />
                    ) : naTeamError ? (
                      <Typography color="error">{naTeamError}</Typography>
                    ) : naTeamList.length === 0 ? (
                      <Typography>Belum ada data</Typography>
                    ) : (
                      <Box sx={{ maxHeight: 180, overflow: "auto", mb: 1 }}>
                        <Table size="small">
                          <TableBody>
                            {naTeamList.slice(0, 5).map((row, i) => (
                              <TableRow key={row.id || i}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{row.nama_afp}</TableCell>
                                <TableCell>{formatDollar(row.margin)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                    <Button variant="contained" fullWidth component={Link} to={menu.path}>
                      Lihat Semua
                    </Button>
                  </>
                ) : menu.title === "Target Triwulan" ? (
                  // === Target Triwulan === ⬅️ sudah fix dengan tanggal
                  <>
                    {loadingTriwulan ? (
                      <CircularProgress size={24} />
                    ) : triwulanError ? (
                      <Typography color="error">{triwulanError}</Typography>
                    ) : triwulanList.length === 0 ? (
                      <Typography>Belum ada data</Typography>
                    ) : (
                      <Box sx={{ maxHeight: 180, overflow: "auto", mb: 1 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ backgroundColor: "#003366" }}>
                              <TableCell sx={{ color: "white", }}>NMI Per Bulan</TableCell>
                              <TableCell sx={{ color: "white", }}>Total NMI</TableCell>
                              <TableCell sx={{ color: "white", }}>Tanggal</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {triwulanList.slice(0, 5).map((row, i) => (
                              <TableRow key={row.id || i}>
                                <TableCell>{row.nmi_per_bulan}</TableCell>
                                <TableCell>{row.total_nmi}</TableCell>
                                <TableCell>{formatTanggal(row.tanggal)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                    <Button variant="contained" fullWidth component={Link} to={menu.path}>
                      Lihat Semua
                    </Button>
                  </>
                ) : menu.title === "Progress AFP" ? (
                  <>
                    {loadingProgress ? (
                      <CircularProgress size={24} />
                    ) : progressError ? (
                      <Typography color="error">{progressError}</Typography>
                    ) : progressList.length === 0 ? (
                      <Typography>Belum ada data</Typography>
                    ) : (
                      <Box sx={{ maxHeight: 400, overflow: "auto", mb: 1 }}>
                        {/* Grouping berdasarkan nama_afp */}
                        {Object.keys(
                          progressList.reduce((acc, item) => {
                            if (!acc[item.nama_afp]) {
                              acc[item.nama_afp] = [];
                            }
                            acc[item.nama_afp].push(item);
                            return acc;
                          }, {})
                        ).map((afp, idx) => {
                          const grouped = progressList.filter(
                            (row) => row.nama_afp === afp
                          );
                          return (
                            <Box key={idx} sx={{ mb: 3 }}>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
                              >
                                {afp}
                              </Typography>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell sx={{ color: "white", }}>No</TableCell>
                                    <TableCell sx={{ color: "white", }}>Nama Nasabah</TableCell>
                                    <TableCell sx={{ color: "white", }}>New Data</TableCell>
                                    <TableCell sx={{ color: "white", }}>Status</TableCell>
                                    <TableCell sx={{ color: "white", }}>Tgl TF Projection</TableCell>
                                    <TableCell sx={{ color: "white", }}>Top Up (USD)</TableCell>
                                    <TableCell sx={{ color: "white", }}>Progress Terakhir</TableCell>
                                    <TableCell sx={{ color: "white", }}>Strategi Closing</TableCell>

                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {grouped.slice(0, 5).map((row, i) => (
                                    <TableRow key={row.id || i}>
                                      <TableCell>{i + 1}</TableCell>
                                      <TableCell>{row.nama_nasabah}</TableCell>
                                      <TableCell>{row.new_data}</TableCell>
                                      <TableCell>{row.status}</TableCell>
                                      <TableCell>{formatTanggal(row.tgl_tf_projection)}</TableCell>
                                      <TableCell>{formatDollar(row.top_up_usd)}</TableCell>
                                      <TableCell>{row.progress_terakhir}</TableCell>
                                      <TableCell>{row.strategi_closing}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                    <Button variant="contained" fullWidth component={Link} to={menu.path}>
                      Lihat Semua
                    </Button>
                  </>

                ) : (
                  <Button variant="contained" fullWidth component={Link} to={menu.path}>
                    BUKA
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Review menus */}
        {reviewMenus.map((menu, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={`r-${idx}`}>
            <Card className="card-cmm">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {menu.title}
                </Typography>

                {loadingSummary ? (
                  <CircularProgress size={24} />
                ) : summaryError ? (
                  <Typography color="error">{summaryError}</Typography>
                ) : menu.title === "Total New Data" ? (
                  <Typography variant="h4" color="primary">
                    {progressSummary.total_new_data}
                  </Typography>
                ) : menu.title === "Total Nasabah" ? (
                  <Typography variant="h4" color="secondary">
                    {progressSummary.total_nasabah}
                  </Typography>

                ) : null}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardCardMM;

