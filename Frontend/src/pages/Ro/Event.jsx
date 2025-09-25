// src/pages/ro/Event.jsx
import React, { useState } from "react";

const Event = () => {
    const [event, setEvent] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8000/api/ro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ event }),
        });
        alert("Data Event berhasil disimpan!");
    };

    return (
        <div className="page-container">
            <h2>Input Event</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                />
                <button type="submit">Simpan</button>
            </form>
        </div>
    );
};

export default Event;
