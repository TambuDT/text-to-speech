"use client";
import React, { useState } from "react";
import { account } from "../appwrite/appwrite";
import { useRouter } from "next/navigation";
import PrivateRoute from "../hooks/PrivateRoute";
import './dashboard.css'
function Dashboard() {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(true); // o il tuo stato reale

  async function logout() {
    try {
      await account.deleteSession({ sessionId: "current" });
      setLoggedInUser(null);
      router.push("/login"); // opzionale: redirect al login dopo logout
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  }

  return (
    <PrivateRoute>
      <div className="dashboard-container">
        <nav className="navbar">
          <ul>
            <li>T2S</li>
            <li>Powered by Google IA <div className="logout-button" onClick={logout}><label>Logout</label><i className="logout-icon fa-solid fa-arrow-right-from-bracket"></i></div></li>
          </ul>
        </nav>
      </div>
    </PrivateRoute>
  );
}

export default Dashboard;
