import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../components/cmm/cmm.css";

const TotalNewDataAllTeam = () => {
    const navigate = useNavigate();
    const [totalData, setTotalData] = useState(0);

    useEffect(() => {
        const dataAsman = JSON.parse(localStorage.getItem("asman_sdm")) || [];
        const dataMm = JSON.parse(localStorage.getItem("mm_sdm")) || [];

        const total = dataAsman.length + dataMm.length;
        setTotalData(total);
    }, []);

    return (
        <div className="dashboard-container">
            <button className="back-button-with-text" onClick={() => navigate("/cmm")}>
                <IoArrowBack size={18} />
                <span>Beranda</span>
            </button>

            <h2 className="section-title">Total New Data All Team</h2>

            <div className="summary-box">
                <h3>{totalData}</h3>
                <p>Total SDM Direkrut oleh Seluruh Tim</p>
            </div>
        </div>
    );
};

export default TotalNewDataAllTeam;
