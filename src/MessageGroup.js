import React from 'react';
import './MessageGroup.css';
import sender from './profile_alli copy 15@3x.png';
import stranger from './avatar_small copy 3.png';

const MessageGroup = ({ isSender, messages }) => {
  let last = messages[messages.length - 1];
  let icon = isSender ? sender : stranger;
  return (
    <div className={`message-group ${isSender ? 'is-sender' : ''}`}>
      <div>
        <img src={icon} alt="" className="icon" />
      </div>
      <div className="messages">
        {
          messages.map(message => {
            return (
            <div className="message">
              <div className="message-text" >{message.text}</div>
            </div>
            );
          })
        }
        <div className="time">{last.time}</div>
      </div>
    </div>
  );
};
 
export default MessageGroup;
