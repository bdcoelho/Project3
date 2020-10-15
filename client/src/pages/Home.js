import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import { Col, Row } from "react-bootstrap";
import BookingCard from "../components/BookingCard";
import BookedCard from "../components/BookedCard";
import axios from "axios";

function Home() {
  const [booked, setBooked] = useState([]);
  const [booking, setBooking] = useState([]);

  const { id, email, firstName, lastName } = useContext(UserContext);
  const retrieveBookings = () => {
    console.log(id);
    if (id) {
      axios
        .get("/api/userBookings/" + id)
        .then((res) => {
          console.log(res);
          // setBooking(res.data);
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
            <BookedCard />
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>Your Bookings</h3>
            <BookingCard />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Home;
