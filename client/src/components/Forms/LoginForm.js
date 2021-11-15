import React, { useState } from 'react'
import styled from 'styled-components'
import {
  UserInput,
  Input,
  SubText,
  SubmitDiv,
  GoogleLink,
  Submit,
} from './forms.styles'
import axios from 'axios'
import { useHistory } from 'react-router'
import GoogleLogin from 'react-google-login'
import { device } from '../Helpers/style.components/sizes'

const LoginForm = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setError('')
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      setTokenToLocalStorage(data.token)
      history.go(0)
    } catch (error) {
      console.log('errors ->', error.response.data)
      if (error.response.data.detail) setError(error.response.data.detail)
    }
  }

  const responseGoogle = async (response) => {
    console.log(response)
    try {
      const { data } = await axios.post('api/auth/login/', {
        email: response.profileObj.email,
        password: response.profileObj.googleId + 'abc?!',
      })
      setTokenToLocalStorage(data.token)
      history.go(0)
    } catch (error) {
      console.log('error ->', error.response.data)
      if (error.response.data.detail) setError(error.response.data.detail)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Login>Member Login</Login>
      <LoginBox>
        <SubText>Login to your account</SubText>

        <UserInput>
          <Input
            onInput={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="User Email"
          />
        </UserInput>

        <UserInput>
          <Input
            onInput={handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </UserInput>
        <SubTextError>{error && <p className="error">{error}</p>}</SubTextError>
        <SubText>Or</SubText>

        <GoogleLink>
          <GoogleLogin
            clientId="307212407201-o3nofvpj446fk0aup46u2dcul358n3m8.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </GoogleLink>
      </LoginBox>

      <SubmitDiv>
        <Submit type="submit">LOGIN</Submit>
      </SubmitDiv>
    </form>
  )
}

const SubTextError = styled.div`
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  color: red;
  margin-left: 20px;
`

const LoginBox = styled.div`
  margin: 20px 0 30px;
  @media ${device.tablet} {
    margin: 20px 0;
  }
  @media ${device.desktop} {
    margin: 70px 0 30px;
  }
`
const Login = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 100px 0 30px;
  font-family: 'Inter', sans-serif;
  @media ${device.tablet} {
    margin: 50px 0 20px;
    font-size: 45px;
  }
  @media ${device.desktop} {
    margin: 100px 0 30px;
    font-size: 45px;
  }
`

export default LoginForm
