import React, {Component} from "react";
import moment from "moment";

class TimeRange extends Component {
  render() {
    const startTime = moment(this.props.startTime);
    const endTime = moment(this.props.endTime);

    const start = (
      <time dateTime={this.props.startTime}>
        {startTime.format("ddd, MMM D, Y @ h:mma")}
      </time>
    );

    let end;
    if (startTime.isSame(endTime, "date")) {
      end = (
        <time dateTime={this.props.startTime}>
          {endTime.format("h:mma")}
        </time>
      );
    } else {
      end = (
        <time dateTime={this.props.startTime}>
          {endTime.format("ddd, MMM D, Y @ h:mma")}
        </time>
      );
    }

    return (
      <>{start} to {end}</>
    );
  }
}

export default TimeRange;