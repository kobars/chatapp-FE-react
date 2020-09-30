import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChatInput = ({ handleSubmit, userInput, handleUserInput }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Type something ..."
          value={userInput}
          onChange={handleUserInput}
        />
      </Form.Group>
      <Button variant="info" type="submit">
        Send
      </Button>
    </Form>
  )
}

export default ChatInput
