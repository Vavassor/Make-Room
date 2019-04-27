import Api from "../utilities/Api";
import Card from "react-bootstrap/Card";
import EventItem from "../components/EventItem";
import {Link} from "react-router-dom";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import moment from "moment";
import React, {Component} from "react";

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
      <main>
        <Card>
          <Card.Body>
            <div className="mb-4">
              <Link className="btn btn-primary" to="/add-event">Add Event</Link>
            </div>

            <hr />

            {this.renderEvents()}
          </Card.Body>
        </Card>
      </main>
    );
  }

  renderEvents() {
    if (this.state.events.length) {
      return this.state.events.map(event => {
        return (
          <EventItem
            key={event._id}
            id={event._id}
            address={event.place.address}
            name={event.name}
            blurb={event.blurb}
            startTime={event.startTime}
            image={event.eventImage}
            endTime={event.endTime}
            placeName={event.place.name}
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
}

export default EventList;