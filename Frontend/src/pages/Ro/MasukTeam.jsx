// src/pages/ro/MasukTeam.jsx
import React, { useState } from "react";

const MasukTeam = () => {
    const [masuk_team, setMasukTeam] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8000/api/ro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ masuk_team }),
        });
        alert("Data Masuk Team berhasil disimpan!");
    };

    return (
        <div className="page-container">
            <h2>Input Masuk Team</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={masuk_team}
                    onChange={(e) => setMasukTeam(e.target.value)}
                />
                <button type="submit">Simpan</button>
            </form>
        </div>
    );
};

export default MasukTeam;
