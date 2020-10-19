import React, { useContext, useState } from "react";
import UserContext from "../../utils/UserContext";
import axios from "axios";
import "react-dates/initialize";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import { Modal, Button, Form } from "react-bootstrap";

function BookingModal(props) {
  console.log();
  const { id } = useContext(UserContext);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocussedInput] = useState(null);
  const [bookings, setBookings] = useState(props.bookings);

  const blockedDays = (day) => {
    let blocked = false;
    for (let i = 0; i < bookings.length; i++) {
      let start = moment(bookings[i].startDate, moment.ISO_8601);
      let end = moment(bookings[i].endDate, moment.ISO_8601);
      if (day.isBetween(start.subtract(1, "days"), end.add(1, "days"))) {
        blocked = true;
      }
    }
    return blocked;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      user_id: id,
      asset_id: props.asset_id,
      startDate,
      endDate,
    };
    axios
      .post("/api/book", data)
      .then((res) => {
        props.onHide();
        setStartDate(moment());
        setEndDate(moment());
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ opacity: "unset" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Book Item</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <DateRangePicker
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId={props.asset_id} // PropTypes.string.isRequired,
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId={props.asset_id} // PropTypes.string.isRequired,
            onDatesChange={(dates) => {
              setStartDate(dates.startDate);
              setEndDate(dates.endDate);
            }} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={(focusedInput) => setFocussedInput(focusedInput)} // PropTypes.func.isRequired,
            isDayBlocked={blockedDays}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit">
            Book
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default BookingModal;
