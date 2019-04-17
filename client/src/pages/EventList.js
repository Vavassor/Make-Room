import React, {Component} from "react";
import Api from "../utilities/Api";
import Card from "react-bootstrap/Card";
import EventItem from "../components/EventItem";
import moment from "moment";

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    Api
      .getEvents({
        orderBy: "startTime:asc",
        afterTime: moment().toISOString(),
      })
      .then(response => {
        this.setState({events: response.data});
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <main>
        <Card>
          <Card.Body>
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
            address={event.address}
            name={event.name}
            startTime={event.startTime}
            placeName={event.placeName}
          />
        );
      })
    } else {
      return (
        <h2>No events upcoming.</h2>
      );
    }
  }
}

export default EventList;