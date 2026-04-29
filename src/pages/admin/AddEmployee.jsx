import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaUserTag,
  FaUpload,
  FaArrowLeft,
  FaPlusCircle,
} from "react-icons/fa";

// 🔥 Role → Department mapping
const roleDepartmentMap = {
  "Software Developer": "IT",
  "UI/UX Designer": "Design",
  "QA Tester": "Quality Assurance",
  "DevOps Engineer": "IT",
  "HR Executive": "HR",
  "Recruiter": "HR",
  "Finance Executive": "Finance",
  "Accountant": "Finance",
  "Team Lead": "Management",
};

const AddEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    dept: "",
    role: "",
    image: "",
  });

  // ✅ LOAD EDIT DATA
  useEffect(() => {
    if (location.state?.employee) {
      setForm(location.state.employee);
    }
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = {
      ...form,
      [name]: value,
    };

    // 🔥 AUTO department based on role
    if (name === "role") {
      updatedForm.dept = roleDepartmentMap[value] || "";
    }

    setForm(updatedForm);
  };

  // ================= IMAGE UPLOAD =================
  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  // ================= SUBMIT (ADD + EDIT) =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("employees")) || [];

    if (form.id) {
      // ===== EDIT =====
      const updated = existing.map((emp) =>
        emp.id === form.id ? form : emp
      );

      localStorage.setItem("employees", JSON.stringify(updated));
      alert("Employee Updated Successfully!");
    } else {
      // ===== ADD =====
      const newEmployee = {
        ...form,
        id: Date.now(),
        status: "Active",
      };

      localStorage.setItem(
        "employees",
        JSON.stringify([...existing, newEmployee])
      );

      alert("Employee Added Successfully!");
    }

    navigate("/admin/dashboard");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow mt-20">

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <FaPlusCircle />
          {form.id ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              name="name"
              placeholder="Employee Name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 p-2 border rounded"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 p-2 border rounded"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 p-2 border rounded"
              required
            />
          </div>

          {/* ROLE */}
          <div className="relative">
            <FaUserTag className="absolute left-3 top-3 text-gray-400" />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full pl-10 p-2 border rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="Software Developer">Software Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="QA Tester">QA Tester</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="HR Executive">HR Executive</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Finance Executive">Finance Executive</option>
              <option value="Accountant">Accountant</option>
              <option value="Team Lead">Team Lead</option>
            </select>
          </div>

          {/* DEPARTMENT (AUTO) */}
          <div className="relative">
            <FaBuilding className="absolute left-3 top-3 text-gray-400" />
            <input
              name="dept"
              value={form.dept}
              readOnly
              placeholder="Department (auto)"
              className="w-full pl-10 p-2 border rounded bg-gray-100"
            />
          </div>

          {/* IMAGE */}
          <div className="border p-3 rounded flex items-center gap-3">
            <FaUpload className="text-gray-500" />
            <input type="file" accept="image/*" onChange={handleImage} />
          </div>

          {/* PREVIEW */}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-24 h-24 rounded-full mx-auto border"
            />
          )}

          {/* BUTTONS */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-2 rounded flex items-center justify-center gap-2"
            >
              <FaPlusCircle />
              {form.id ? "Update Employee" : "Add Employee"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="flex-1 border py-2 rounded flex items-center justify-center gap-2"
            >
              <FaArrowLeft /> Back
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
};

export default AddEmployee;