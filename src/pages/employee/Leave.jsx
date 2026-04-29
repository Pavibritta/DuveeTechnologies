import Layout from "../../components/Layout";
import { useEffect, useState } from "react";

const Leave = () => {
  const [form, setForm] = useState({
    type: "",
    from: "",
    to: "",
    reason: "",
  });

  const [leaves, setLeaves] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= LOAD =================
  useEffect(() => {
    if (!user) return;

    const allLeaves =
      JSON.parse(localStorage.getItem("leaves")) || {};

    const userLeaves = allLeaves[user.email] || [];
    setLeaves(userLeaves);
  }, []);

  // ================= CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.type || !form.from || !form.to) return;

    const allLeaves =
      JSON.parse(localStorage.getItem("leaves")) || {};

    const userLeaves = allLeaves[user.email] || [];

    const newLeave = {
      ...form,
      status: "Pending",
    };

    const updatedLeaves = [...userLeaves, newLeave];

    allLeaves[user.email] = updatedLeaves;

    localStorage.setItem("leaves", JSON.stringify(allLeaves));

    setLeaves(updatedLeaves);

    setForm({
      type: "",
      from: "",
      to: "",
      reason: "",
    });
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-secondary mb-6 mt-20">
        Leave Management
      </h1>

      {/* ===== LEAVE BALANCE ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Leaves</p>
          <h2 className="text-2xl font-bold">12</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Used</p>
          <h2 className="text-2xl font-bold text-red-500">
            {leaves.length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Remaining</p>
          <h2 className="text-2xl font-bold text-green-500">
            {12 - leaves.length}
          </h2>
        </div>

      </div>

      {/* ===== APPLY LEAVE ===== */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Apply Leave
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* TYPE */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick">Sick Leave</option>
            <option value="Casual">Casual Leave</option>
            <option value="Paid">Paid Leave</option>
          </select>

          {/* FROM */}
          <input
            type="date"
            name="from"
            value={form.from}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg"
            required
          />

          {/* TO */}
          <input
            type="date"
            name="to"
            value={form.to}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg"
            required
          />

          {/* REASON */}
          <input
            type="text"
            name="reason"
            placeholder="Reason"
            value={form.reason}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-secondary text-white py-2 rounded-lg"
          >
            Apply Leave
          </button>

        </form>
      </div>

      {/* ===== HISTORY ===== */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">
          Leave History
        </h2>

        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-500"
                >
                  No leave records found
                </td>
              </tr>
            ) : (
              leaves.map((leave, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3">{leave.type}</td>
                  <td>{leave.from}</td>
                  <td>{leave.to}</td>

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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Leave;