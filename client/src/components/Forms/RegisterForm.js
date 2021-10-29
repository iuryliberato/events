import React, { useState } from 'react'
import styled from 'styled-components';
import { UserInput, Input, SubText, Submit, GoogleLink, EventImage, SubmitDiv } from "./forms.styles";
import axios from 'axios'
import { useHistory } from 'react-router';
import ImageUpload from '../Helpers/Image_upload'
import GoogleLogin from 'react-google-login'

const RegisterForm = () => {

  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    profile_image: 'http://romanroadtrust.co.uk/wp-content/uploads/2018/01/profile-icon-png-898.png',
    Bio: ''
  })
  const [errors, setErrors] = useState({
    email: [],
    username: [],
    password: [],
    passwordConfirmation: []
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
      const { data } = await axios.post('api/auth/register/', formData)
      setTokenToLocalStorage(data.token)
      history.go(0)

    } catch (error) {
      console.log('error ->', error.response.data)
      if (error.response.data) setErrors(error.response.data)
    }
  }

  const handleImageUrl = (url) => {
    try {
      setFormData({ ...formData, profile_image: url })
    } catch (error) {
      console.log(error)
    }
  }
  const responseGoogle = async (response) => {
    console.log(response)
    try {
      const { data } = await axios.post('api/auth/register/', {
        email: response.profileObj.email,
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        password: response.profileObj.googleId + 'abc?!',
        password_confirmation: response.profileObj.googleId + 'abc?!',
        profile_image: response.profileObj.imageUrl,
        Bio: ''
      })
      setTokenToLocalStorage(data.token)
      history.go(0)

    } catch (error) {
      console.log('error ->', error.response.data)
      if (error.response.data) setErrors(error.response.data)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <RegisterHead>Register</RegisterHead>

      <GoogleLink>
        <GoogleLogin
          clientId="307212407201-o3nofvpj446fk0aup46u2dcul358n3m8.apps.googleusercontent.com"
          buttonText="Register"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />

      </GoogleLink>

      <SubText>Or</SubText>
      <SubText>Create your account</SubText>


      <UserInput><Input onInput={handleChange} type="text" id="user-name" name="first_name" placeholder="First Name" value={formData.first_name} /></UserInput>
      {errors.first_name && errors.first_name.length > 0 && <SubTextError>{errors.first_name[0]}</SubTextError>}

      <UserInput><Input onInput={handleChange} type="text" id="last-name" name="last_name" placeholder="Last name" value={formData.last_name} /></UserInput>
      {errors.last_name && errors.last_name.length > 0 && <SubTextError>{errors.last_name[0]}</SubTextError>}

      <UserInput><Input onInput={handleChange} type="email" id="email" name="email" placeholder="User Email" value={formData.email} /></UserInput>
      {errors.email && errors.email.length > 0 && <SubTextError>{errors.email[0]}</SubTextError>}




      <UserInput><Input onInput={handleChange} type="password" id="password" name="password" placeholder="Password" value={formData.password} /></UserInput>
      {errors.password && errors.password.length > 0 && <SubTextError>{errors.password[0]}</SubTextError>}

      <UserInput><Input onInput={handleChange} type="password" id="password-confirmation" name="password_confirmation" placeholder="Password Confirmation" value={formData.password_confirmation} /></UserInput>
      {errors.password_confirmation && errors.password_confirmation.length > 0 && <SubTextError>{errors.password_confirmation[0]}</SubTextError>}

      <EventImage><p>Upload a image for your Profile:</p>
        <ImageUpload name="profile_image" handleImageUrl={handleImageUrl} />
      </EventImage>

      <SubmitDiv>
        <Submit type="submit">Register</Submit>
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
const RegisterHead = styled.div`
        font-size: 45px;
        display: flex;
        justify-content: center;
        margin: 50px 0 30px;
        font-family: 'Inter', sans-serif;
        `

export default RegisterForm