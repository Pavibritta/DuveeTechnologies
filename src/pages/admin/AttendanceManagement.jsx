import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";

const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // ✅ Load + FIX structure
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("attendance")) || {};

    // 🔥 Convert object → array
    const formatted = Object.entries(data).flatMap(([email, records]) =>
      records.map((rec) => ({
        ...rec,
        email,
      }))
    );

    setAttendance(formatted);
  }, []);

  // ===== FILTER =====
  const filteredData = attendance.filter((item) => {
    const matchSearch =
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.status?.toLowerCase().includes(search.toLowerCase());

    const matchDate = dateFilter ? item.date === dateFilter : true;

    return matchSearch && matchDate;
  });

  return (
    <Layout>
      <div className="mt-20">

        <h1 className="text-2xl font-bold text-primary mb-6">
          Attendance Management
        </h1>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">

          {/* SEARCH */}
          <div className="relative md:w-1/3">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search email or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 px-3 py-2 border rounded-lg"
            />
          </div>

          {/* DATE */}
          <div className="relative md:w-1/3">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 px-3 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={() => {
              setSearch("");
              setDateFilter("");
            }}
            className="bg-secondary text-white px-4 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Employee</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              ) : (
                filteredData.map((item, i) => (
                  <tr key={i} className="border-b">

                    <td className="p-3 font-medium">
                      {item.email}
                    </td>

                    <td>{item.date}</td>
                    <td>{item.checkIn}</td>
                    <td>{item.checkOut}</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          item.status === "Present"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AttendanceManagement;