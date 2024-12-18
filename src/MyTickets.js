import React, { useEffect, useState } from "react";
import axios from "axios";
import './tickets.css'
export default function MyTickets() {
  const [bookings, setBookings] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  // const userEmail =  // Replace dynamically if needed
  const userEmail = sessionStorage.getItem("email");


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("https://flightbooking-ebx7.onrender.com/bookings", {
          params:{userEmail }
        });
        setBookings(response.data.bookings || []); // Ensure it's an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setError("Failed to fetch bookings. plz login / check account");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  return (
    <>
    <h2 style={{textAlign:"center"}}>My Tickets</h2>
    <div className="tickets-container">
      
      {loading && <p className="loading">Loading tickets...</p>}
      {error && <p className="error">{error}</p>}
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div className="ticket-card" key={booking._id}>
            <p><strong>Departure:</strong> {booking.departure}</p>
            <p><strong>Arrival:</strong> {booking.arrival}</p>
            <p><strong>Class:</strong> {booking.classType}</p>
            <p><strong>Tickets:</strong> {booking.ticketCount}</p>
            <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
            <p><strong>Date:</strong> {booking.selectedDate}</p>
            <p><strong>Time:</strong> {booking.selectedTime}</p>
          </div>
        ))
      ) : (
        !loading && <p className="no-bookings">No bookings found.</p>
      )}
    </div>
    </>
  );
}
