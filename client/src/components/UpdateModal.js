import React from "react";

// bootstrap components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


//custom components
import ProfileFormModal from "../components/ProfileFormModal";
import { PortfolioInfoForm, ItemForm } from "../components/PortfolioFormComponent";
import EventForm from "../components/EventForm";


class UpdateModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  multiFunction = (func1, func2, func2Args) => {
    func1();
    if (func2){func2(func2Args)}
  }

  swtichCaseContent(form){
    switch (form){
      case "event":
      return (
        <EventForm {...this.props} handleClose={this.handleClose} />
      );
      case "profile":
      return(
        <ProfileFormModal {...this.props} handleClose={this.handleClose}/>
      );
      // break;
      case"portfolioInfo":
      return(
        <PortfolioInfoForm {...this.props} handleClose={this.handleClose}/>
      );
      // break;
      case "itemInfo":
      return (
        <ItemForm {...this.props} handleClose={this.handleClose}/>
      );
      // break;
      default: return <h2>Nothing to see here...</h2>

    }
  }

  render() {
      return(
        <>
          <Button 
          className="mx-2" 
          variant={this.props.variant? this.props.variant: "primary"} 
          size="sm" 
          onClick={() => this.multiFunction (this.handleShow, this.props.func2, this.props.func2Args)}
          >
          {this.props.icon? this.props.icon :<i className="fas fa-user-edit"></i>}
          </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.task}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.swtichCaseContent(this.props.form)}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
}

export default UpdateModal;