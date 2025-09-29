"use client";
import PrivateRoute from "../hooks/PrivateRoute";

import './dashboard.css'
import Navbar from "../components/navbar/navbar";
import Textsection from "../components/textarea/textarea";
import MusicPicker from "../components/muscpicker/musicpicker";
function Dashboard() {

  return (
    <PrivateRoute>
      <div className="dashboard-container">
        <Navbar  page="Dashboard"></Navbar>
        <section className="section-one">
          <Textsection/>
          <MusicPicker/>
        </section>
      </div>
    </PrivateRoute>
  );
}

export default Dashboard;
