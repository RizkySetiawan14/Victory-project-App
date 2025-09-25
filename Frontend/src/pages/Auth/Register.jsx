import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("asman");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: email,  // di backend pakai "username"
                    password,
                    role
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Register gagal");
                return;
            }

            alert(`Akun ${email} berhasil dibuat sebagai ${role}`);
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan server");
        }
    };


    return (
        <div className="auth-wrapper">
            <div className="auth-box">
                <div className="auth-header">
                    <img
                        src="/logo-victory.png"
                        alt="Logo PT Victory International Futures"
                        className="auth-logo"
                    />
                    <h2>Register Laporan KPI</h2>
                </div>

                <form onSubmit={handleRegister} className="auth-form">
                    <input
                        type="text"
                        placeholder="User"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="asman">Asman</option>
                        <option value="mm">MM</option>
                        <option value="cmm">CMM</option>
                        <option value="manajemen">Manajemen</option>
                        <option value="hrd">HRD</option>

                    </select>

                    <button type="submit" className="btn-auth">Register</button>
                </form>

                <p className="auth-footer">
                    Sudah punya akun? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
