"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PrivateRoute from "../hooks/PrivateRoute";

import './dashboard.css'
import Navbar from "../components/navbar/navbar";
function Dashboard() {
  const router = useRouter();

  return (
    <PrivateRoute>
      <div className="dashboard-container">
        <Navbar  page="Dashboard"></Navbar>
      </div>
    </PrivateRoute>
  );
}

export default Dashboard;
