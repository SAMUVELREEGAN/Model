import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/reset-password/${token}`,{ newPassword });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
     <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New Password" value={newPassword} onChange={e=>setNewPassword(e.target.value)}/><br/>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
