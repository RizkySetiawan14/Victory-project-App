// src/components/ro/RoTable.jsx
import React from "react";

const RoTable = ({ data }) => {
    return (
        <table className="ro-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Recruitment (Lamaran Masuk)</th>
                    <th>Recruitment (Interview)</th>
                    <th>Recruitment (Training)</th>
                    <th>Masuk Team</th>
                    <th>Market Closing</th>
                    <th>Event</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.lamaran_masuk}</td>
                            <td>{item.interview}</td>
                            <td>{item.training}</td>
                            <td>{item.masuk_team}</td>
                            <td>{item.market_closing}</td>
                            <td>{item.event}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>
                            Tidak ada data
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default RoTable;
