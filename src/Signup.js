import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phno, setPhno] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    // const userEmail = sessionStorage.getItem("email");

    const validatePassword = (password) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };

    const validatePhoneNumber = (phno) => {
      const regex = /^\d{10}$/; // Must be exactly 10 digits
      return regex.test(phno);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setMessage(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }
    if (!validatePhoneNumber(phno)) {
      setMessage("Phone number must be exactly 10 digits long.");
      return;
    }
    try {
      const response = await axios.post('https://flightbooking-ebx7.onrender.com/signup', {
        username,
        email,
        phno,
        password,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred.');
    }
  };

  if(isLoggedIn)
  {
    navigate("/home");
  }
  else
  {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create an Account</h1>

        <form onSubmit={handleSubmit}>
          <span>Name</span>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Example@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Ph no</span>
          <input
            type="text"
            name="phno"
            placeholder="+91"
            required
            onChange={(e) => setPhno(e.target.value)}
          />
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="At least 8 characters"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" >Sign Up</button>
      {message && <p style={{color:"red"}}>{message}</p>}
        </form>
        <br></br>
        <p>
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
}
};

export default Signup;
