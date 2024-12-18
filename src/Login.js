import React, { useState } from "react";
import "./Login.css";
import axios from 'axios'; 
import { useNavigate,NavLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://flight-booking-backend-omega.vercel.app/login', {
        email,
        password,
      });
      // response.data.email
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("email", response.data.user.email);
      sessionStorage.setItem("username", response.data.user.username);
      console.log(response);
      navigate("/home",{ state: { name:response.data.user.username} });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred.');
    }
  };

  return (
    <>
    
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
          <NavLink to='/' style={{textAlign:"center"}}>if not , register...</NavLink>
      <p style={{color:"red"}}>
        {message}
        </p>
      </form>
      
    </div>
    </>
  );
};

export default Login;
