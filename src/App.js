import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import SideBarDosen from "./components/Sidebar/SideBarDosen";
import SideBarAdmin from "./components/Sidebar/SideBarAdmin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Pembimbing from "./pages/Pembimbing";
import Semhas from "./pages/Semhas";
import Sidang from "./pages/Sidang";
import DosenDashboard from "./pages/DosenDashboard";
import AdminDosen from "./pages/AdminDosen";
import AdminProfile from "./pages/AdminProfile"
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Progres from "./pages/Progres";
import PermintaanPembimbing from "./pages/DosenPermintaanPembimbing";
import DosenProgresTA from "./pages/DosenProgresTA";
import DosenSemhas from "./pages/DosenSemhas";
import DosenSidang from "./pages/DosenSidang";
import DosenProfile from "./pages/DosenProfile";

function App() {
  // Anda perlu menentukan tipe pengguna berdasarkan kondisi atau informasi dari backend
  const userType = sessionStorage.getItem("userType");
  // Gantilah dengan tipe pengguna yang sesuai

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {userType === "mahasiswa" && (
        <SideBar>
          <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/pembimbing" element={<Pembimbing />} />
            <Route path="/progres" element={<Progres />} />
            <Route path="/sidang" element={<Sidang />} />
            <Route path="/semhas" element={<Semhas />} />
            <Route path="/settings/profile" element={<Profile />} />

            <Route path="*" element={<>not found</>} />
          </Routes>
        </SideBar>
      )}

      {userType === "dosen" && (
        <SideBarDosen>
          <Routes>
            <Route path="/dosen-home" element={<DosenDashboard />} />
            <Route path="/permintaan" element={<PermintaanPembimbing />} />
            <Route path="/dosenprogres" element={<DosenProgresTA />} />
            <Route path="/dosensidang" element={<DosenSidang />} />
            <Route path="/dosensemhas" element={<DosenSemhas />} />
            <Route path="/settings/dosenprofile" element={<DosenProfile />} />

            <Route path="*" element={<>not found</>} />
          </Routes>
        </SideBarDosen>
      )}

      {userType === "admin" && (
        <SideBarAdmin>
          <Routes>
            <Route path="/admin-home" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminDosen />} />
            <Route path="/settings/adminprofile" element={<AdminProfile />} />

            <Route path="*" element={<>not found</>} />
          </Routes>
        </SideBarAdmin>
      )}
    </Router>
  );
}

export default App;
