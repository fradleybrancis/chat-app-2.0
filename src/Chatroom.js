import React from 'react';
import './Chatroom.css';
import socketIOClient from 'socket.io-client';
import send from './baseline-send-24px.svg';
import sender from './profile_alli copy 15@3x.png';
import { makeMessageGroups } from './util.js';
import MessageGroup from './MessageGroup.js';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
      recipient: '[ Empty ]',
    };

    this.updateText = this.updateText.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.appendMessage = this.appendMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.addRecipient = this.addRecipient.bind(this);
    this.myRef = React.createRef();
  };

  componentDidMount() {
    const { username } = this.props;
    this.socket = socketIOClient('/');
    this.socket.emit('add user', username);
    this.socket.on('append message', this.appendMessage);
    this.socket.on('add recipient', this.addRecipient);
  };

  componentDidUpdate() {
    this.scrollToBottom();
  };

  scrollToBottom() {
    this.myRef.scrollIntoView({ behavior: 'smooth' });
  };

  addRecipient(user) {
    const { recipient } = this.state;
    if (recipient === '[ Empty ]') this.setState({ recipient: user });
  };

  sendMessage(event) {
    event.preventDefault();
    let date = new Date();
    let minutes = date.getMinutes();
    let hour = date.getHours();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour >= 12 ? hour - 12 : hour;
    let time = `${hour}:${minutes} ${ampm}`
    const { text } = this.state;
    const { username } = this.props;
    if (text === '') return;
    this.socket.emit('append message', { username, text, time });
    this.setState({ text: '' });
  };

  appendMessage(msg) {
    const { messages } = this.state;
    this.setState({ messages: [...messages, msg] });
  };

  updateText(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { messages, text, recipient } = this.state;
    const { username } = this.props;
    let messageGroups = makeMessageGroups(messages);
    return (
    <div className="page">
      <div className="headline">
        <header className="headline-text">{recipient}</header>
      </div>
      <div className="chat-container">    
        <div className="chat">
          {
            messageGroups.map((messageGroup, index) => {
              let isSender = messageGroup.username === username;
              return (
                <MessageGroup isSender={isSender} messages={messageGroup.messages}/>
              );
            })
          }
          <div ref={(el) => { this.myRef = el; }} />
        </div>
      </div>
      <form className="draft" onSubmit={this.sendMessage}>
          <input autoFocus autoComplete="off" type="text" value={text} name="text" onChange={this.updateText} style={{ width: '100%'}}/>
          <button className="send"><img src={send} alt=""/></button>
      </form>
    </div>
    );
  };
};

export default Chatroom;