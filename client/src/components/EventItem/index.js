import TimeRange from "../TimeRange";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import Media from "react-bootstrap/Media";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./style.css"

class EventItem extends Component {
  render() {
    return (
      <div className='media-div'>
      <Media className="event-item">
      <Row className='justing-content-center mx-0'>
        <Col xs={"12"} md="auto" className='text-center'>
        <Link to={"/event/" + this.props.id}>
          <img
            className="mr-3 event-image"
            src={this.props.image}
            alt=""
          />
        </Link>
          </Col>
          <Col xs={12} md={5}>
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
          </Col>
          </Row>
      </Media>
      </div>
    );
  }
}

export default EventItem;