import React from 'react';

import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

function InfoBar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h3>Room : {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close icon" /></a>
      </div>
    </div>
  );
}

export default InfoBar;