import React from "react";
import Card from "./Card";
import "./Head.css";

export default function Avail() {
  return (
    <>
      <div className="avail-container">

        <Card image="https://png.pngtree.com/thumb_back/fw800/background/20231001/pngtree-d-rendered-image-booking-airline-tickets-online-with-calendar-for-tourism-image_13549511.png" sd="Gannavaram - Delhi" />
        <Card image="https://blog-content.ixigo.com/wp-content/uploads/2023/03/How-to-book-flight-tickets-online.jpeg" sd="Gannavaram - Mumbai"/>
   
        <Card image="https://www.flamingotravels.co.in/blog/wp-content/uploads/2022/01/Main_image3.jpg" sd="Gannavaram - Pune"/>
        <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJTHqg8cSCvs-11dgvqPRxF18f_xSzk7mgkg&s" sd="Gannavaram - Bengaluru"/>
        
      </div>
    </>
  );
}
