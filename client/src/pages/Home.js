import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import { Col, Row } from "react-bootstrap";
import BookedAssetsCard from "../components/BookedAssetsCard";
import MyBookingsCard from "../components/MyBookingsCard";
import axios from "axios";

function Home() {
  const [bookedArray, setBookedArray] = useState([]);
  const [bookingArray, setBookingArray] = useState([]);

  const { id, email, firstName, lastName } = useContext(UserContext);
  const retrieveBookings = () => {
    console.log(id);
    if (id) {
      axios
        .get("/api/userBookings/" + id)
        .then((res) => {
          console.log(res);
          setBookingArray(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(retrieveBookings, [id]);

  const retrieveBooked = () => {
    console.log(id);
    if (id) {
      axios
        .get("/api/userBooked/" + id)
        .then((res) => {
          console.log(res);
          // setBooked(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(retrieveBooked, [id]);

  return (
    <Row>
      <Col md={2} className="pr-0">
        <SideNavBar />
      </Col>
      <Col md={9}>
        <h1 style={{ textAlign: "center" }}> Welcome to your Dashboard </h1>

        <Row>
          <Col>
            <h3>Your Booked Items</h3>
            {bookingArray.length>0 ? bookingArray.map((booking) => (
              <MyBookingsCard key={booking.id}

              id={booking.id}
              assetName={booking.name}
              dailyPrice={booking.dailyPrice}
              image={booking.image}
              ownerFirstName={booking.ownerFirstName}
              ownerLastName={booking.ownerLastName}
              ownerStreetNum={booking.ownerStreetNum}
              ownerStreetName={booking.ownerStreetName}
              ownerSuburb={booking.ownerSuburb}
              ownerState={booking.ownerState}
              ownerPostCode={booking.ownerPostCode}
              />
            )):
          <h5>You have no upcoming bookings</h5>
            
            }
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>Your Bookings</h3>
            {bookedArray.length>0 ? bookedArray.map((booked) => (
            <BookedAssetsCard 
            
            />
            )) :
            <h5>You have no assets booked by other users</h5>
            
          }

          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Home;
