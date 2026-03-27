import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // ✅ import auth
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Calculator() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    transport: "",
    electricity: "",
    diet: "",
    flights: "",
    water: "",
    waste: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (send data to ML backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/calculate", {
        ...form,
        user: user?.email, // ✅ attach logged in user email
      });
      setResult(res.data.footprint);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🧮 Carbon Footprint Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="transport"
          placeholder="Transport (km/day)"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        <input
          type="number"
          name="electricity"
          placeholder="Electricity (kWh/month)"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        <input
          type="number"
          name="diet"
          placeholder="Diet (meat meals/week)"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        <input
          type="number"
          name="waste"
          placeholder="Waste (kg/week)"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        <input
          type="number"
          name="water"
          placeholder="Water usage (litres/day)"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        <input
          type="number"
          name="flights"
          placeholder="Flights (hours/year)"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Calculate
        </button>
      </form>

      {result !== null && (
        <div className="mt-6 text-lg">
          🌍 Your estimated footprint:{" "}
          <span className="font-bold">{result} kg CO₂e</span>
        </div>
      )}
    </div>
  );
}

export default Calculator;
