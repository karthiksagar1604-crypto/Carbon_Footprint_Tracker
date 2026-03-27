import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Calculator, BarChart3, Leaf } from "lucide-react"; // added Leaf icon

function Home() {
  const { user } = useAuth();

  return (
    <div className="p-10 text-center bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-4 text-green-700 drop-shadow">
        🌍 Carbon Tracker
      </h1>
      <p className="text-lg mb-12 text-gray-700 max-w-2xl mx-auto">
        Track, calculate, and visualize your carbon footprint.  
        Take a step towards a sustainable lifestyle.
      </p>

      {user ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Calculator Card */}
          <Link
            to="/calculator"
            className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <Calculator className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Carbon Calculator</h2>
            <p className="text-gray-600">
              Estimate your footprint from transport, energy, and diet habits.
            </p>
          </Link>

          {/* Dashboard Card */}
          <Link
            to="/dashboard"
            className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
            <p className="text-gray-600">
              View your footprint history and track progress towards sustainability.
            </p>
          </Link>

          {/* Eco Tips Card */}
          <Link
           to="/tips"
           className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer"
          >
            <Leaf className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Eco Tips</h2>
            <p className="text-gray-600">
              Discover simple lifestyle changes you can adopt today to reduce your carbon impact.
            </p>
          </Link>

        </div>
      ) : (
        <p className="text-gray-600 text-lg">
          Please <span className="font-semibold">log in</span> to access your tools.
        </p>
      )}
    </div>
  );
}

export default Home;
