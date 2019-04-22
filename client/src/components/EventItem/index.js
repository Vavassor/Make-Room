import TimeRange from "../TimeRange";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./style.css"

class EventItem extends Component {
  render() {
    return (
      <div className="event-item">
        <Link to={"/event/" + this.props.id}><h3 className="card-title">{this.props.name}</h3></Link>
        <p><TimeRange startTime={this.props.startTime} endTime={this.props.endTime} /></p>
        <p className="card-text">{this.props.placeName}</p>
      </div>
    );
  }
}

export default EventItem;