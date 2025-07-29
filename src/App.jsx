import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//ASMAN
import AsmanLayout from "./layout/AsmanLayout";
import DashboardCard from "./components/asman/DashboardCard";
import InputSDM from "./pages/Asman/InputSDM";
import Recruitment from "./pages/Asman/Recruitment";
import NaTeam from "./pages/Asman/NaTeam";
import ProgressAfp from "./pages/Asman/ProgressAfp";
import TargetTriwulan from "./pages/Asman/TargetTriwulan";

//MM
import MMLayout from "./layout/MMLayout";
import DashboardCardMM from "./components/MM/DashboardCardMM";
import InputSdmMM from "./pages/MM/InputSdmMM";
import NewSdm from "./pages/MM/NewSdm";
import TotalNewData from "./pages/MM/TotalNewData";
import NasabahDitemui from "./pages/MM/NasabahDitemui";
import TargetTriwulanMM from "./pages/MM/TargetTriwulan";
import ProgressAfpMM from "./pages/MM/ProgressAfpMM";

//CMM
import LayoutCmm from "./layout/LayoutCmm";
import DashboardCmm from "./components/cmm/DashboardCmm";
import ProgressAfpCmm from "./pages/Cmm/ProgressAfpCmm";
import ProgressCmm from "./pages/Cmm/ProgressCmm";
import TargetTriwulanCmm from "./pages/Cmm/TargetTriwulanCmm";
import TotalNewDataAllTeam from "./pages/Cmm/TotalNewDataAllTeam";
import TotalNasabahDitemui from "./pages/Cmm/TotalNasabahDitemui";
function App() {
  return (
    <Router>
      <Routes>
        {/* Layout utama untuk ASMAN */}
        <Route path="/" element={<Navigate to="/asman" />} />
        <Route path="/asman" element={<AsmanLayout />}>
          <Route index element={<DashboardCard />} />
          <Route path="input-sdm" element={<InputSDM />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="na-team" element={<NaTeam />} />
          <Route path="progres-afp" element={<ProgressAfp />} />
          <Route path="target-triwulan" element={<TargetTriwulan />} />
        </Route>
        <Route path="/mm" element={<MMLayout />}>
          <Route index element={<DashboardCardMM />} />
          <Route path="input-sdm" element={<InputSdmMM />} />
          <Route path="new-sdm-review" element={<NewSdm />} />
          <Route path="total-new-data" element={<TotalNewData />} />
          <Route path="total-nasabah-ditemui" element={<NasabahDitemui />} />
          <Route path="target-triwulan" element={<TargetTriwulanMM />} />
          <Route path="review-progress-afp" element={<ProgressAfpMM />} />
        </Route>
        <Route path="/cmm" element={<LayoutCmm />}>
          <Route path="/cmm" element={<LayoutCmm><DashboardCmm /></LayoutCmm>} />
          <Route path="/cmm/progress-Cmm" element={<LayoutCmm><ProgressCmm /></LayoutCmm>} />
          <Route path="/cmm/target-triwulan-Cmm" element={<LayoutCmm><TargetTriwulanCmm /></LayoutCmm>} />
          <Route path="/cmm/total-new-data" element={<LayoutCmm><TotalNewDataAllTeam /></LayoutCmm>} />
          <Route path="/cmm/total-nasabah-ditemui" element={<LayoutCmm><TotalNasabahDitemui /></LayoutCmm>} />
          <Route path="/cmm/Progres-Afp-Cmm" element={<LayoutCmm><ProgressAfpCmm /></LayoutCmm>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



