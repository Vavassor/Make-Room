import TimeRange from "../TimeRange";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import Media from "react-bootstrap/Media";
import "./style.css"

class EventItem extends Component {
  render() {
    return (
      <Media className="event-item">
        <Link to={"/event/" + this.props.id}>
          <img
            className="mr-3 event-image"
            src={this.props.image}
            alt=""
          />
        </Link>
        <Media.Body>
          <h3>
            <Link to={"/event/" + this.props.id}>{this.props.name}</Link>
            <span className="attendee-count" aria-label={this.props.attendeeCount + " attending"}>{this.props.attendeeCount}</span>
          </h3>
          <p><TimeRange startTime={this.props.startTime} endTime={this.props.endTime} /></p>
          <p>{this.props.placeName}</p>
          <p>{this.props.blurb}</p>
        </Media.Body>
      </Media>
    );
  }
}

export default EventItem;