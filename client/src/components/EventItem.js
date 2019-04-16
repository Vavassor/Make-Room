import React, {Component} from "react";
import moment from "moment";

class EventItem extends Component {
  render() {
    return (
      <div>
        <h3 className="card-title">{this.props.name}</h3>
        <time className="card-text" dateTime={this.props.startTime}>
          {moment(this.props.startTime).format("MMM D, Y @ h:mma")}
        </time>
        <p className="card-text">{this.props.address}</p>
      </div>
    );
  }
}

export default EventItem;