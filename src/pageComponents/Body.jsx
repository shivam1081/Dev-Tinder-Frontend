import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
const Body = () => {
  return (
    <div>
      <Navbar />
      {/* Any Children components will be rendered here */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
