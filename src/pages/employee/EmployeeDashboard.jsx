import Layout from "../../components/Layout";
import { useEffect, useState } from "react";

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    leaves: 0,
  });

  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setEmployee(user);

    if (!user?.email) return;

    // ================= STATS =================
    const allStats =
      JSON.parse(localStorage.getItem("employeeStats")) || {};

    setStats(allStats[user.email] || {
      present: 0,
      absent: 0,
      leaves: 0,
    });

    // ================= ATTENDANCE (FIXED) =================
    const allAttendance =
      JSON.parse(localStorage.getItem("attendance")) || {};

    const userAttendance = allAttendance[user.email] || [];

    setAttendance(userAttendance);

    // ================= LEAVES =================
    const allLeaves =
      JSON.parse(localStorage.getItem("leaves")) || {};

    const userLeaves = allLeaves[user.email] || [];

    setLeaves(userLeaves);
  }, []);

  const totalLeaves = 12;
  const usedLeaves = stats.leaves || leaves.length;
  const remainingLeaves = totalLeaves - usedLeaves;

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-secondary mb-6 mt-20">
        Employee Dashboard
      </h1>

      {/* ===== WELCOME ===== */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold">
          Welcome Back 👋 {employee?.name || "Employee"}
        </h2>
        <p className="text-gray-500">
          {employee?.role || "Employee"} Dashboard Overview
        </p>
      </div>

      {/* ===== ATTENDANCE STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Present</p>
          <h2 className="text-2xl font-bold text-green-500">
            {stats.present}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Absent</p>
          <h2 className="text-2xl font-bold text-red-500">
            {stats.absent}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Leaves</p>
          <h2 className="text-2xl font-bold text-yellow-500">
            {usedLeaves}
          </h2>
        </div>
      </div>

      {/* ===== LEAVE BALANCE ===== */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Leave Balance
        </h2>

        <div className="flex justify-between text-gray-700">
          <span>Total: {totalLeaves}</span>
          <span>Used: {usedLeaves}</span>
          <span>Remaining: {remainingLeaves}</span>
        </div>
      </div>

      {/* ===== ATTENDANCE HISTORY ===== */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Recent Attendance
        </h2>

        {attendance.length === 0 ? (
          <p className="text-gray-500">No attendance found</p>
        ) : (
          attendance.slice(0, 5).map((a, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{a.date}</span>
              <span>{a.checkIn}</span>
              <span className={a.status === "Present" ? "text-green-500" : "text-red-500"}>
                {a.status}
              </span>
            </div>
          ))
        )}
      </div>

      {/* ===== LEAVE HISTORY ===== */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Recent Leaves
        </h2>

        {leaves.length === 0 ? (
          <p className="text-gray-500">No leave records</p>
        ) : (
          leaves.slice(0, 5).map((l, i) => (
            <div key={i} className="border-b py-2">
              <p>{l.type} ({l.from} - {l.to})</p>
              <span className="text-sm text-gray-500">{l.status}</span>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;