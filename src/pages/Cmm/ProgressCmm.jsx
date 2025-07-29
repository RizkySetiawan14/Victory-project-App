import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "../../components/cmm/cmm.css";

const ProgressCmm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [form, setForm] = useState({ mm: "", mgm: false, ro: false });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAdd = () => {
        if (form.mm.trim() === "") return;

        const newEntry = {
            no: data.length + 1,
            mm: form.mm,
            mgm: form.mgm,
            ro: form.ro,
        };
        setData([...data, newEntry]);
        setForm({ mm: "", mgm: false, ro: false });
    };

    return (
        <div className="dashboard-container">
            {/* Tombol Kembali */}
            <button className="back-button-with-text" onClick={() => navigate("/cmm")}>
                <IoArrowBack size={18} />
                <span>Beranda</span>
            </button>

            <h2 className="section-title">Progress MM</h2>

            <div className="table-container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-grid">
                        <div>
                            <label>Nama MM</label>
                            <input
                                type="text"
                                name="mm"
                                value={form.mm}
                                onChange={handleChange}
                                placeholder="Masukkan Nama MM"
                            />
                        </div>

                        <div className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="mgm"
                                    checked={form.mgm}
                                    onChange={handleChange}
                                />
                                MGM
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    name="ro"
                                    checked={form.ro}
                                    onChange={handleChange}
                                />
                                RO
                            </label>
                        </div>
                    </div>

                    <button type="button" onClick={handleAdd}>
                        Tambah Data
                    </button>
                </form>
            </div>

            <div className="table-container">
                <h3>Total SDM Baru: {data.length}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama MM</th>
                            <th>MGM</th>
                            <th>RO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.no}</td>
                                <td>{entry.mm}</td>
                                <td>{entry.mgm ? "✓" : "-"}</td>
                                <td>{entry.ro ? "✓" : "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProgressCmm;
