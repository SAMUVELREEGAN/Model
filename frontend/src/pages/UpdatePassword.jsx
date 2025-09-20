import React, { useContext, useState } from "react";
import api from "../api";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const res = await api.post("/update-password",{ oldPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      alert(res.data.message);
      logout();
      
      setTimeout(() => {
        navigate("/login");
      }, 100);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };


  return (
     <div>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
        <br />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
        <br />
        <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <br />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
