import Layout from "../../components/Layout";
import { useEffect, useState } from "react";

const Attendance = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [records, setRecords] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= LOAD =================
  useEffect(() => {
    if (!user) return;

    const allAttendance =
      JSON.parse(localStorage.getItem("attendance")) || {};

    const userRecords = allAttendance[user.email] || [];
    setRecords(userRecords);

    // check if already checked in today
    const today = new Date().toISOString().split("T")[0];
    const todayRecord = userRecords.find((r) => r.date === today);

    if (todayRecord && todayRecord.checkIn !== "--") {
      setCheckedIn(true);
    }
  }, []);

  // ================= CHECK IN / OUT =================
  const handleCheck = () => {
    const today = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString();

    const allAttendance =
      JSON.parse(localStorage.getItem("attendance")) || {};

    const userRecords = allAttendance[user.email] || [];

    const todayIndex = userRecords.findIndex((r) => r.date === today);

    // CHECK IN
    if (!checkedIn) {
      if (todayIndex !== -1) {
        userRecords[todayIndex].checkIn = time;
        userRecords[todayIndex].status = "Present";
      } else {
        userRecords.push({
          date: today,
          checkIn: time,
          checkOut: "--",
          status: "Present",
        });
      }

      setCheckedIn(true);
    }

    // CHECK OUT
    else {
      if (todayIndex !== -1) {
        userRecords[todayIndex].checkOut = time;
      }
      setCheckedIn(false);
    }

    allAttendance[user.email] = userRecords;

    localStorage.setItem("attendance", JSON.stringify(allAttendance));
    setRecords(userRecords);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-secondary mb-6 mt-20">
        Attendance
      </h1>

      {/* ===== TODAY STATUS ===== */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex justify-between items-center">
        <div>
          <p className="text-gray-500">Today Status</p>
          <h2 className="text-lg font-semibold">
            {checkedIn ? "Checked In" : "Not Checked In"}
          </h2>
        </div>

        <button
          onClick={handleCheck}
          className={`px-4 py-2 rounded-lg text-white ${
            checkedIn ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {checkedIn ? "Check Out" : "Check In"}
        </button>
      </div>

      {/* ===== SUMMARY ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Present</p>
          <h2 className="text-2xl font-bold text-green-500">
            {records.filter((r) => r.status === "Present").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Absent</p>
          <h2 className="text-2xl font-bold text-red-500">
            {records.filter((r) => r.status === "Absent").length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Leaves</p>
          <h2 className="text-2xl font-bold text-yellow-500">
            0
          </h2>
        </div>
      </div>

      {/* ===== HISTORY TABLE ===== */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">
          Attendance History
        </h2>

        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No attendance records
                </td>
              </tr>
            ) : (
              records.map((rec, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3">{rec.date}</td>
                  <td>{rec.checkIn}</td>
                  <td>{rec.checkOut}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        rec.status === "Present"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {rec.status}
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

export default Attendance;