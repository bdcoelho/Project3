import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import { Col, Row, Container } from "react-bootstrap";
import BookedAssetsCard from "../components/BookedAssetsCard";
import MyBookingsCard from "../components/MyBookingsCard";
import axios from "axios";
import timeHandle from "../utils/timeHandle";
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
          setBookedArray(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(retrieveBooked, [id]);
  console.log(
    "---------------------------------------------------------------------------------------"
  );

  console.log(
    timeHandle.numDays("2020-10-22T01:00:00.000Z", "2020-10-22T01:00:00.000Z")
  );

  return (
    <Container
      fluid
      style={{ paddingLeft: "0" }}
      className="full-height-container"
    >
      <Row className="full-height">
        <Col md={2} className="pr-0">
          <SideNavBar />
        </Col>
        <Col md={9}>
          <Container>
            <h1 className="home-heading"> Welcome to your Dashboard </h1>
            <Row>
              <div className="header-bar"></div>
            </Row>
            <Row className="section-spacing">
              <Col>
                <h3 className="section-heading">Items you are borrowing</h3>
                {bookingArray.length > 0 ? (
                  bookingArray.map((booking) => (
                    <MyBookingsCard
                      key={booking._id}
                      id={booking._id}
                      email={booking.ownerEmail}
                      numberDays={timeHandle.numDays(
                        booking.startDate,
                        booking.endDate
                      )}
                      totalPrice={
                        timeHandle.numDays(booking.startDate, booking.endDate) *
                        booking.dailyPrice
                      }
                      startDate={timeHandle.formatTime(booking.startDate)}
                      endDate={timeHandle.formatTime(booking.endDate)}
                      assetName={booking.name}
                      dailyPrice={booking.dailyPrice}
                      image={booking.image}
                      firstName={booking.ownerFirstName}
                      lastName={booking.ownerLastName}
                      streetNum={booking.ownerStreetNum}
                      streetName={booking.ownerStreetName}
                      suburb={booking.ownerSuburb}
                      state={booking.ownerState}
                      postCode={booking.ownerPostCode}
                    />
                  ))
                ) : (
                  <h5>You have no upcoming bookings</h5>
                )}
              </Col>
            </Row>
            <Row>
              <div className="header-bar"></div>
            </Row>
            <Row className="section-spacing">
              <Col>
                <h3 className="section-heading">Items you are lending</h3>
                {console.log(bookedArray)}
                {bookedArray.length > 0 ? (
                  bookedArray.map((booked) => (
                    <BookedAssetsCard
                      key={booked._id}
                      id={booked._id}
                      assetName={booked.name}
                      dailyPrice={booked.dailyPrice}
                      image={booked.image}
                      firstName={booked.borrowerFirstName}
                      lastName={booked.borrowerLastName}
                      email={booked.borrowerEmail}
                      numberDays={timeHandle.numDays(
                        booked.startDate,
                        booked.endDate
                      )}
                      totalPrice={
                        timeHandle.numDays(booked.startDate, booked.endDate) *
                        booked.dailyPrice
                      }
                      startDate={timeHandle.formatTime(booked.startDate)}
                      endDate={timeHandle.formatTime(booked.endDate)}
                      streetNum={booked.borrowerStreetNum}
                      streetName={booked.borrowerStreetName}
                      suburb={booked.borrowerSuburb}
                      state={booked.borrowerState}
                      postCode={booked.borrowerPostCode}
                    />
                  ))
                ) : (
                  <h5>You have no assets booked by other users</h5>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
