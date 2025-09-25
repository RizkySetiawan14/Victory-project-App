// src/components/ro/RoDashboard.jsx
import React, { useEffect, useState } from "react";
import RoTable from "./RoTable";
import "./ro.css";

const RoDashboard = () => {
    const [data, setData] = useState([]);

    // Fetch dari backend
    useEffect(() => {
        fetch("http://localhost:8000/api/ro")
            .then((res) => res.json())
            .then((result) => setData(result))
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <div className="ro-dashboard">
            <h1>Dashboard RO</h1>
            <RoTable data={data} />
        </div>
    );
};

export default RoDashboard;
