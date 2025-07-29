import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../components/cmm/cmm.css";

const TargetTriwulanCmm = () => {
    const navigate = useNavigate();
    const [kurs, setKurs] = useState("");
    const [nmiPeriode, setNmiPeriode] = useState("");
    const [totalNmi, setTotalNmi] = useState("");

    const parseNumber = (value) => parseFloat(value) || 0;

    const kurangTarget = () => {
        const totalTargetIDR = 600000000; // target 600 juta
        const kursVal = parseNumber(kurs);
        const totalNmiVal = parseNumber(totalNmi);

        if (!kursVal) return 0;

        const targetUSD = totalTargetIDR / kursVal;
        return Math.max(0, targetUSD - totalNmiVal).toFixed(2);
    };

    return (
        <div className="dashboard-container">
            {/* Tombol Kembali */}
            <button className="back-button-with-text" onClick={() => navigate("/cmm")}>
                <IoArrowBack size={18} />
                <span>Beranda</span>
            </button>

            <h2 className="section-title">Target Triwulan - CMM</h2>

            <div className="table-container">
                <form>
                    <div className="form-grid">
                        <div>
                            <label>Kurs Dollar Saat Ini (Rp)</label>
                            <input
                                type="number"
                                value={kurs}
                                onChange={(e) => setKurs(e.target.value)}
                                placeholder="Misal: 15500"
                            />
                        </div>

                        <div>
                            <label>NMI Periode Bulan Ini ($)</label>
                            <input
                                type="number"
                                value={nmiPeriode}
                                onChange={(e) => setNmiPeriode(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Total NMI Bulan Ini ($)</label>
                            <input
                                type="number"
                                value={totalNmi}
                                onChange={(e) => setTotalNmi(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Kurang Target ($)</label>
                            <input
                                type="text"
                                value={kurangTarget()}
                                disabled
                                style={{ backgroundColor: "#f0f0f0" }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TargetTriwulanCmm;
