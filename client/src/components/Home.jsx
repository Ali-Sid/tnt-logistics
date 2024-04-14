import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboard from "./home/Dashboard"

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ height: "5%", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: "100vw", height: "95%" }}>
        {/* <div style={{ width: isSidebarOpen ? "10%" : "4%", transition: "width 0.3s ease" }}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div> */}
        <div style={{ width: isSidebarOpen ? "83.5%" : "96%", transition: "width 0.3s ease" }}>
          <Dashboard />
        </div>
      </div>
    </div>


  );
}

export default Home;