import React,{useEffect, useState} from 'react';
import Picker, {SKIN_TONE_DARK} from 'emoji-picker-react';
import {GrEmoji} from 'react-icons/gr';
import {FaRegKeyboard} from 'react-icons/fa';
import {BiSend} from 'react-icons/bi';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = React.createRef();

  const onEmojiClick = (event, {emoji}) => {
        inputRef.current.focus();
        const message = inputRef.current.value;
        const start = message.substring(0,inputRef.current.selectionStart);
        const end = message.substring(inputRef.current.selectionStart);
        // inputRef.current.value = start + emoji + end;
        setMessage(start+emoji+end);
        setCursorPos(start.length+emoji.length);
    };

  useEffect(()=>{
    inputRef.current.selectionEnd = cursorPos;
  },[cursorPos]);
  
  const toggleEmoji = (event) =>{
      event.preventDefault();
      setShowEmoji(!showEmoji);
  }
  return (
    <div>
      {
        showEmoji===true ? <Picker  onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_DARK} pickerStyle={{ width: '100%'}}/> : null
      }
    <form className="form">
      
      <input
        ref={inputRef}
        className="input"
        type="text"
        placeholder="Type message here..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      {
        showEmoji===true ? 
          <FaRegKeyboard className="icons" onClick={toggleEmoji} title="board"/>
        : 
          <GrEmoji className="icons" onClick={toggleEmoji}/>
       }
      {/* <button className="sendButton" onClick={event => sendMessage(event)}>Send</button> */}
      <BiSend  className="icons" onClick={event=>sendMessage(event)}></BiSend>
    </form>
    </div>
  )
};

export default Input;