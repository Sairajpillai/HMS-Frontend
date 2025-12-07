import { BrowserRouter, Route, Routes } from "react-router-dom";
import Random from "../Components/Random";
import AdminDashboard from "../Layout/AdminDashboard";
import DoctorDashboard from "../Layout/DoctorDashboard";
import PatientDashboard from "../Layout/PatientDashboard";
import DoctorProfilePage from "../pages/Doctor/DoctorProfilePage";
import LoginPage from "../pages/LoginPage";
import PatientProfilePage from "../pages/Patient/PatientProfilePage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import PatientAppointmentPage from "../pages/Patient/PatientAppointmentPage";
import DoctorAppointmentPage from "../pages/Doctor/DoctorAppointmentPage";
import DoctorAppointmentDetailsPage from "../pages/Doctor/DoctorAppointmentDetailsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>}/>
        <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Random />} />
          <Route path="/pharmacy" element={<Random />} />
          <Route path="/patients" element={<Random />} />
          <Route path="/doctors" element={<Random />} />
          <Route path="/appointments" element={<Random />} />
        </Route>
        <Route path="/patient" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>
          <Route path="dashboard" element={<Random />} />
          <Route path="profile" element={<PatientProfilePage />} />
          <Route path="appointments" element={<PatientAppointmentPage />} />
        </Route>
        <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}>
          <Route path="dashboard" element={<Random />} />
          <Route path="profile" element={<DoctorProfilePage />} />
          <Route path="appointments" element={<DoctorAppointmentPage />} />
          <Route path="appointments/:id" element={<DoctorAppointmentDetailsPage />} />
          <Route path="pharmacy" element={<Random />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
