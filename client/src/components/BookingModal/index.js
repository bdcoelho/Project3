import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import UserContext from "../../utils/UserContext";
import axios from "axios";
import "react-dates/initialize";
import moment from "moment";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";

function BookingModal(props) {
  console.log(props)
  const { id, email, firstName, lastName, lng, lat } = useContext(UserContext);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocussedInput] = useState(null);

  const blockedDays = (day) => {
    let blockedDays = ["20 Oct 2020"];
    return blockedDays.includes(day.format("DD MMM YYYY"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      user_id: id,
      asset_id: props.asset_id,
      startDate,
      endDate
    };
console.log(data);
    axios
      .post("/api/book", data)
      .then((res) => {
        console.log(res);
        props.onHide();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
          <Button type="submit">Book</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default BookingModal;
