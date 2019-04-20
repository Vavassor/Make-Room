import React from "react";

// import Jumbotron from "react-bootstrap/Jumbotron";
// import FormControl from "react-bootstrap/FormControl";

// bootstrap components
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// css
import "./portfolioForm.css";



  // function PortolfioImages(props){
    // console.log(props);

    // function saveButton(e){
    //   props.handleFormSubmit(e);
    //   props.handleClose();
    // };


  // export function ImageUpdateForm (props) {
  //   return (
  //     <>
  //       <Form>
  //         <Form.Group controlId="exampleForm.ControlInput1">
  //           <Row className="my-2">
  //             <Col xs={6}>
  //             <Form.Label>First Name</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 placeholder="First name"
  //                 value={props.userInfo.firstname}
  //                 onChange={props.handleInputChange}
  //                 name="firstname"
  //               />
  //             </Col>
  //             <Col xs={6}>
  //             <Form.Label>Last Name</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 placeholder="Last name"
  //                 value={props.userInfo.lastname}
  //                 onChange={props.handleInputChange}
  //                 name="lastname"
  //               />
  //             </Col>
  //             </Row>
  //             <Row className="my-2">
  //             <Col xs={6}>
  //             <Form.Label>Youre Email</Form.Label>
  //               <Form.Control
  //                 type="email"
  //                 placeholder="Email"
  //                 value={props.userInfo.email}
  //                 onChange={props.handleInputChange}
  //                 name="email"
  //               />
  //             </Col>
  //             <Col xs={6}>
  //             <Form.Label>Your Web Site</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 placeholder="WebAddress"
  //                 value={props.userInfo.website}
  //                 onChange={props.handleInputChange}
  //                 name="website"
  //               />
  //             </Col>
  //           </Row>
  //         </Form.Group>
  //         <Form.Group controlId="exampleForm.ControlTextarea1">
  //           <Form.Label>Blurb</Form.Label>
  //           <Form.Control
  //             type="text"
  //             as="textarea"
  //             rows="3"
  //             placeholder="Pithy Statement 50 Characters or less"
  //             maxLength="50"
  //             value={props.userInfo.blurb}
  //             onChange={props.handleInputChange}
  //             name="blurb"
  //           />
  //         </Form.Group>
  //         <Button
  //           variant="primary"
  //           type="submit"
  //           // onClick={props.handleFormSubmit}
  //           onClick={(e) => saveButton(e)}
  //         >
  //           Save!
  //         </Button>
  //       </Form>
  //     </>
  //   );
  // };

  export default function PortfolioInfoForm (props) {
    return (
      <Form>
        <Form.Group controlId="porfolioInfoForm">
          <Form.Label>Portfolio Info:</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows="3"
            placeholder="Info about your art"
            // value={props.portofolioInfo}
            // onChange={props.handleInputChange}
            name="portfolioInfo"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          // onClick={props.handleFormSubmit}
          // onClick={e => saveButton(e)}
        >
          Save!
        </Button>
      </Form>
    );
  };


