// src/pages/ro/MarketClosing.jsx
import React, { useState } from "react";

const MarketClosing = () => {
    const [market_closing, setMarketClosing] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8000/api/ro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ market_closing }),
        });
        alert("Data Market Closing berhasil disimpan!");
    };

    return (
        <div className="page-container">
            <h2>Input Market Closing</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={market_closing}
                    onChange={(e) => setMarketClosing(e.target.value)}
                />
                <button type="submit">Simpan</button>
            </form>
        </div>
    );
};

export default MarketClosing;
