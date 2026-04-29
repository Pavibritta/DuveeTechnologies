import { Routes, Route } from "react-router-dom";

import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";

import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

import Employees from "./pages/admin/Employees";
import Profile from "./pages/employee/Profile";
import Attendance from "./pages/employee/Attendance";
import Leave from "./pages/employee/Leave";

import AddEmployee from "./pages/admin/AddEmployee";
import AttendanceManagement from "./pages/admin/AttendanceManagement";
import LeaveManagement from "./pages/admin/LeaveManagement";

import ProtectedRoute from "./pages/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<RoleSelect />} />
      <Route path="/login" element={<Login />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <ProtectedRoute role="admin">
            <Employees />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-employee"
        element={
          <ProtectedRoute role="admin">
            <AddEmployee />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/attendance"
        element={
          <ProtectedRoute role="admin">
            <AttendanceManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/leave"
        element={
          <ProtectedRoute role="admin">
            <LeaveManagement />
          </ProtectedRoute>
        }
      />

      {/* EMPLOYEE ROUTES */}
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute role="employee">
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute role="employee">
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leave"
        element={
          <ProtectedRoute role="employee">
            <Leave />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;