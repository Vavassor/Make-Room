import React, {Component} from "react";
import moment from "moment";
import "./style.css"

class EventItem extends Component {
  render() {
    return (
      <div className="event-item">
        <a href={"/event/" + this.props.id}><h3 className="card-title">{this.props.name}</h3></a>
        <time className="card-text" dateTime={this.props.startTime}>
          {moment(this.props.startTime).format("MMM D, Y @ h:mma")}
        </time>
        <p className="card-text">{this.props.placeName}</p>
        <p className="card-text">{this.props.address}</p>
      </div>
    );
  }
}

export default EventItem;