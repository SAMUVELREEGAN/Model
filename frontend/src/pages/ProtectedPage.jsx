import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const ProtectedPage = () => {
  const { accessToken, logout } = useContext(AuthContext);
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const getNormalData = async () => {
    try {
      const res = await api.get("/normal");
      setData(res.data.message);
    } catch (err) {
      alert("Failed to fetch normal data");
    }
  };

  const getProtectedData = async () => {
    try {
      const res = await api.get("/protected", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setData(res.data.message);
    } catch (err) {
      alert("Unauthorized");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Protected Page</h2>

      <button onClick={getNormalData}>Get Normal Data</button>
      <button onClick={getProtectedData}>Get Protected Data</button>

      {accessToken ? (
        <div>
          <button onClick={logout}>Logout</button>
          <button onClick={() => navigate("/update-password")}>
            Reset Password
          </button>
        </div>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
      <p>{data}</p>
    </div>
  );
};

export default ProtectedPage;
