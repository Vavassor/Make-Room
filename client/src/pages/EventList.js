import React, {Component} from "react";
import {Link} from "react-router-dom";

// custom components
import EventItem from "../components/EventItem";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import Plax from "../components/ParallaxComponent";

// bootstrap components
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";

// utilities
import moment from "moment";
import Api from "../utilities/Api";

class EventList extends Component {
  constructor(props) {
    super(props);

    this.handleRetryClick = this.handleRetryClick.bind(this);

    this.state = {
      events: [],
      loadStatus: "loading",
    };
  }

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents() {
    Api
      .getEvents({
        orderBy: "startTime:asc",
        afterTime: moment().toISOString(),
      })
      .then(response => {
        this.setState({
          events: response.data,
          loadStatus: "success",
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          loadStatus: "failure",
        });
      });
  }

  handleRetryClick() {
    this.setState(
      {loadStatus: "loading"},
      () => this.loadEvents()
    );
  }

  render() {
    return (
      <>
        {this.renderJumbtron()}
        <Plax>
          <main>
            <Card className="event-list">
              <Card.Body>
                <div className="mb-4">
                  <Link className="btn btn-primary" to="/add-event">
                    Add Event
                  </Link>
                </div>
                <hr />
                {this.renderEvents()}
              </Card.Body>
            </Card>
          </main>
        </Plax>
      </>
    );
  }

  renderEvents() {
    
    if (this.state.events.length) {
      return this.state.events.map(event => {
        return (
          <EventItem
            address={event.place.address}
            blurb={event.blurb}
            attendeeCount={event.attendees.length}
            endTime={event.endTime}
            id={event._id}
            image={event.eventImage}
            key={event._id}
            name={event.name}
            placeName={event.place.name}
            startTime={event.startTime}
          />
        );
      })
    } else {
      return (
        <LoadingPlaceholder
          emptyMessage="No events upcoming."
          failureMessage="Could not load events."
          handleRetryClick={this.handleRetryClick}
          status={this.state.loadStatus}
        />
      );
    }
  }

  renderJumbtron(){
    return (
      <Jumbotron className="profile-jumbo fluid mb-0">
        <Row className="jusitfy-content-center text-center">
          <Col className="jumbo-header">
            <h1>Make Room!</h1>
            <h4>List of Upcoming Events</h4>
          </Col>
        </Row>
      </Jumbotron>
    );
  }
}

export default EventList;