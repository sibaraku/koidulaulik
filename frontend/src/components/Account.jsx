import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

export default function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("authToken");
          navigate("/auth");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user data: ", err);
        localStorage.removeItem("authToken");
        navigate("/auth");
      }
    };

    fetchUserData();
  }, [token, navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/auth");
  };

  if (!user) {
    return <p className="p-8 text-center">Loading user data...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg mt-20">
        <h1 className="text-2xl font-bold mb-4">My account</h1>
        <p>
          <strong>Username: </strong>
          {user.username}
        </p>
        <p>
          <strong>Email: </strong>
          {user.email}
        </p>
        <button
          onClick={logoutHandler}
          className="mt-6 w-full py-2 rounded-lg bg-[var(--color-darkbrown)] text-white font-bold hover:bg-[var(--color-lightbrown)] transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
