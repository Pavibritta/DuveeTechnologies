import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaBuilding,
  FaUserPlus,
  FaList,
  FaHistory,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  // ✅ Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  // ===== STATS =====
  const total = employees.length;
  const active = employees.filter((e) => e.status === "Active").length;
  const inactive = employees.filter((e) => e.status === "Inactive").length;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-primary mb-6">Admin Dashboard</h1>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <FaUsers className="text-2xl text-primary" />
          <div>
            <p className="text-gray-500">Total Employees</p>
            <h2 className="text-2xl font-bold">{total}</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <FaUserCheck className="text-2xl text-green-500" />
          <div>
            <p className="text-gray-500">Active</p>
            <h2 className="text-2xl font-bold text-green-500">{active}</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <FaUserTimes className="text-2xl text-red-500" />
          <div>
            <p className="text-gray-500">Inactive</p>
            <h2 className="text-2xl font-bold text-red-500">{inactive}</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <FaBuilding className="text-2xl text-blue-500" />
          <div>
            <p className="text-gray-500">Departments</p>
            <h2 className="text-2xl font-bold">6</h2>
          </div>
        </div>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => navigate("/admin/add-employee")}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaUserPlus /> Add Employee
        </button>

        <button
          onClick={() => navigate("/employees")}
          className="border px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaList /> View Employees
        </button>
      </div>

      {/* ===== EMPLOYEE TABLE ===== */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaUsers /> Recent Employees
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Name</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  No employees found in localStorage
                </td>
              </tr>
            ) : (
              employees.map((emp, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{emp.name}</td>
                  <td>{emp.dept}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== RECENT ACTIVITY ===== */}
      {/* <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaHistory /> Recent Activity
        </h2>

        <ul className="space-y-2 text-gray-600">
          <li>✔ System loaded from localStorage</li>
          <li>✔ Dashboard rendered dynamically</li>
          <li>✔ Employee stats calculated in real-time</li>
        </ul>
      </div> */}
    </Layout>
  );
};

export default AdminDashboard;
