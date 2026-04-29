import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/logoimage.jpg";

const Login = () => {
  const [params] = useSearchParams();
  const role = params.get("role");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ LOCAL LOGIN (NO BACKEND)
  const handleLogin = (e) => {
    e.preventDefault();

    // ================= ADMIN LOGIN =================
    if (role === "admin") {
      if (form.email === "admin@gmail.com" && form.password === "admin123") {
        const adminUser = {
          email: form.email,
          role: "admin",
        };

        localStorage.setItem("user", JSON.stringify(adminUser));
        localStorage.setItem("role", "admin");
        localStorage.setItem("isLoggedIn", "true");

        navigate("/admin/dashboard");
      } else {
        alert("Invalid admin credentials");
      }

      return;
    }

    // ================= EMPLOYEE LOGIN =================
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    const user = employees.find(
      (emp) =>
        emp.email === form.email &&
        emp.password === form.password &&
        emp.status === "Active",
    );

    if (!user) {
      alert("Employee not found or inactive");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", "employee");
    localStorage.setItem("isLoggedIn", "true");

    navigate("/employee/dashboard");
  };
  const handleForgot = (e) => {
    e.preventDefault();
    alert("Password reset link sent (demo only)");
    setShowForgot(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[350px]">
        {/* Logo */}
        <img src={logo} alt="logo" className="w-20 mx-auto mb-4" />

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          {showForgot
            ? "Forgot Password"
            : role === "admin"
              ? "Admin Login"
              : "Employee Login"}
        </h2>

        {/* ================= LOGIN ================= */}
        {!showForgot ? (
          <>
            <p className="text-sm text-gray-500 text-center mb-6">
              Please enter your credentials
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Forgot */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className={`w-full py-2 rounded-lg text-white font-semibold ${
                  role === "admin" ? "bg-primary" : "bg-secondary"
                }`}
              >
                Login
              </button>
            </form>
          </>
        ) : (
          /* ================= FORGOT ================= */
          <form onSubmit={handleForgot} className="space-y-4 mt-4">
            <p className="text-sm text-gray-500 text-center">
              Enter email to reset password
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-lg"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              onClick={() => setShowForgot(false)}
              className="w-full text-sm text-gray-500"
            >
              ← Back to Login
            </button>
          </form>
        )}

        {/* Back */}
        {!showForgot && (
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-sm text-gray-500 w-full"
          >
            ← Back to Role Selection
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
