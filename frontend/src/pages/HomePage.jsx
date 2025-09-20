import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import key from '../assets/key.png'

const HomePage = () => {
    const {accessToken} = useContext(AuthContext)
    const navigate=useNavigate()
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',borderRadius:"50%",backgroundColor:'lightgrey',width:'150px',height:'150px',margin:'auto',marginTop:"10px",marginBottom:"10px"}}>
            <img src={key} alt="" style={{position:"relative",width:"120px" ,top:"10px",left:"-5px"}}/>
        </div>
        {
        accessToken ?  <p>Login Successfull </p> :<button onClick={() =>navigate('/login')}>Login</button>
        }

        <button onClick={() =>navigate('/protected')}>Page</button>
    </div>
  )
}

export default HomePage