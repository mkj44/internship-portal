import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Student Dashboard</h1>
        <Link to="/internships" className="btn">
          Browse Internships
        </Link>
      </div>
    </>
  );
};

export default Dashboard;