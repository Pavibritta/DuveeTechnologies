import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 bg-accent min-h-screen">
        <Navbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;