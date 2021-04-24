import React from 'react';
import {FaRegTimesCircle} from 'react-icons/fa';

import './InfoBar.css';

function InfoBar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h3>Room : {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href='/'><FaRegTimesCircle color="white" size="2rem"/></a>
      </div>
    </div>
  );
}

export default InfoBar;