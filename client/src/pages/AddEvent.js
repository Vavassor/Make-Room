import Api from "../utilities/Api";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import EventForm from "../components/EventForm";
import React, {Component} from "react";
import Row from "react-bootstrap/Row";

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.submitEvent = this.submitEvent.bind(this);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={{span: 6, offset: 3}} className="pt-3 pb-5">
            <EventForm
              submitButtonText="Add Event"
              handleFormSubmit={this.submitEvent}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  submitEvent(event) {
    Api
      .createEvent(event)
      .then(response => {
        this.props.history.push(`/event/${response.data._id}`);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default AddEvent;