import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from "recharts";
import { useHistoryRefresh } from "../context/HistoryContext";

const COLORS = ["#16a34a", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6", "#10b981"];

function Dashboard() {
  const { user } = useAuth();
  const { refresh } = useHistoryRefresh();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        const res = await axios.get("http://localhost:5000/api/history", {
          params: { user: user.email },
        });
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, [user, refresh]);

  const latest = history.length > 0 ? history[history.length - 1] : null;

  const breakdownData = latest
    ? [
        { name: "Transport", value: parseFloat(latest.transport) * 0.21 },
        { name: "Electricity", value: parseFloat(latest.electricity) * 0.5 },
        { name: "Diet", value: parseFloat(latest.diet) * 2.5 },
        { name: "Flights", value: parseFloat(latest.flights || 0) * 90 },
        { name: "Water", value: parseFloat(latest.water || 0) * 0.001 },
        { name: "Waste", value: parseFloat(latest.waste || 0) * 1.5 },
      ]
    : [];

  // ✅ Global average CO₂ footprint (rough global avg per person ~ 4000 kg/year ~ 333/month)
  const globalAverageMonthly = 333;
  const comparisonData = latest
    ? [
        { name: "You", value: latest.footprint },
        { name: "Global Avg", value: globalAverageMonthly },
      ]
    : [];

  const clearHistory = async () => {
    if (!window.confirm("Are you sure you want to clear all history?")) return;
    try {
      await axios.post("http://localhost:5000/api/clear-history", { user: user.email });
      
      setHistory([]); // reset local state
      alert("History cleared successfully!");
    } catch (err) {
      console.error("❌ Error clearing history:", err);
      alert("Failed to clear history.");
    }
  };


  return (
    <div className="p-6 grid grid-cols-1 gap-8">
      {/* Trend Chart */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          📊 {user?.displayName}'s Carbon History
        </h2>

        {history.length === 0 ? (
          <p>No data yet. Try calculating first!</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(d) => d.split("T")[0]} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="footprint" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Breakdown Donut */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🧩 Latest Breakdown</h2>
        {latest ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No breakdown data yet.</p>
        )}
      </div>

      {/* Comparison Bar */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🌍 Your Footprint vs Global Average</h2>
        {latest ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No comparison available yet.</p>
        )}
      </div>
      <div>
      <h2>Your History</h2>
      
      <button onClick={clearHistory} style={{ marginLeft: "10px", color: "red" }}>
        Clear History
      </button>

      <ul>
        {history.map((h, i) => (
          <li key={i}>
            {h.date} → {h.footprint}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Dashboard;
