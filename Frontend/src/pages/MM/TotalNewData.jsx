import React, { useEffect, useState } from "react";

const TotalNewData = () => {
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        // Dummy data dari MM
        const mmData = [
            { sumber: "MM", nama: "Agus" },
            { sumber: "MM", nama: "Siti" },
        ];

        // Dummy data dari ASMAN
        const asmanData = [
            { sumber: "ASMAN", nama: "Rudi" },
            { sumber: "ASMAN", nama: "Dewi" },
        ];

        // Gabungkan
        setCombinedData([...mmData, ...asmanData]);
    }, []);

    return (
        <div className="total-new-data-team">
            <h2>Total New SDM Team (MM + ASMAN)</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama SDM Baru</th>
                        <th>Sumber</th>
                    </tr>
                </thead>
                <tbody>
                    {combinedData.map((row, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{row.nama}</td>
                            <td>{row.sumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TotalNewData;
