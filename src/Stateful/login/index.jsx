import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './login.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const loginUrl = 'http://localhost:1337/auth/local'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const doLogin = async () => {
    const loginData = {
      identifier: username,
      password,
    }
    try {
      const response = await axios.post(loginUrl, loginData)
      console.log('response', response)
      if (response.status === 200) {
        console.log(response.data.user.channels)
        let channels = ''
        for (const i in response.data.user.channels) {
          if (i > 0) {
            channels += ','
          }
          channels += `${response.data.user.channels[i].name}`
        }
        history.push(
          `/channels/${response.data.user.channels[0].name}?name=${response.data.user.username}&channels=${channels}`
        )
      }
    } catch (error) {
      alert('Cek kembali username/password')
    }
  }

  const handleUsername = (e) => {
    if (e.target) {
      setUsername(e.target.value)
    }
  }

  const handlePassword = (e) => {
    if (e.target) {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    doLogin()
  }

  return (
    <div className="login-page">
      <h1 className="login-title">Datcord.</h1>
      <div className="form-container">
        <h4 className="subtitle">Collaboration made easy</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="loginUsername">
            <Form.Label className="form-label">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              onChange={handleUsername}
            />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              onChange={handlePassword}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            block
            disabled={username.length < 1 || password.length < 1}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login
