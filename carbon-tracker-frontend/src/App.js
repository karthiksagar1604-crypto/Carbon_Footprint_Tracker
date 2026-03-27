import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Calculator from "./pages/Calculator";
import Tips from "./pages/Tips";
import { HistoryProvider } from "./context/HistoryContext"; // <-- import HistoryProvider

function App() {
  return (
    <HistoryProvider> {/* Wrap everything inside the provider */}
      <Router>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/tips" element={<Tips />} />
          </Routes>
        </div>
      </Router>
    </HistoryProvider>
  );
}

export default App;
