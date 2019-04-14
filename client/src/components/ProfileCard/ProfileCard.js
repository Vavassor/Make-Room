import React from "react";

import Card from "react-bootstrap/Card";

import "./profileCard.css"




function ProfileCard(props){
  return (
    <Card {...props}>
      <Card.Img variant="top" src="https://via.placeholder.com/400"/>
      <Card.Body>
        <Card.Title>This is one of my portfolio Items</Card.Title>
        <Card.Text>Here is some info about my portfolio Item</Card.Text>
      </Card.Body>
    </Card>
  )

}


export default ProfileCard;