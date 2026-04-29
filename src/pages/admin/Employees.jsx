import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUser, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ✅ Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  // DELETE
  const handleDelete = (id) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, status: "Inactive" } : emp,
    );

    localStorage.setItem("employees", JSON.stringify(updated));
    setEmployees(updated);
  };

  // FILTER
  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.dept.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <div className="mt-20">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-primary">
            Employee Management
          </h1>

          <button
            onClick={() => navigate("/admin/add-employee")}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            + Add Employee
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative mb-6 md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <p className="text-gray-500">No employees found</p>
          ) : (
            filtered.map((emp) => (
              <div
                key={emp.id}
                className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
              >
                {/* PROFILE */}
                <div className="flex items-center gap-3 mb-4">
                  {emp.image ? (
                    <img
                      src={emp.image}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-3xl text-gray-400" />
                  )}

                  <div>
                    <h2 className="font-bold">{emp.name}</h2>
                    <p className="text-sm text-gray-500">{emp.email}</p>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Department:</span>{" "}
                    {emp.dept}
                  </p>

                  <p>
                    <span className="font-semibold">Role:</span> {emp.role}
                  </p>

                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() =>
                      navigate("/admin/add-employee", {
                        state: { employee: emp },
                      })
                    }
                    className="text-blue-500 hover:scale-110 transition"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-500 hover:scale-110 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Employees;
