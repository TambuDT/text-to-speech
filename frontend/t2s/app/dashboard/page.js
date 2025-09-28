"use client";
import PrivateRoute from "../hooks/PrivateRoute";

import './dashboard.css'
import Navbar from "../components/navbar/navbar";
function Dashboard() {

  return (
    <PrivateRoute>
      <div className="dashboard-container">
        <Navbar  page="Dashboard"></Navbar>

      </div>
    </PrivateRoute>
  );
}

export default Dashboard;
