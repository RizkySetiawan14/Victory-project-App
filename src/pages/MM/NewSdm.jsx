import React, { useEffect, useState } from "react";

const NewSdm = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Dummy data, nanti diganti dengan data global atau dari backend
        const dummyData = [
            { no: 1, nama: "Agus", perekrut: "RO" },
            { no: 2, nama: "Siti", perekrut: "MGM" },
        ];
        setData(dummyData);
    }, []);

    return (
        <div className="new-sdm-review">
            <h2>New SDM Review (MM)</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama SDM Baru</th>
                        <th>Perekrut</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.no}</td>
                            <td>{row.nama}</td>
                            <td>{row.perekrut}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewSdm;
