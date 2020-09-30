import React from 'react'
import './list.css'

const List = ({ name, onlineUsers }) => (
  <div className="channel">
    <div className="channel-logo vertical-align">
      {name ? name.slice(0, 1).toUpperCase() : ''}
    </div>
    <p className="channel-name vertical-align">{name}</p>
    {onlineUsers.includes(name) ? (
      <div className="channel-online vertical-align"></div>
    ) : null}
  </div>
)

export default List
