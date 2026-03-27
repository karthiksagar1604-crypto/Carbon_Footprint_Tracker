import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();   // Call logout from context
      navigate("/");    // Redirect to home after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-green-600 text-white px-6 py-3 shadow">
      {/* Logo links to Home */}
      <Link to="/" className="text-xl font-bold hover:text-green-200">
        🌍 Carbon Tracker
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span>{user.displayName}</span>
            <img
              src={user.photoURL}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={handleLogout}
              className="bg-white text-green-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="bg-white text-green-600 px-3 py-1 rounded"
          >
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
