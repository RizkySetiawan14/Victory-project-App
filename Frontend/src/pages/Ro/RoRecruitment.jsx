// src/pages/ro/Recruitment.jsx
import React, { useState } from "react";

const RoRecruitment = () => {
    const [form, setForm] = useState({
        lamaran_masuk: 0,
        interview: 0,
        training: 0,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8000/api/ro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        alert("Data Recruitment berhasil disimpan!");
    };

    return (
        <div className="page-container">
            <h2>Input Recruitment</h2>
            <form onSubmit={handleSubmit}>
                <label>Lamaran Masuk</label>
                <input type="number" name="lamaran_masuk" value={form.lamaran_masuk} onChange={handleChange} />

                <label>Interview</label>
                <input type="number" name="interview" value={form.interview} onChange={handleChange} />

                <label>Training</label>
                <input type="number" name="training" value={form.training} onChange={handleChange} />

                <button type="submit">Simpan</button>
            </form>
        </div>
    );
};

export default RoRecruitment;
