import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const roleRedirects = {
        asman: "/asman",
        mm: "/mm",
        cmm: "/cmm",
        manajemen: "/manajemen",
        hrd: "/kpi/summary",
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login gagal");
                return;
            }

            // simpan user ke localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
            if (onLogin) onLogin(data.user);

            alert(`Login berhasil sebagai ${data.user.role}`);

            // redirect otomatis
            navigate(roleRedirects[data.user.role] || "/login");
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
                    <h2>LOGIN LAPORAN KPI</h2>
                </div>

                <form onSubmit={handleLogin} className="auth-form">
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="btn-auth">Login</button>
                </form>

                <p className="auth-footer">
                    Belum punya akun? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
