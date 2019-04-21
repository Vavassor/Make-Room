import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PortfolioInfoForm, ItemForm } from "../components/PortfolioFormComponent";
import ProfileFormModal from "../components/ProfileFormModal";
import React, {Component} from "react";

class UpdateModal extends Component {
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

  swtichCaseContent(form){
    switch (form){
      case "profile":
      return(
        <ProfileFormModal {...this.props} handleClose={this.handleClose}/>
      )
      
      case"portfolioInfo":
      return(
        <PortfolioInfoForm {...this.props} handleClose={this.handleClose}/>
      )

      case "itemInfo":
      return (
        <ItemForm {...this.props} handleClose={this.handleClose}/>
      )
    }
  }

  render() {
    return(
      <>
        <Button className="mx-2" variant={this.props.variant? this.props.variant: "primary"} size="sm" onClick={this.handleShow}>
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