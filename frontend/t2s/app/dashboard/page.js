"use client";
import React, { useState } from "react";
import { account } from "../appwrite/appwrite";
import { useRouter } from "next/navigation";
import PrivateRoute from "../hooks/PrivateRoute";

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
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </PrivateRoute>
  );
}

export default Dashboard;
