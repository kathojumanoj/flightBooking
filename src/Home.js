import React from 'react';
import "./Home.css";
import { Routes, NavLink, Route } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import BookForm from './BookForm';
import Head from './Head';
import Avail from './Avail';
import MyTickets from "./MyTickets";
import Signup from './Signup';
import Login from './Login';


export default function Home() {
  
    const name = sessionStorage.getItem("username");

   
  if(name!=="")
  {

  return (
    <>
      <header>
          <div className='navbar'>
          
            <nav>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/avail'>Flight Availability</NavLink>
                <NavLink to='/book'>Book Ticket</NavLink>
                <NavLink to='/my-tickets'>My Tickets</NavLink>
            </nav>
               
          </div>
        <Routes>
          <Route path='/home' element={<Head/>}/>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/avail' element={<Avail/>}/>
          <Route path='/book' element={<BookForm/>}/>
          <Route path="/my-tickets" element={<MyTickets />} />
    </Routes>
      </header>
    </>
  )
}
else{
  return(
    <>
    <header>
          <div className='navbar'>
          
            <nav>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/'>Register</NavLink>
                <NavLink to='/avail'>Flight Availability</NavLink>
                <NavLink to='/book'>Book Ticket</NavLink>
                <NavLink to='/my-tickets'>My Tickets</NavLink>
            </nav>
               
          </div>
          <Routes>
          <Route path='/home' element={<Head/>}/>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/avail' element={<Avail/>}/>
          <Route path='/book' element={<BookForm/>}/>
          <Route path="/my-tickets" element={<MyTickets />} />
    </Routes>
      </header>
    </>
  )
}
}
