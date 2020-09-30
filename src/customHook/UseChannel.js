import { useState, useEffect } from 'react'
import io from 'socket.io-client'
let socket

const useChannel = ({
  baseUrl,
  name,
  channel,
  userMessage,
  setUserMessage,
}) => {
  const [users, setUsers] = useState('')
  const [channelMessages, setChannelMessages] = useState([])

  useEffect(() => {
    socket = io(baseUrl)
    console.log('name channel', name, channel)
    socket.emit('join channel', { name, channel }, (error) => {
      if (error) {
        alert(error)
      }
    })

    socket.on('message', (userMessage) => {
      setChannelMessages((channelMessages) => [...channelMessages, userMessage])
    })

    socket.on('get channel info', ({ users }) => {
      setUsers(users)
    })

    socket.on('test data', (data) => {
      console.log('dataa', data)
    })

    return () => socket.disconnect()
  }, [baseUrl, name, channel])

  const sendMessage = () => {
    console.log('sendMessage is called', userMessage)
    if (userMessage) {
      socket.emit('send message', userMessage, () => setUserMessage(''))
    }
  }

  const getData = () => {
    console.log('get data called')
    socket.emit('test data', (data) => {
      console.log('dataa', data)
    })
  }

  return {
    channelMessages,
    users,
    sendMessage,
    getData,
  }
}

export default useChannel
