import React, {Component} from "react";
import {Link} from "react-router-dom";

// bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

// utils
import Api from "../utilities/Api";
import Help from "../utilities/Helpers";

// custom components
import TimeRange from "../components/TimeRange";
import MapContainer from "../components/MapContainer";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import EventChat from "../components/EventChat";
import UpdateModal from "../components/UpdateModal";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: null,
      failedToLoad: false,
      selfId: null,
      userName: null,
      loadStatus: "loading",
      uploadProgress: 0,
    };

    this.handleAttend = this.handleAttend.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleStopAttending = this.handleStopAttending.bind(this);
    this.updateUploadProgress = this.updateUploadProgress.bind(this);
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
      .updateEvent(event, this.updateUploadProgress)
      .then((response) => {
        this.loadEvent();
        this.setState({uploadProgress: 0});
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
    const event = this.state.event;
    const selfId = this.state.selfId;

    return event ? (
      <div>
        <Jumbotron className="profile-jumbo fluid mx-0">
          <Row className="jusitfy-content-center text-center">
            <Col className="jumbo-header">
              <h1>{this.state.event.name || ""}</h1>
              <h4>{this.state.event.place.name || ""}</h4>
              <p>
                <TimeRange
                  startTime={event.startTime}
                  endTime={event.endTime}
                />
              </p>
            </Col>
          </Row>
        </Jumbotron>
        <div className="container-fluid">
          <Row className="justify-content-center mb-3 mx-0">
            <Col
              id="attendee-chat-col"
              className="event-sidebar mb-3 mt-3 mt-lg-0"
              xs={{ span: 12, order: 2 }}
              md={{ span: 6, order: 2 }}
              lg={{ span: 3, order: 1 }}
            >
              <Row className='justify-content-center mx-0 chat-attendee-row'>
                <Col xs={12} className="attending-col text-center px-0 mb-2 mb-md-0">
                  {this.renderAttendees(event)}
                </Col>
                <Col xs={12} className="chat-col px-0">
                  {this.renderChatAndAttendeeArea(event)}
                </Col>
              </Row>
            </Col>
            <Col
              className="event-col"
              xs={{ span: 12, order: 1 }}
              md={{ span: 12, order: 1 }}
              lg={{ span: 6 }}
            >
              <Card>
                {this.renderEventContent(event, selfId)}
              </Card>
            </Col>
            <Col
              className="event-sidebar map-col"
              xs={{ span: 12, order: 3 }}
              md={{ span: 6, order: 3 }}
              lg={{ span: 3 }}
            >
              {this.renderMap(event)}
            </Col>
          </Row>
        </div>
      </div>
    ) : (
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
          className="event-button"
          variant="danger"
          onClick={this.handleStopAttending}
          aria-label="Stop attending"
        >
        <i className="fas fa-minus"></i>
        </Button>
      );
    } else {
      return (
        <Button
          className='event-button'
          variant="success"
          onClick={this.handleAttend}
          aria-label="Attend"
        >
          <i className="fas fa-plus"></i>
        </Button>
      );
    }
  }

  renderEventContent(event, selfId) {
    return (
      <>
        <a
          href={event.eventImage}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Card.Img variant="top" src={event.eventImage} />
        </a>
        <Card.Body>
          <h3 className="card-title">
            {event.name}
            {event && selfId && event.creator === selfId && (
              <UpdateModal
                className="event-button"
                form={"event"}
                task={"Edit Event"}
                handleFormSubmit={this.handleEdit}
                event={this.state.event}
                uploadProgress={this.state.uploadProgress}
                submitButtonText="Edit Event"
              />
            )}
          </h3>

          <p>
            <TimeRange
              startTime={event.startTime}
              endTime={event.endTime}
            />
          </p>
          <p>{event.place.name}</p>
          <p>{event.place.address}</p>
          <p>{Help.addLineBreaks(event.description)}</p>
        </Card.Body>
      </>
    );
  }

  renderMap(event){
    return (
      <MapContainer
        marker={{
          name: event.place.name,
          position: event.place.position,
        }}
      />
    );
  }

  renderAttendees(event){
    return (
      <>
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
      </>
    );
  }

  renderChatAndAttendeeArea(event){
    return (
      <EventChat
        event={event}
        eventId={event._id}
        userId={this.state.selfId}
        userName={this.state.userName}
      />
    );
  }

  updateUploadProgress(event) {
    this.setState({
      uploadProgress: Math.round((100 * event.loaded) / event.total),
    });
  }
}

export default Event;