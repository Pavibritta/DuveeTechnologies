import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-secondary mb-6 mt-20">
        My Profile
      </h1>

      {/* PROFILE CARD */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 flex items-center gap-6">

        {/* PROFILE IMAGE */}
        {user?.image ? (
          <img
            src={user.image}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-secondary text-white flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
        )}

        {/* INFO */}
        <div>
          <h2 className="text-xl font-semibold">
            {user?.name || "Guest User"}
          </h2>
          <p className="text-gray-500">{user?.role || "Employee"}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>

        {/* <button className="ml-auto bg-secondary text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaEdit /> Edit
        </button> */}
      </div>

      {/* PERSONAL DETAILS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phone || "-"}</p>
          <p><strong>Address:</strong> {user?.address || "-"}</p>

        </div>
      </div>

      {/* WORK DETAILS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Work Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

          <p><strong>Employee ID:</strong> {user?.empId || "-"}</p>
          <p><strong>Department:</strong> {user?.dept || user?.department}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <p><strong>Joining Date:</strong> {user?.joiningDate || "-"}</p>

        </div>
      </div>

      {/* ACTIVITY */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Activity Info
        </h2>

        <div className="flex justify-between text-gray-700">

          <p>
            <strong>Last Login:</strong> {user?.lastLogin || "Today"}
          </p>

          <span
            className={`px-3 py-1 rounded text-sm ${
              user?.status === "Active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {user?.status || "Active"}
          </span>

        </div>
      </div>
    </Layout>
  );
};

export default Profile;