import React, {Component} from "react";
import Api from "../utilities/Api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MapContainer from "../components/MapContainer";
import Spinner from "../components/Spinner";
import TimeRange from "../components/TimeRange";

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

          <p><TimeRange startTime={event.startTime} endTime={event.endTime} /></p>
          <p>{event.place.name}</p>
          <p>{event.place.address}</p>
          <p>{event.description}</p>

          <MapContainer
            marker={{
              name: event.place.name,
              position: event.place.position,
            }}
          />
        </div>
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