import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

const colors = ["#0061a8","#fb3640","#1f441e","#f48b29","#ff005c"];

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  if (user.name === name) {
    isSentByCurrentUser = true;
  }

  let isJoinOrDisconnet = user==='';

  return (
    isJoinOrDisconnet
      ? (
        <div className="messageContainer justifyMiddle">
          <div className="messageBox backgroundYellow">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
      :
      isSentByCurrentUser
        ? (
          <div className="messageContainer justifyEnd">
            <div className="messageBox backgroundLightPurple">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
          </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLightGreen">
              <p className="sentText pl-10 " style={{color:colors[user.colorIdx]}}>{user.name}</p>
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
          </div>
        )
  );
}

export default Message;