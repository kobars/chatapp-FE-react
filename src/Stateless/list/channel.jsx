import React from 'react'
import './list.css'

const List = ({ name, number, currentChannel, changeChannel }) => (
  <div
    className={`channel ${currentChannel === name ? 'active-channel' : ''}`}
    onClick={() => changeChannel(name)}
  >
    <div className="channel-logo vertical-align">
      {name ? name.slice(0, 1).toUpperCase() : ''}
    </div>
    <p className="channel-name vertical-align">{name}</p>
    {currentChannel === name ? (
      <div className="channel-number vertical-align">{number}</div>
    ) : null}
  </div>
)

export default List
