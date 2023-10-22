import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Pembimbing from "./pages/Pembimbing";
import Semhas from "./pages/Semhas";
import Sidang from "./pages/Sidang";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Progres from "./pages/Progres";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/register" exact element={<Register />}></Route>
      </Routes>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pembimbing" element={<Pembimbing />} />
          <Route path="/progres" element={<Progres />} />
          <Route path="/sidang" element={<Sidang />} />
          <Route path="/semhas" element={<Semhas />} />
          <Route path="/order" element={<Order />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings/profile" element={<Profile />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
