import React, { useState, useEffect } from "react";


const TargetTriwulanCmm = () => {
    const [nmiPeriode, setNmiPeriode] = useState("");
    const [totalNmi, setTotalNmi] = useState("");
    const [kurangTarget, setKurangTarget] = useState("");

    const kursDollar = 10000; // Kurs sementara
    const targetRupiah = 600000000;

    useEffect(() => {
        const totalNmiNumber = parseFloat(totalNmi.replace(/[^0-9.-]+/g, "")) || 0;
        const targetDollar = targetRupiah / kursDollar;
        const kurang = targetDollar - totalNmiNumber;
        setKurangTarget(kurang.toFixed(2));
    }, [totalNmi]);

    return (
        <div className="target-triwulan-container">
            <h2>Target Triwulan</h2>
            <form>
                <div className="form-group">
                    <label>NMI Periode Ini ($)</label>
                    <input
                        type="text"
                        value={nmiPeriode}
                        onChange={(e) => setNmiPeriode(e.target.value)}
                        placeholder="Masukkan NMI Periode"
                    />
                </div>
                <div className="form-group">
                    <label>Total NMI Q Ini ($)</label>
                    <input
                        type="text"
                        value={totalNmi}
                        onChange={(e) => setTotalNmi(e.target.value)}
                        placeholder="Masukkan Total NMI"
                    />
                </div>
                <div className="form-group">
                    <label>Kurang Target ($)</label>
                    <input type="text" value={kurangTarget} readOnly />
                </div>
            </form>
        </div>
    );
};

export default TargetTriwulanCmm;
