import React from "react";
import Form from "react-bootstrap/Form";

// bootstrap components
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// css
import "./profileForm.css";



  function ProfileFormModal(props){
    // console.log(props);

    function saveButton(e){
      props.handleFormSubmit(e);
      props.handleClose();
    };


    return (
      <>
        <Form>
          <Form.Row className="my-2">
            <Col xs={6}>
              <Form.Group controlId="first-name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  value={props.userInfo.firstname}
                  onChange={props.handleInputChange}
                  name="firstname"
                />
              </Form.Group>
            </Col>

            <Col xs={6}>
              <Form.Group controlId="last-name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  value={props.userInfo.lastname}
                  onChange={props.handleInputChange}
                  name="lastname"
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row className="my-2">
            <Col xs={12} md={6}>
              <Form.Group controlId="email">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={props.userInfo.email}
                  onChange={props.handleInputChange}
                  name="email"
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="website">
                <Form.Label>Your Web Site</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="WebAddress"
                  value={props.userInfo.website}
                  onChange={props.handleInputChange}
                  name="website"
                />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
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
            </Col>
          </Form.Row>
          
          <Button
            variant="primary"
            type="submit"
            // onClick={props.handleFormSubmit}
            onClick={(e) => saveButton(e)}
          >
            Save!
          </Button>
        </Form>
      </>
    );
  }
// }
export default ProfileFormModal;


