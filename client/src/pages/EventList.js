import React, {Component} from "react";
import {Link} from "react-router-dom";

// custom components
import EventItem from "../components/EventItem";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import Plax from "../components/ParallaxComponent";

// bootstrap components
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
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
        <Container className="text-center">
          <h1>Upcoming Events</h1>
        </Container>
      </Jumbotron>
    );
  }
}

export default EventList;