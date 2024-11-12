import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      const response = await fetch("http://localhost:3000/api/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2>Welcome, {user.username}</h2>
        <p>{user.email}</p>
        <img
          src={user.profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="rounded-full w-32 h-32"
        />
      </div>
    </div>
  );
};

export default Home;