import React, {Component} from "react";
import Api from "../utilities/Api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: null,
      failedToLoad: false,
    };
  }
  
  componentDidMount() {
    this.loadEvent();
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

  renderContent() {
    const event = this.state.event;

    if (event) {
      return (
        <div>
          <h3 className="card-title">{event.name}</h3>
          {this.renderDateAndTime(event)}
          <p>{event.placeName}</p>
          <p>{event.address}</p>
          <p>{event.description}</p>
        </div>
      );
    } else if (this.state.failedToLoad) {
      return (
        <p>Failed to retrive event information. <Button onClick={() => this.loadEvent()}>Retry</Button></p>
      );
    } else {
      return (
        <progress />
      );
    }
  }

  renderDateAndTime(event) {
    const startTime = moment(event.startTime);
    const endTime = moment(event.endTime);

    const start = (
      <time datetime={event.startTime}>
        {startTime.format("MMM D, Y @ h:mma")}
      </time>
    );

    if (startTime.isSame(endTime, "date")) {
      return (
        <div>
          {start} - <time datetime={event.startTime}>{endTime.format("h:mma")}</time>
        </div>
      );
    } else {
      return (
        <div>
          {start} - <time datetime={event.startTime}>{endTime.format("MMM D, Y @ h:mma")}</time>
        </div>
      );
    }
  }
}

export default Event;