import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { database } from '../../utilities/firebase';

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"

import "./chat.css"


class EventChat extends Component {

  _isMounted = false;

  constructor() {
    super();

    this.state = {
      isLoading: true,
      messages: [],
      userName:null,
      userId:null,
      eventId:null,
    };

    this.onAddMessage = this.onAddMessage.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    const messagesRef = database.ref(`${this.props.eventId}`)
      .orderByKey()
      .limitToLast(100);

    messagesRef
    .on('child_added', snapshot => {
      // console.log(snapshot.val())
      const message = { 
        id: snapshot.key,
        text: snapshot.val().message, 
        userId: snapshot.val().userId,
        userName: snapshot.val().userName,
      };

      this._isMounted && this.setState(prevState => ({
        messages: [...prevState.messages, message ],
        userName: this.props.userName,
        userId: this.props.userId,
        eventId: this.props.eventId,
        })
        // , () => console.log(this.state)
      );
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    this.scrollToBottom();
    this._isMounted = true
  }

  scrollToBottom() {
    const scrollHeight = this.chatList.scrollHeight;
    const height = this.chatList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.chatList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  onAddMessage(event) {
    event.preventDefault();
    database.ref(`${this.props.eventId}`).push({
      message: this.input.value,
      userId: this.props.userId,
      userName: this.props.userName,
    });
    this.input.value = '';
  }

  renderMessage = () => {

  }

  render() {
    return (
      <div id="chatBox">
        <div
          className="chatList"
          ref={div => {
            this.chatList = div;
          }}
        >
          {/* {console.log(this.state.messages)} */}
          {this.state.messages.map(message => (
            <ChatMessage
              key={message.id}
              {...this.props}
              cMessage={message}
            >
              {message.text}
            </ChatMessage>
          ))}
        </div>
        <div id='chatInput'>
          <form onSubmit={this.onAddMessage}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Chat Message"
                aria-label="Chat Message"
                aria-describedby="basic-addon2"
                ref={node => (this.input = node)}
                onSubmit={this.onAddMessage}
              />
              <InputGroup.Append>
                <Button type="submit" variant="outline-secondary">
                  <span className="d-none d-md-block">Send!</span>
                  <span className="d-block d-md-none">
                    <i className="fas fa-paper-plane" />
                  </span>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </form>
        </div>
      </div>
    );
  }
}

export default EventChat;



function defineClass(p) {
  let className;
  // console.log(p)
  // console.log(p.event.userId, p.cMessage.userId)
  if (p.userId === p.cMessage.userId){
    className = "myChat"
  }else{className="otherChat"}
  return className
}


export const ChatMessage = function (props) {
return (
  <div className={defineClass(props)}>
    <Link to={"/profile/" + props.cMessage.userId}>
      <p key={props.cMessage._id}>
        {props.userId !== props.cMessage.userId &&
          props.cMessage.userName + ": "}{" "}
        {props.children}
      </p>
    </Link>
  </div>
);
}