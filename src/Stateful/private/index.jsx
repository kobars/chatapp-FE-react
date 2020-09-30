import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

const useQuery = () => new URLSearchParams(useLocation().search)

const Chat = () => {
  const { id } = useParams()
  const query = useQuery()
  const name = query.get('name')
  return (
    <div>
      <h1>
        ini chat private ke {id} dari {name}
      </h1>
    </div>
  )
}

export default Chat
