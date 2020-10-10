import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";
import { Card, Button} from "react-bootstrap";

function FindCard(props) {
  const { firstName, lastName } = useContext(UserContext);
console.log(props)
  return (
<Card style={{ width: '18rem' }} className="box asset-card">
  <Card.Img variant="top" src={props.image} />
  <Card.Body>
    <Card.Title>{props.name}</Card.Title>
    <Card.Text>
{props.description}
    </Card.Text>
    <div className="card-buttons">
    <Button variant="info">Edit</Button>
    <Button variant="dark">Remove</Button>
    </div>
  </Card.Body>
</Card>
  )
}

export default FindCard;
