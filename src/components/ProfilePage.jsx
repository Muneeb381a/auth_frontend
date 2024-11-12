import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUser(data.user); // Set the user data in the state
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-bold text-green-700">User Profile</h2>
      <div className="flex flex-col items-center">
        <img
          src={user.profileImage || "https://via.placeholder.com/150"}
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <h3 className="mt-4 text-xl font-semibold">{user.username}</h3>
        <p className="mt-2 text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
