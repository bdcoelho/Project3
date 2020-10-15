import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import UserContext from "../../utils/UserContext";
import axios from "axios";
import "react-dates/initialize";
import moment from 'moment';
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
  console.log(moment());
  console.log(props);
  const { id, email, firstName, lastName, lng, lat } = useContext(UserContext);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocussedInput] = useState(startDate);

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
      <Modal.Body>
        <DateRangePicker
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId={props.id} // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId={props.id} // PropTypes.string.isRequired,
          onDatesChange={(startDate, endDate) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }} // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={(focusedInput) => setFocussedInput(focusedInput)} // PropTypes.func.isRequired,
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookingModal;
