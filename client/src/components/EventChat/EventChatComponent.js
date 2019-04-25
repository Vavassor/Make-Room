import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { database } from '../../utilities/firebase';

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
      <>
        <div 
        className="chat-list"
        ref={(div) => {
          this.chatList = div;
        }}
        >
            {console.log(this.state.messages)}
            {this.state.messages.map(message => (
              <ChatMessage key={message.id} {...this.props} cMessage={message}>{message.text}</ChatMessage>
            ))}
        </div>
          <form onSubmit={this.onAddMessage}>
            <input type="text" ref={node => (this.input = node)} />
            <input type="submit" />
          </form>
      </>
    );
  }
}

export default EventChat;

function defineClass(p) {
  return
  console.log(p)
}

export const ChatMessage = function (props) {
return (
  <div className={defineClass(props)}>
    <p key={props.cMessage.id}>{props.children}</p>
  </div>
)
}