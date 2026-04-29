import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { FaSearch } from "react-icons/fa";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // ✅ LOAD + FIX LOCALSTORAGE STRUCTURE
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leaves")) || {};

    // 🔥 Convert object → array
    const formatted = Object.entries(data).flatMap(([email, list]) =>
      list.map((item) => ({
        ...item,
        email,
      }))
    );

    setLeaves(formatted);
  }, []);

  // ===== UPDATE STATUS =====
  const updateStatus = (email, index, status, adminReason = "") => {
    const data = JSON.parse(localStorage.getItem("leaves")) || {};

    const updatedList = data[email].map((item, i) =>
      i === index ? { ...item, status, adminReason } : item
    );

    data[email] = updatedList;

    localStorage.setItem("leaves", JSON.stringify(data));

    // update UI
    const formatted = Object.entries(data).flatMap(([email, list]) =>
      list.map((item) => ({
        ...item,
        email,
      }))
    );

    setLeaves(formatted);
  };

  // ===== FILTER (SAFE) =====
  const filtered = (leaves || []).filter((item) => {
    const matchSearch =
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.status?.toLowerCase().includes(search.toLowerCase());

    const matchDate = dateFilter ? item.from === dateFilter : true;

    return matchSearch && matchDate;
  });

  return (
    <Layout>
      <div className="mt-20">

        <h1 className="text-2xl font-bold text-primary mb-6">
          Leave Management (Admin)
        </h1>

        {/* FILTERS */}
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

          {/* DATE FILTER */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />

          {/* RESET */}
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
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No leave requests
                  </td>
                </tr>
              ) : (
                filtered.map((leave, i) => (
                  <tr key={i} className="border-b">

                    <td className="p-3">{leave.email}</td>
                    <td>{leave.type}</td>
                    <td>{leave.from}</td>
                    <td>{leave.to}</td>
                    <td>{leave.reason}</td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : leave.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="space-x-2">

                      <button
                        onClick={() =>
                          updateStatus(leave.email, i, "Approved")
                        }
                        className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => {
                          const reason = prompt("Enter rejection reason:");
                          updateStatus(leave.email, i, "Rejected", reason);
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Reject
                      </button>

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

export default LeaveManagement;