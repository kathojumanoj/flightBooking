import React from "react";
import "./Head.css";
import { useNavigate, useLocation,NavLink } from 'react-router-dom';
import Signup from "./Signup";

export default function Head() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {name}= location.state || {}; 
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const userEmail = sessionStorage.getItem("email");
    const username = sessionStorage.getItem("username");

    const handleLogout = () => {
      // Clear session storage on logout
      sessionStorage.clear();
      navigate("/login");
    };
    
    <>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/">Register</NavLink>
    </>
    if(isLoggedIn)
    {

      
      return (
        
        <>
        <h1 style={{textAlign:"center"}}>Welcome {username} <button className="bbbtt" onClick={handleLogout}>Logout</button></h1>
        <div className="home-container">
  
      <div className="Welcome-div"> 
          <h4 style={{textAlign:"center"}}>Air Connects...!  </h4>
     
          <p>
          AirConnects, your trusted partner in seamless air
          travel experiences! Whether you're flying for business or leisure,
            our commitment is to provide you with unparalleled service, comfort,
            and efficiency.
            </p>
    
        </div>
        </div>
    </>
  );
}
else{
  navigate("/");
}

}

