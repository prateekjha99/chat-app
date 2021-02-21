import React,{useState} from 'react';
import Picker, {SKIN_TONE_DARK} from 'emoji-picker-react';
import {GrEmoji} from 'react-icons/gr';
import {FaRegKeyboard, FaEnvelope} from 'react-icons/fa';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = React.createRef();

  const onEmojiClick = (event, emojiObject) => {
      document.querySelector('input').value += emojiObject.emoji;
      console.log(emojiObject)
      inputRef.current.autofocus = true;
    };
  
  var visible = true;
  const toggleEmoji = (event) =>{
      event.preventDefault();
      setShowEmoji(!showEmoji);

  }

  return (
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
      <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
      {
        showEmoji==true ? 
        <span>  
          <FaRegKeyboard onClick={toggleEmoji} title="board"/>
          <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_DARK} style={{position: 'relative',zIndex:2}}/>
        </span> 
        : 
        <GrEmoji onClick={toggleEmoji}/>
       }
    </form>
  )
};
// const App = () => {
//   const [showEmoji, setShowEmoji] = useState(false);
//   const inputRef = React.createRef();

//   const onEmojiClick = (event, emojiObject) => {
//       document.querySelector('input').value += emojiObject.emoji;
//       console.log(emojiObject)
//       inputRef.current.autofocus = true;
//     };
  
//   var visible = true;
//   const toggleEmoji = (event) =>{
//       event.preventDefault();
//       setShowEmoji(!showEmoji);

//   }
//   return (
//       <div>
//           <input placeholder="type.." ref={inputRef}></input>
//           {
//               showEmoji==true ? 
//               <span>
//                   <FaRegKeyboard onClick={toggleEmoji} title="board"/>
//                   <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_DARK} style={{zIndex: "2"}}/>
//               </span> 
//               : 
//               <GrEmoji onClick={toggleEmoji}/>
//           }
//           <h1>Hello</h1>
//       </div>
//   )
// };


export default Input;