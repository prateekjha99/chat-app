import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

const colors = ["#0061a8","#fb3640","#2a7528","#f48b29","#ff005c"];

const Message = ({ message: { msg, user }, name }) => {
  let isSentByCurrentUser = false;
  if (user.name === name) {
    isSentByCurrentUser = true;
  }

  let isJoinOrDisconnet = user==='';
  let isTextMessage = msg.fileName===undefined;

  return (
    isJoinOrDisconnet
      ? (
        <div className="messageContainer justifyMiddle">
          <div className="messageBox backgroundYellow">
            <p className="messageText colorDark" style={{margin: "0.5em"}}>{ReactEmoji.emojify(msg)}</p>
          </div>
        </div>
      )
      :
      isSentByCurrentUser
        ? (
          <div className="messageContainer justifyEnd">
            { isTextMessage 
                ?
                  <div className="messageBox backgroundLightPurple">
                    <p className="messageText colorDark" style={{marginBottom: "0.5em", marginTop: "0.5em"}}>{ReactEmoji.emojify(msg)}</p>
                  </div>
                :
                  <img src={msg.file} alt={msg.fileName}  style={{ display:"inline-block", margnBottom: "5px", maxWidth: "60%", margin: "10px 0px" }} />
              }
          </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLightGreen" style={{padding:"auto"}}>
              <p className="sentText" style={{color:colors[user.colorIdx], marginBottom: "0px", marinTop: "0.2em"}}>{user.name}</p>
              { isTextMessage 
                ?
                  <p className="messageText colorDark" style={{ marginBottom: "0.3em", marginTop:"0.2em"}}>{ReactEmoji.emojify(msg)}</p>
                :
                  <img src={msg.file} alt={msg.fileName} style={{display:"inline-block", margnBottom: "5px", maxWidth: "100%", margin: "5px auto"}} />
              }
            </div>
          </div>
        )
  );
}

export default Message;