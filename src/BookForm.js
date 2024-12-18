import React, { useState } from "react";
import "./style.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function BookForm() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const userEmail = sessionStorage.getItem("email");
  const [classType, setClassType] = useState("Economy");
  const [ticketCount, setTicketCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setselectedTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mytickets,setMytickets] = ([])
  const [err,setErr]= useState("");

  const navigate = useNavigate();

  const handleClassChange = (event) => {
    setClassType(event.target.value);
    calculateTotalAmount(ticketCount, event.target.value);
  };

  const handleTicketChange = (event) => {
    const count = event.target.value;
    setTicketCount(count);
    calculateTotalAmount(count, classType);
  };

  const handleDepartureChange = (event) => {
    setDeparture(event.target.value);
  };

  const handleArrivalChange = (event) => {
    setArrival(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleTimeChange = (event) => {
    setselectedTime(event.target.value);
  };

  const calculateTotalAmount = (count, classType) => {
    const prices = {
      Economy: 100,
      "Premium Economy": 200,
      Business: 300,
      "First class": 500,
    };
    setTotalAmount(count * prices[classType]);
  };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  


  const handleBookNowClick = async () => {
    const bookingDetails = {
      userEmail,
      departure,
      arrival,
      classType,
      ticketCount,
      totalAmount,
      selectedDate,
      selectedTime
    };
  
    try {
      // Send data to the server
      if(userEmail!=="")
      {
      const response = await axios.post('https://flight-booking-backend-omega.vercel.app/bookings', bookingDetails);
  
      console.log(response.data.message); // Success message
      setIsModalOpen(true);
  
      // Navigate after 2 seconds
      setTimeout(() => {
        navigate("/my-tickets");
      }, 2000);
      }
      else{
        setErr("Plz login ....");
      }
    } catch (error) {
      console.error('Error booking flight:', error.response?.data?.message || 'Server error.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Flight Booking</h2>

      <div className="form-group">
        <label htmlFor="departure" className="form-label">
          Departure Location{" "}
        </label>
        <input
          type="text"
          className="form-control"
          id="departure"
          placeholder="Enter Departure Location"
          value={departure}
          onChange={handleDepartureChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="arrival" className="form-label">
          Arrival Location{" "}
        </label>
        <input
          type="text"
          className="form-control"
          id="arrival"
          placeholder="Enter Arrival Location"
          value={arrival}
          onChange={handleArrivalChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="class" className="form-label">
          Choose a Class{" "}
        </label>
        <select
          name="class"
          id="class"
          className="form-control"
          value={classType}
          onChange={handleClassChange}
          required
        >
          <option value="Economy">Economy</option>
          <option value="Premium Economy">Premium Economy</option>
          <option value="Business">Business</option>
          <option value="First class">First class</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tickets" className="form-label">
          Number of Tickets{" "}
        </label>
        <input
          type="number"
          className="form-control"
          id="tickets"
          min="1"
          value={ticketCount}
          onChange={handleTicketChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Select Date{" "}
        </label>
        <input
          type="date"
          className="form-control"
          id="date"
          min={getTodayDate()}
          value={selectedDate}
          onChange={handleDateChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Select Time{" "}
        </label>
        <input
          type="time"
          className="form-control"
          id="time"
          value={selectedTime}
          onChange={handleTimeChange}
          required
        />
      </div>

      <div className="total-amount">
        <h3>Total Amount: ${totalAmount}</h3>
      </div>

      <button type="submit" className="btn" onClick={handleBookNowClick}>
        Book Now
      </button>
      {err}

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Booking Successful!</h3>
            <p><strong>Departure:</strong> {departure}</p>
            <p><strong>Arrival:</strong> {arrival}</p>
            <p><strong>Class:</strong> {classType}</p>
            <p><strong>Number of Tickets:</strong> {ticketCount}</p>
            <p><strong>Total Amount:</strong> ${totalAmount}</p>
            <p><strong>Date:</strong> {selectedDate}</p>
            <button className="btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
