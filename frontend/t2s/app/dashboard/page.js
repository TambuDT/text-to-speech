"use client";
import { useState } from "react";
import PrivateRoute from "../hooks/PrivateRoute";

import './dashboard.css'
import Navbar from "../components/navbar/navbar";
import Textsection from "../components/textarea/textarea";
import { VoiceSelector } from "../components/voiceselector/voiceselector"

function Dashboard() {
  const [voice, setVoice] = useState();

  return (
    <PrivateRoute>
      <div className="dashboard-container">
        <Navbar page="Dashboard" />
        <section className="section-one">
          <Textsection voiceName={voice} />
          <VoiceSelector onVoiceChange={setVoice} />
        </section>
      </div>
    </PrivateRoute>
  );
}

export default Dashboard;
