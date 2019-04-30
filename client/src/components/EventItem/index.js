import TimeRange from "../TimeRange";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import Media from "react-bootstrap/Media";
import "./style.css"

class EventItem extends Component {
  render() {
    return (
      <div className='media-div'>
      <Media className="event-item align-items-center flex-column flex-sm-row flex-md-column flex-lg-row">
        <Link to={"/event/" + this.props.id}>
          <img
            className="mr-3 event-image pb-3 pb-sm-0 pb-md-3 pb-lg-0"
            src={this.props.image}
            alt={this.props.name}
          />
        </Link>
        <Media.Body>
          <h3>
            <Link to={"/event/" + this.props.id}>{this.props.name}</Link>
            <span className="attendee-count">
              {this.props.attendeeCount} <span className="sr-only">Attending</span>
            </span>
          </h3>
          <p><TimeRange startTime={this.props.startTime} endTime={this.props.endTime} /></p>
          <p>{this.props.placeName}</p>
          <p>{this.props.blurb}</p>
        </Media.Body>
      </Media>
      </div>
    );
  }
}

export default EventItem;