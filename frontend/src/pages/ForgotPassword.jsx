import React, { useState } from 'react'
import api from '../api';

const ForgotPassword = () => {
    const [email,setEmail] = useState("");

    const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await api.post("/forgot-password",{email});
      alert(res.data.message);
    }catch(err){
      alert(err.response?.data?.message || err.message);
    }
  }


  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  )
}

export default ForgotPassword