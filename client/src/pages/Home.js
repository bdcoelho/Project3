import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import SideNavBar from "../components/SideNavBar";
import { Col, Row } from "react-bootstrap";
import BookedAssetsCard from "../components/BookedAssetsCard";
import MyBookingsCard from "../components/MyBookingsCard";
import axios from "axios";
import moment from "moment";
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

  const formatTime = (timeString)=>{
    let momentTime = moment("2020-10-22T01:00:00.000Z", moment.ISO_8601);
    return momentTime.format("DD-MM-YYYY")
  }


  return (
    <Row>
      <Col md={2} className="pr-0">
        <SideNavBar />
      </Col>
      <Col md={9}>
        <h1 style={{ textAlign: "center" }}> Welcome to your Dashboard </h1>

        <Row>
          <Col>
            <h3>Items you are borrowing</h3>
            {bookingArray.length>0 ? bookingArray.map((booking) => (
              <MyBookingsCard key={booking._id}

              id={booking._id}
              startDate={formatTime(booking.startDate)}
              endDate={formatTime(booking.startDate)}
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
            )):
          <h5>You have no upcoming bookings</h5>
            
            }
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>Items you are lending</h3>
            {console.log(bookedArray)}
            {bookedArray.length>0 ? bookedArray.map((booked) => (
            <BookedAssetsCard 
            key={booked._id}

            id={booked._id}
            assetName={booked.name}
            dailyPrice={booked.dailyPrice}
            image={booked.image}
            borrowerFirstName={booked.borrowerFirstName}
            borrowerLastName={booked.borrowerLastName}
            borrowerStreetNum={booked.borrowerStreetNum}
            borrowerStreetName={booked.borrowerStreetName}
            borrowerSuburb={booked.borrowerSuburb}
            borrowerState={booked.borrowerState}
            borrowerPostCode={booked.borrowerPostCode}
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
