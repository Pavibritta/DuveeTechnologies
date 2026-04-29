import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaCalendarCheck,
  FaUmbrellaBeach,
  FaUser,
} from "react-icons/fa";

import logo from "../assets/logoimage.jpg";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");

  // ===== ADMIN MENU =====
  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <FaUsers />,
    },
    {
      name: "Attendance",
      path: "/admin/attendance",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Leave",
      path: "/admin/leave",
      icon: <FaUmbrellaBeach />,
    },
  ];

  // ===== EMPLOYEE MENU =====
  const employeeMenu = [
    {
      name: "Dashboard",
      path: "/employee/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: <FaUser />,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Leave",
      path: "/leave",
      icon: <FaUmbrellaBeach />,
    },
  ];

  const menu = role === "admin" ? adminMenu : employeeMenu;

  return (
    <>
      {/* MOBILE TOGGLE */}
      <div className="md:hidden p-4">
        <FaBars
          className="text-xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary text-white p-4 transform transition duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} className="h-16 w-auto" alt="logo" />
        </div>

        {/* MENU */}
        <ul className="space-y-3">
          {menu.map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className="flex items-center gap-3 p-2 rounded hover:bg-white hover:text-primary transition"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
