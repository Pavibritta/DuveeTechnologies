import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ Get full user object
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3 fixed w-full max-w-5xl z-50">
      {/* LEFT SIDE */}
      <h1 className="text-lg font-semibold text-primary">
        {role === "admin" ? "Admin Panel" : "Employee Panel"}
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* ===== PROFILE IMAGE (ONLY FOR EMPLOYEE) ===== */}
          {role === "employee" &&
            (user?.image ? (
              <img
                src={user.image}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
            ))}

          {/* ===== USER INFO ===== */}
          <div className="text-right leading-tight">
            {/* NAME */}
            <p className="text-sm font-semibold text-gray-800">
              {role === "admin" ? "Admin Panel" : user?.name || "Guest"}
            </p>

            {/* EMAIL OR ROLE INFO */}
            <p className="text-xs text-gray-500">
              {role === "admin"
                ? user?.email || "admin@gmail.com"
                : user?.email}
            </p>
          </div>

          {/* ===== ROLE BADGE ===== */}
          <span
            className={`text-xs px-2 py-1 rounded ${
              role === "admin"
                ? "bg-blue-100 text-blue-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {role}
          </span>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-secondary text-white px-3 py-1 rounded hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
