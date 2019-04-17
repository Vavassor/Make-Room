import React, { Component } from "react";
// import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";

// bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// utils
import Api from "../../utilities/Api";

// css
import "./profileForm.css";



  function ProfileFormModal(props){
    // console.log(props);
    return (
      <>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Row className="my-2">
              <Col xs={6}>
              <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  value={props.userInfo.firstname}
                  onChange={props.handleInputChange}
                  name="firstname"
                />
              </Col>
              <Col xs={6}>
              <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  value={props.userInfo.lastname}
                  onChange={props.handleInputChange}
                  name="lastname"
                />
              </Col>
              </Row>
              <Row className="my-2">
              <Col xs={6}>
              <Form.Label>Youre Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={props.userInfo.email}
                  onChange={props.handleInputChange}
                  name="email"
                />
              </Col>
              <Col xs={6}>
              <Form.Label>Your Web Site</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="WebAddress"
                  value={props.userInfo.website}
                  onChange={props.handleInputChange}
                  name="website"
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Blurb</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows="3"
              placeholder="Pithy Statement 50 Characters or less"
              maxLength="50"
              value={props.userInfo.blurb}
              onChange={props.handleInputChange}
              name="blurb"
            />
          </Form.Group>
          {/* <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>About You</Form.Label>
      <Form.Control as="textarea" rows="3" placeholder="What's Your Story?" />
    </Form.Group> */}
          {/* <FormControl id="formControlsFile"
      type="file" multiple label="File" /> */}
          <Button
            variant="primary"
            type="submit"
            onClick={props.handleFormSubmit}
          >
            Submit
          </Button>
        </Form>
      </>
    );
  }
// }
export default ProfileFormModal;


