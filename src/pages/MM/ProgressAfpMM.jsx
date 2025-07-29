import React, { useEffect, useState } from "react";

const ProgressAfp = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Simulasi ambil data dari backend (nanti kita ganti ke fetch asli)
        const dummyData = [
            {
                namaAfp: "Budi",
                newData: 10,
                namaNasabah: "Siti",
                status: "Up",
                tglTf: "2025-07-20",
                topUp: 1500000,
                progresTerakhir: "Presentasi Produk",
                strategiClosing: "Follow up via WA",
            },
            {
                namaAfp: "Joko",
                newData: 8,
                namaNasabah: "Agus",
                status: "Down",
                tglTf: "2025-07-18",
                topUp: 0,
                progresTerakhir: "Belum minat",
                strategiClosing: "Coba pendekatan ulang",
            },
        ];
        setData(dummyData);
    }, []);

    return (
        <div className="progress-afp-review">
            <h2>Review Laporan Progress AFP</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nama AFP</th>
                        <th>New Data</th>
                        <th>NO</th>
                        <th>Nama Nasabah</th>
                        <th>Status</th>
                        <th>TGL TF Projection</th>
                        <th>Top Up</th>
                        <th>Progres Terakhir Nasabah</th>
                        <th>Strategi Closing</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.namaAfp}</td>
                            <td>{item.newData}</td>
                            <td>{idx + 1}</td>
                            <td>{item.namaNasabah}</td>
                            <td>{item.status}</td>
                            <td>{item.tglTf}</td>
                            <td>{item.topUp.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                            <td>{item.progresTerakhir}</td>
                            <td>{item.strategiClosing}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default ProgressAfp;
