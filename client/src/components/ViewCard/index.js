import React, { useState, useContext } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import EditModal from "../EditModal";


function FindCard(props) {
  const { id, email, firstName, lastName } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);


  
  const handleRemove = (event) => {
    event.preventDefault();
    let assetId = event.nativeEvent.target.id;
    axios
      .post("/api/deleteAsset", { assetId: assetId, userId: id })
      .then((res) => {
        props.update();
      })
      .catch((err) => console.log(err));
  };




  return (
    <div>
    <Card style={{ width: "18rem" }} className="box asset-card">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <div className="card-buttons">
          <Button id={props.id} type="button" variant="dark" onClick={() => setModalShow(true)}>Edit</Button>
          <Button
            id={props.id}
            type="button"
            variant="dark"
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      </Card.Body>
    </Card>



    <EditModal

show={modalShow}
onHide={() => setModalShow(false)}
complete={props.update}
name={props.name}
image={props.image}
category={props.category}
description={props.description}
hourly={props.hourly}
daily={props.daily}
assetid={props.id}
/>



</div>
  );
}

export default FindCard;
