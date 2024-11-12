import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl">MyApp</h1>
      {user ? (
        <div className="flex items-center space-x-4">
          <img
            src={user.profileImage}
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <button
            onClick={logout}
            className="text-white px-4 py-2 bg-red-500 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <a href="/login" className="text-white">
          Login
        </a>
      )}
    </nav>
  );
};

export default Navbar;
