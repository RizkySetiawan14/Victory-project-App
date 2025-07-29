import React, { useEffect, useState } from "react";
import "./NasabahDitemui.css";

const dummyProgressAfpAsman = [
    { namaAfp: "Andi", newData: 12 },
    { namaAfp: "Rina", newData: 8 },
    { namaAfp: "Budi", newData: 5 },
];

const NasabahDitemui = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Simulasi pengambilan data dari Progress AFP milik ASMAN
        setData(dummyProgressAfpAsman);
    }, []);

    return (
        <div className="nasabah-ditemui-container">
            <h2>Total Nasabah Ditemui</h2>
            <table>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>Nama AFP</th>
                        <th>New Data</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.namaAfp}</td>
                            <td>{row.newData}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NasabahDitemui;
