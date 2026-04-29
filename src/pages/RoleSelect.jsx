import { useNavigate } from "react-router-dom";
import logo from '../assets/logoimage.jpg'

const RoleSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[350px] text-center">

        {/* Logo */}
        <img src={logo} alt="logo" className="w-20 mx-auto mb-4" />

        {/* Title */}
        <h2 className="text-2xl font-bold text-primary mb-6">
          Employee Management
        </h2>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/login?role=admin")}
            className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            Login as Admin
          </button>

          <button
            onClick={() => navigate("/login?role=employee")}
            className="w-full bg-secondary text-white py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            Login as Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;