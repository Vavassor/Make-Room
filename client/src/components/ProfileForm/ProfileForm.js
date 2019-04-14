import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./profileForm.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array

class ProfileForm extends Component {
  render(){
    return (
      <>
      <Jumbotron><h1>This is your Profile Creation Page</h1></Jumbotron>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
        <Row>
          <Col>
            <Form.Control placeholder="Email" />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
        </Row>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Blurb</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="Pithy Statement 140 Characters or less" maxlength="140" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>About You</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="What's Your Story?" />
        </Form.Group>
        <FormControl id="formControlsFile"
          type="file" multiple label="File" />
            <Button variant="primary" type="submit">Submit</Button>
      </Form>
      </>
    )
  }
}
export default ProfileForm;