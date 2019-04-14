import React, { Component } from 'react';
import { database } from '../../utilities/firebase';

class EventChat extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
    };

    this.onAddMessage = this.onAddMessage.bind(this);
  }

  currentEvent = "makers market"

  componentWillMount() {
    this.setState({event: this.props.event})
    console.log(this.props);
    const messagesRef = database.ref(this.currentEvent)
      .orderByKey()
      .limitToLast(100);

    messagesRef.on('child_added', snapshot => {
      const message = { text: snapshot.val(), id: snapshot.key };

      this.setState(prevState => ({
        messages: [ message, ...prevState.messages ],
      }));
    });
  }

  onAddMessage(event) {
    event.preventDefault();

    database.ref(this.currentEvent).push(this.input.value);

    this.input.value = '';
  }

  render() {
    return (
      <form onSubmit={this.onAddMessage}>
        <input type="text" ref={node => this.input = node}/>
        <input type="submit"/>
        <ul>
          {this.state.messages.map(message =>
            <li key={message.id}>{message.text}</li>
          )}
        </ul>
      </form>
    );
  }
}

export default EventChat;