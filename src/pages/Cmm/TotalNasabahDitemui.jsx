import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../components/cmm/cmm.css";

const TotalNasabahDitemui = () => {
    const navigate = useNavigate();
    const [totalNasabah, setTotalNasabah] = useState(0);

    useEffect(() => {
        const dataAsman = JSON.parse(localStorage.getItem("asman_nasabah")) || [];
        const dataMm = JSON.parse(localStorage.getItem("mm_nasabah")) || [];

        const total = dataAsman.length + dataMm.length;
        setTotalNasabah(total);
    }, []);

    return (
        <div className="dashboard-container">
            <button className="back-button-with-text" onClick={() => navigate("/cmm")}>
                <IoArrowBack size={18} />
                <span>Beranda</span>
            </button>

            <h2 className="section-title">Total Nasabah Ditemui</h2>

            <div className="summary-box">
                <h3>{totalNasabah}</h3>
                <p>Nasabah telah ditemui oleh seluruh tim</p>
            </div>
        </div>
    );
};

export default TotalNasabahDitemui;
