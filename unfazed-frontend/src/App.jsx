import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Appointments from "./pages/Appointments";
import Availability from "./pages/Availability";
import Packages from "./pages/Packages";
import ClinicalNotes from "./pages/ClinicalNotes";
import Payments from "./pages/Payments";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Placeholder({ title }) {
    return (
        <div className="dashboard-page">
            <div className="content-card">
                <h2>{title}</h2>
                <p>This section will be available soon.</p>
            </div>
        </div>
    );
}

function App() {
    const location = useLocation();

    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <div>
            {!isAuthPage && <Sidebar />}

            <div className={isAuthPage ? "auth-layout" : "main-layout"}>
                {!isAuthPage && <Navbar />}

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/availability" element={<Availability />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/clinical-notes" element={<ClinicalNotes />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Placeholder title="Page Not Found" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;