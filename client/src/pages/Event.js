import React, {Component} from "react";
import Api from "../utilities/Api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import MapContainer from "../components/MapContainer";
import Row from "react-bootstrap/Row";
import Spinner from "../components/Spinner";
import TimeRange from "../components/TimeRange";
import UpdateModal from "../components/UpdateModal";
import Help from "../utilities/Helpers";


class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: null,
      failedToLoad: false,
      selfId: null,
    };

    this.handleAttend = this.handleAttend.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleStopAttending = this.handleStopAttending.bind(this);
  }
  
  componentDidMount() {
    this.loadEvent();
    
    Api
      .getSelf()
      .then(response => this.setState({selfId: response.data.id}))
      .catch(error => console.error(error));
  }

  handleAttend(event) {
    Api
      .attendEvent(this.state.event)
      .then(response => this.loadEvent())
      .catch(error => console.error(error));
  }

  handleEdit(event, closeForm) {
    event._id = this.state.event._id;

    Api
      .updateEvent(event)
      .then((response) => {
        this.loadEvent();
        closeForm();
      })
      .catch(error => console.error(error));
  }

  handleStopAttending(event) {
    Api
      .stopAttendingEvent(this.state.event)
      .then(response => this.loadEvent())
      .catch(error => console.error(error));
  }

  loadEvent() {
    const {id} = this.props.match.params;

    Api
      .getEventById(id)
      .then((response) => {
        this.setState({
          failedToLoad: false,
          event: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          failedToLoad: true,
        });
        console.error(error);
      });
  }

  render() {
    return (
      <Card>
        <Card.Body>
          {this.renderContent()}
        </Card.Body>
      </Card>
    );
  }

  renderAttendButton() {
    let attending = false;
    if (this.state.event) {
      const attendee = this.state.event.attendees.find((attendee) => {
        return attendee._id === this.state.selfId;
      });
      attending = attendee !== undefined;
    }

    if (attending) {
      return (
        <Button
          variant="primary"
          onClick={this.handleStopAttending}
        >
          Stop Attending
        </Button>
      );
    } else {
      return (
        <Button
          variant="primary"
          onClick={this.handleAttend}
        >
          Attend
        </Button>
      );
    }
  }

  renderContent() {
    const event = this.state.event;

    if (event) {
      return (
        <>
          <Row>
            <Col>
              <UpdateModal
                form={"event"}
                task={"Edit Event"}
                handleFormSubmit={this.handleEdit}
                event={this.state.event}
                submitButtonText="Edit Event"
              />

              <h3 className="card-title">{event.name}</h3>

              <p><TimeRange startTime={event.startTime} endTime={event.endTime} /></p>
              <p>{event.place.name}</p>
              <p>{event.place.address}</p>
              <p>{Help.addLineBreaks(event.description)}</p>
            </Col>

            <Col>
              <div className="mb-3">
                {this.renderAttendButton()}
              </div>
              
              <div className="attendee-list-shadow">
                <ListGroup className="attendee-list">
                  {
                    event.attendees.map((attendee) => {
                      return (
                        <ListGroup.Item key={attendee._id}>
                          <Link to={"/profile/" + attendee._id}>{attendee.firstname} {attendee.lastname}</Link>
                        </ListGroup.Item>
                      );
                    })
                  }
                </ListGroup>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <MapContainer
                marker={{
                  name: event.place.name,
                  position: event.place.position,
                }}
              />
            </Col>
          </Row>
        </>
      );
    } else if (this.state.failedToLoad) {
      return (
        <p>Failed to retrive event information. <Button onClick={() => this.loadEvent()}>Retry</Button></p>
      );
    } else {
      return (
        <Spinner />
      );
    }
  }
}

export default Event;