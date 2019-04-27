import TimeRange from "../TimeRange";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import Media from "react-bootstrap/Media";
import "./style.css"

class EventItem extends Component {
  render() {
    return (
      <Media className="event-item">
        <img
          className="mr-3 event-image"
          src={this.props.image}
          alt=""
        />
        <Media.Body>
          <Link to={"/event/" + this.props.id}><h3>{this.props.name}</h3></Link>
          <p><TimeRange startTime={this.props.startTime} endTime={this.props.endTime} /></p>
          <p>{this.props.placeName}</p>
          <p>{this.props.blurb}</p>
        </Media.Body>
      </Media>
    );
  }
}

export default EventItem;