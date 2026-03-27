import { Leaf } from "lucide-react";

function Tips() {
  const tips = [
    "🚴 Use a bicycle or walk for short trips instead of driving.",
    "💡 Switch to LED bulbs to save energy.",
    "🌱 Eat more plant-based meals each week.",
    "🛍️ Carry a reusable bag, bottle, and cup.",
    "♻️ Recycle and compost whenever possible.",
    "☀️ Consider installing solar panels if feasible.",
    "🚿 Take shorter showers to reduce water heating energy.",
    "🖥️ Unplug chargers and electronics when not in use."
  ];

  return (
    <div className="p-10 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-green-700 mb-6 flex items-center justify-center gap-2">
        <Leaf className="w-8 h-8 text-emerald-600" /> Eco-Friendly Tips
      </h1>
      <ul className="max-w-2xl mx-auto space-y-4 text-lg text-gray-700">
        {tips.map((tip, idx) => (
          <li
            key={idx}
            className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tips;

