import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useQuery from '../../customHook/UseQuery'
import useChannel from '../../customHook/UseChannel'
import ChatInput from '../../Stateless/ChatInput'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './channels.css'
import ChannelList from '../../Stateless/list/channel'
import UserList from '../../Stateless/list/user'

const baseUrl = 'http://localhost:1337'

const Chat = () => {
  const [userInput, setUserInput] = useState('')
  const { channelName } = useParams()
  const [channelMember, setChannelMember] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const query = useQuery()
  const name = query.get('name')
  const channels = query.get('channels').split(',')
  const history = useHistory()
  const { channelMessages, sendMessage, users } = useChannel({
    baseUrl,
    name,
    channel: channelName,
    setUserMessage: setUserInput,
    userMessage: userInput,
  })

  const handleUserInput = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(userInput)
  }

  const changeChannel = (currentChannel) => {
    history.push(
      `/channels/${currentChannel}?name=${name}&channels=${channels}`
    )
  }

  const handleLogout = () => {
    history.replace('/')
  }

  useEffect(() => {
    const setOnline = () => {
      const online = users.map((user) => user.name)
      setOnlineUsers(online)
    }
    if (users.length > 0) {
      setOnline()
    }
  }, [users])

  useEffect(() => {
    const getChannelMember = async () => {
      const response = await fetch('http://localhost:1337/channels')
      const data = await response.json()
      const current = data.filter((channel) => channel.name === channelName)
      if (current && current[0].users.length > 0) {
        const allMember = current[0].users.map((e) => e.username)
        setChannelMember(allMember)
      }
    }
    getChannelMember()
  }, [channelName])

  return (
    <Container fluid>
      <Row className="row">
        <Col xs={5} id="sidebar-wrapper">
          <h1 className="server-title">Servers</h1>
          <div className="channels-list">
            <h3 className="list-title">Channels</h3>
            {channels.map((name, index) => (
              <ChannelList
                key={index}
                name={name}
                number={channelMember.length}
                currentChannel={channelName}
                changeChannel={changeChannel}
              />
            ))}
            <Button
              variant="danger"
              className="logout-btn"
              onClick={handleLogout}
              block
            >
              Logout
            </Button>
          </div>
          <div className="members-list">
            <h3 className="list-title">Members</h3>
            {channelMember.map((name, index) => (
              <UserList key={index} name={name} onlineUsers={onlineUsers} />
            ))}
          </div>
        </Col>
        <Col xs={{ span: 7, offset: 5 }} id="page-content-wrapper">
          <h1 className="channel-name-chat">Channel {channelName}</h1>
          {channelMessages.map((message, idx) => (
            <p key={idx} className={message.user === name ? ' text-right' : ''}>
              <b>{message.user === name ? 'You' : message.user}:</b>{' '}
              {message.text}
            </p>
          ))}
          <ChatInput
            userInput={userInput}
            handleUserInput={handleUserInput}
            handleSubmit={handleSubmit}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Chat
