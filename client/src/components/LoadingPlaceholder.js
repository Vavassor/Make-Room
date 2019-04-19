import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import React, {Component} from "react";
import Spinner from "../components/Spinner";

class LoadingPlaceholder extends Component {
  render() {
    switch (this.props.status) {
      case "failure":
        return (
          <Alert variant="danger">
            {this.props.failureMessage}
            <Button
              className="ml-2"
              variant="primary"
              onClick={this.props.handleRetryClick}
            >
              Retry
            </Button>
          </Alert>
        );

      default:
      case "loading":
        return (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        );

      case "success":
        return (
          <h2>{this.props.emptyMessage}</h2>
        );
    }
  }
}

export default LoadingPlaceholder;