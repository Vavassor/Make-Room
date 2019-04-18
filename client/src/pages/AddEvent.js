import Api from "../utilities/Api";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import moment from "moment";
import React, {Component} from "react";
import Row from "react-bootstrap/Row";

const defaultErrors = {
  address: "Please enter a street address.",
  description: "Please add a description.",
  endDate: "Please choose the end date.",
  endTime: "Please choose the end time.",
  locationName: "Please enter a location name.",
  name: "Please enter a name.",
  startDate: "Please choose the start date.",
  startTime: "Please choose the start time.",
};

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      address: "",
      description: "",
      endDate: "",
      endTime: "",
      errors: defaultErrors,
      locationName: "",
      name: "",
      sameDates: false,
      startDate: "",
      startTime: "",
      validated: false,
    };

    this.form = React.createRef();
  }

  handleCheckChange(event) {
    const {name, checked} = event.target;
    this.setState({
      [name]: checked,
    });
  }

  handleInputChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const passedValidation = this.form.current.checkValidity();
    this.setState({validated: true});

    if (passedValidation) {
      let endDate = this.state.endDate;
      if (this.state.sameDates) {
        endDate = this.state.startDate;
      }

      const endTime = moment(endDate + " " + this.state.endTime);
      const startTime = moment(this.state.startDate + " " + this.state.startTime);

      const event = {
        description: this.state.description.trim(),
        endTime: endTime.toISOString(),
        name: this.state.name.trim(),
        place: {
          address: this.state.address.trim(),
          name: this.state.locationName.trim(),
        },
        startTime: startTime.toISOString(),
      };

      Api
        .createEvent(event)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={{span: 6, offset: 3}} className="pt-3 pb-5">
            <Form
              noValidate
              onSubmit={this.handleSubmit}
              ref={this.form}
              validated={this.state.validated}
            >
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  rows="4"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="location-name">
                <Form.Label>Location Name</Form.Label>
                <Form.Control
                  type="text"
                  name="locationName"
                  value={this.state.locationName}
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.locationName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="address">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Col>
                  <Form.Group controlId="start-date">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={this.state.startDate}
                      onChange={this.handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {this.state.errors.startDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="start-time">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="startTime"
                      value={this.state.startTime}
                      onChange={this.handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {this.state.errors.startTime}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col>
                  <Form.Group controlId="end-date">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={this.state.sameDates ? this.state.startDate : this.state.endDate}
                      onChange={this.handleInputChange}
                      disabled={this.state.sameDates}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {this.state.errors.endDate}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="same-dates">
                    <Form.Check
                      type="checkbox"
                      name="sameDates"
                      onChange={this.handleCheckChange}
                      label="Same as the start date."
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="end-time">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="endTime"
                      value={this.state.endTime}
                      onChange={this.handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {this.state.errors.endTime}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Button type="submit">Add Event</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddEvent;