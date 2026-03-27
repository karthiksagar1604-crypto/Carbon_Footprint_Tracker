// src/pages/Login.js
export default function Login() {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Login to EcoTrack</h2>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
          Login with Google
        </button>
      </div>
    </div>
  );
}
