import React from "react";

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div style={{ padding: 20 }}>
            <h1>Dashboard</h1>
            <p>Halo, {user?.name} ({user?.role})</p>
            <p>Team ID: {user?.team_id}</p>
            <p>Parent ID: {user?.parent_id}</p>
        </div>
    );
};

export default Dashboard;
