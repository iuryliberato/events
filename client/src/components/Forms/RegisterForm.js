import React, { useState } from 'react'
import styled from 'styled-components';
import { UserInput, Input, SubText, Submit, GoogleLink, EventImage, SubmitDiv } from "./forms.styles";
import axios from 'axios'
import { useHistory } from 'react-router';
import ImageUpload from '../Helpers/Image_upload'


const RegisterForm = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    profile_image: 'https://i.imgur.com/gYQmnSa.jpg',
    Bio: ''
  })
  const [errors, setErrors] = useState({
    email: { message: '' },
    username: { message: '' },
    password: { message: '' },
    passwordConfirmation: { message: '' }
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
      console.log('error ->', error.response.data.errors)
      if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }


  const handleImageUrl = (url) => {
    try {
      setFormData({ ...formData, profile_image: url })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <RegisterHead>Register</RegisterHead>

      <GoogleLink>Register with Google accounts</GoogleLink>

      <SubText>Or</SubText>
      <SubText>Create your account</SubText>


      <UserInput><Input onInput={handleChange} type="text" id="user-name" name="first_name" placeholder="First Name" value={formData.first_name} /></UserInput>
      {errors.first_name && <p className="error">Please enter your first name</p>}

      <UserInput><Input onInput={handleChange} type="text" id="last-name" name="last_name" placeholder="Last name" value={formData.last_name} /></UserInput>
      {errors.last_name && <p className="error">Please enter a last name</p>}

      <UserInput><Input onInput={handleChange} type="email" id="email" name="email" placeholder="User Email" value={formData.email} /></UserInput>
      {/* {errors.email && <p className="error">Please enter an email</p>} */}




      <UserInput><Input onInput={handleChange} type="password" id="password" name="password" placeholder="Password" value={formData.password} /></UserInput>
      {/* {errors.password && <p className="error">please enter a password</p>} */}

      <UserInput><Input onInput={handleChange} type="password" id="password-confirmation" name="password_confirmation" placeholder="Password Confirmation" value={formData.password_confirmation} /></UserInput>
      {/* {errors.passwordConfirmation && <SubText className="error">Password don't match</SubText>} */}
      <EventImage><p>Upload a image for your event:</p>
        <ImageUpload name="profile_image" handleImageUrl={handleImageUrl} />
      </EventImage>

      <SubmitDiv>
        <Submit type="submit">Register</Submit>
      </SubmitDiv>
    </form>
  )
}


const RegisterHead = styled.div`
font-size: 45px;
display: flex;
justify-content: center;
margin: 50px 0 30px;
font-family: 'Inter', sans-serif;
`

export default RegisterForm