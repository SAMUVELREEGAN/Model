import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();

     if (!username || !password) {
    alert("Please enter username and password");
    return;
  }
    try {
      await login(username, password);
      navigate("/protected");
      window.location.reload()
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <Link to="/forgot" style={{textAlign:"right",marginTop:"-15px"}}>Forgot password</Link>
        <button type="submit" disabled={loading}>Login</button>
      </form>
      <p>
        No account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
