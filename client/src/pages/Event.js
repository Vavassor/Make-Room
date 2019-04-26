import React, {Component} from "react";
import Api from "../utilities/Api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import ListGroup from "react-bootstrap/ListGroup";
import MapContainer from "../components/MapContainer";
import Row from "react-bootstrap/Row";
import TimeRange from "../components/TimeRange";
import UpdateModal from "../components/UpdateModal";
import Help from "../utilities/Helpers";

import EventChat from "../components/EventChat";



class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: null,
      failedToLoad: false,
      selfId: null,
      userName: null,
      loadStatus: "loading",
    };

    this.handleAttend = this.handleAttend.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleStopAttending = this.handleStopAttending.bind(this);
  }
  
  componentDidMount() {
    this.loadEvent();
    
    Api
      .getSelf()
      .then(response => {
        this.setState({
          selfId: response.data.id,
          userName: response.data.username
        })
      })
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
          loadStatus: "success",
          event: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          loadStatus: "failure",
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
          variant="danger"
          onClick={this.handleStopAttending}
        >
        <i className="fas fa-minus"></i>
        </Button>
      );
    } else {
      return (
        <Button
          variant="success"
          onClick={this.handleAttend}
        >
          <i className="fas fa-plus"></i>
        </Button>
      );
    }
  }

 

  renderContent() {
    const event = this.state.event;
    const selfId = this.state.selfId;

    if (event) {
      return (
        <>
          <Row>
            <Col md={12} lg={4} className="event-col">
              {event && selfId && event.creator === selfId && (
                <UpdateModal
                  form={"event"}
                  task={"Edit Event"}
                  handleFormSubmit={this.handleEdit}
                  event={this.state.event}
                  submitButtonText="Edit Event"
                />
              )}

              <h3 className="card-title">{event.name}</h3>

              <p>
                <TimeRange
                  startTime={event.startTime}
                  endTime={event.endTime}
                />
              </p>
              <p>{event.place.name}</p>
              <p>{event.place.address}</p>
              <p>{Help.addLineBreaks(event.description)}</p>
            </Col>

            <Col xs={12} md={6} lg={4} className="attending-col text-center">
              <Row>
                <Col xs={12}>
                  <div className="mb-3">
                    <h3>Attendees{this.renderAttendButton()}</h3>
                  </div>

                  <div className="attendee-list-shadow">
                    <ListGroup className="attendee-list">
                      {event.attendees.length ? (
                        event.attendees.map(attendee => {
                          return (
                            <ListGroup.Item key={attendee._id}>
                              <Link to={"/profile/" + attendee._id}>
                                {Help.renderName(attendee)}
                              </Link>
                            </ListGroup.Item>
                          );
                        })
                      ) : (
                        <ListGroup.Item style={{ color: "red" }}>
                          No One is Attending Yet!
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </div>
                </Col>
                <Col xs={12} className="chat-col">
                  <EventChat event={this.state.event} eventId = {this.state.event._id} userId={this.state.selfId} userName={this.state.userName}/>
                </Col>
              </Row>
            </Col>

            <Col xs={12} md={6} lg={4} className="map-col">
              <MapContainer
                marker={{
                  name: event.place.name,
                  position: event.place.position
                }}
              />
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <Row>
          <Col>
            <LoadingPlaceholder
              emptyMessage="Event not found."
              failureMessage="Could not load event information."
              handleRetryClick={this.handleRetryClick}
              status={this.state.loadStatus}
            />
          </Col>
        </Row>
      );
    }
  }
}

export default Event;