// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Login & Register
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./utils/PrivateRoute";



// ========================== ASMAN ==========================
import AsmanLayout from "./layout/AsmanLayout";
import DashboardCard from "./components/asman/DashboardCard";
import InputSDM from "./pages/Asman/InputSDM";
import Recruitment from "./pages/Asman/Recruitment";
import NaTeam from "./pages/Asman/NaTeam";
import ProgressAfp from "./pages/Asman/ProgressAfp";
import NasabahForm from "./pages/Asman/NasabahForm";
import TargetTriwulan from "./pages/Asman/TargetTriwulan";

// ========================== MM ==========================
import MMLayout from "./layout/MMLayout";
import DashboardCardMM from "./components/mm/DashboardCardMM";
import InputSdmMM from "./pages/MM/InputSdmMM";
import RecruitmentMm from "./pages/MM/RecruitmentMm";
import NaTeamMm from "./pages/MM/NaTeamMm";
import ProgressAfpMM from "./pages/MM/ProgressAfpMM";
import NasabahFormMm from "./pages/MM/NasabahFormMm";
import TargetTriwulanMm from "./pages/MM/TargetTriwulanMm";

// ========================== CMM ==========================
import LayoutCmm from "./layout/LayoutCmm";
import DashboardCmm from "./components/cmm/DashboardCmm";
import InputSdmCmm from "./pages/Cmm/InputSdmCmm";
import NaTeamCmm from "./pages/Cmm/NaTeamCmm";
import ProgressAfpCmm from "./pages/Cmm/ProgressAfpCmm";
import RecruitmentCmm from "./pages/Cmm/RecruitmentCmm";
import ProgressCmm from "./pages/Cmm/ProgressCmm";
import TargetTriwulanCmm from "./pages/Cmm/TargetTriwulanCmm";
import NasabahFormCmm from "./pages/Cmm/NasabahFormCmm";

//==================RO===========================//
import RoLayout from "./layout/RoLayout";
import RoDashboardPage from "./pages/Ro/RoDashboardPage";
import RoRecruitment from "./pages/Ro/RoRecruitment";
import MasukTeam from "./pages/Ro/MasukTeam";
import MarketClosing from "./pages/Ro/MarketClosing";
import Event from "./pages/Ro/Event";

//==================KPi=============================//
import KpiLayout from "./layout/KpiLayout";
import AsmanKpi from "./pages/Kpi/AsmanKpi";
import MmKpi from "./pages/kpi/MmKpi";
import CmmKpi from "./pages/kpi/CmmKpi";

import KpiSummary from "./pages/Kpi/KpiSummary";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <Router>
      <Routes>
        {/* ================= LOGIN ================= */}
        <Route path="/login" element={<Login onLogin={setUser} />} />

        {/* ================= REGISTER ================= */}
        <Route path="/register" element={<Register />} />  {/* ✅ ini tambahan */}

        {/* ================= ASMAN ================= */}
        <Route
          path="/asman/*"
          element={
            <PrivateRoute user={user} role="asman">
              <AsmanLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardCard />} />
          <Route path="input-sdm" element={<InputSDM />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="na-team" element={<NaTeam />} />
          <Route path="progress-afp" element={<ProgressAfp />} />
          <Route path="nasabah-form" element={<NasabahForm />} />
          <Route path="target-triwulan" element={<TargetTriwulan />} />
        </Route>

        {/* ================= MM ================= */}
        <Route
          path="/mm/*"
          element={
            <PrivateRoute user={user} role="mm">
              <MMLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardCardMM />} />
          <Route path="input-sdm-mm" element={<InputSdmMM />} />
          <Route path="recruitment-mm" element={<RecruitmentMm />} />
          <Route path="na-team-mm" element={<NaTeamMm />} />
          <Route path="progress-afp-mm" element={<ProgressAfpMM />} />
          <Route path="nasabah-form-mm" element={<NasabahFormMm />} />
          <Route path="target-triwulan-mm" element={<TargetTriwulanMm />} />
        </Route>

        {/* ================= CMM ================= */}
        <Route
          path="/cmm/*"
          element={
            <PrivateRoute user={user} role="cmm">
              <LayoutCmm />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardCmm />} />
          <Route path="input-sdm-cmm" element={<InputSdmCmm />} />
          <Route path="recruitment-cmm" element={<RecruitmentCmm />} />
          <Route path="na-team-cmm" element={<NaTeamCmm />} />
          <Route path="progress-afp-cmm" element={<ProgressAfpCmm />} />
          <Route path="nasabah-form-cmm" element={<NasabahFormCmm />} />
          <Route path="target-triwulan-cmm" element={<TargetTriwulanCmm />} />
          <Route path="progress-cmm" element={<ProgressCmm />} />
        </Route>

        <Route path="/kpi/*" element={<KpiLayout />}>
          <Route path="asman" element={<AsmanKpi />} />
          <Route path="mm" element={<MmKpi />} />
          <Route path="cmm" element={<CmmKpi />} />
          <Route path="summary" element={<KpiSummary />} />
        </Route>

        <Route path="/ro" element={<RoLayout />}>
          <Route path="dashboard" element={<RoDashboardPage />} />
          <Route path="ro-recruitment" element={<RoRecruitment />} />
          <Route path="masuk-team" element={<MasukTeam />} />
          <Route path="market-closing" element={<MarketClosing />} />
          <Route path="event" element={<Event />} />
        </Route>

        {/* ================= DEFAULT ================= */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
