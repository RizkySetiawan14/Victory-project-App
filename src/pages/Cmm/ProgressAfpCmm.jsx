import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../components/cmm/cmm.css";

const ReviewProgressAfpCmm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const dataAsman = JSON.parse(localStorage.getItem("asman_progress_afp")) || [];
        const dataMm = JSON.parse(localStorage.getItem("mm_progress_afp")) || [];

        const combined = [...dataAsman, ...dataMm];
        setData(combined);
    }, []);

    return (
        <div className="dashboard-container">
            <button className="back-button-with-text" onClick={() => navigate("/cmm")}>
                <IoArrowBack size={18} />
                <span>Beranda</span>
            </button>

            <h2 className="section-title">Review Progress AFP Seluruh Tim</h2>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nama AFP</th>
                            <th>New Data</th>
                            <th>No </th>
                            <th>Nama Nasabah</th>
                            <th>Status</th>
                            <th>Tgl TF Projection</th>
                            <th>Top Up</th>
                            <th>Progres Terakhir</th>
                            <th>Strategi Closing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="9" style={{ textAlign: "center" }}>Belum ada data.</td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.namaAfp}</td>
                                    <td>{item.newData}</td>
                                    <td>{item.noNasabah}</td>
                                    <td>{item.namaNasabah}</td>
                                    <td>{item.status}</td>
                                    <td>{item.tglTf}</td>
                                    <td>{item.topUp}</td>
                                    <td>{item.progres}</td>
                                    <td>{item.strategi}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewProgressAfpCmm;
