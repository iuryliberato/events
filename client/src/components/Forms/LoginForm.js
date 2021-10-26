import React, { useState } from 'react'
import styled from 'styled-components';
import { UserInput, Input, SubText, Submit, SubmitDiv, GoogleLink } from "./forms.styles";
import axios from 'axios'
import { useHistory } from 'react-router';

const LoginForm = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: ''

  })
  const [errors, setErrors] = useState({
    email: { message: '' },
    password: { message: '' }

  })


  const handleChange = (event) => {
    const newObj = { ...formData, [event.target.name]: event.target.value }
    setFormData(newObj)
    setErrors({ ...errors, [event.target.name]: '' })
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
      console.log('error ->', error.response.data.errors)
      if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Login>Member Login</Login>
      <LoginBox>
        <SubText>Login to your account</SubText>


        <UserInput><Input onInput={handleChange} type="email" id="email" name="email" placeholder="User Email" /></UserInput>

        <UserInput><Input onInput={handleChange} type="password" id="password" name="password" placeholder="Password" /></UserInput>
        <SubText>Or</SubText>
        <GoogleLink>Login with Google accounts</GoogleLink>


      </LoginBox>
      {errors.message && <p className="error">You've entered an invalid email/password combination. Try again</p>}
      <SubmitDiv>
        <Submit type="submit" >LOGIN</Submit>
      </SubmitDiv>
    </form>
  )

}



const LoginBox = styled.div`
margin: 70px 0 30px;
`

const Login = styled.div`
font-size: 45px;
display: flex;
justify-content: center;
margin: 100px 0 30px;
font-family: 'Inter', sans-serif;
`
export default LoginForm