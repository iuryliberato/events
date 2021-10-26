import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { UserInput as _UserInput, Input, Submit, EventImage, Dropdown } from "./forms.styles"
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../Helpers/Auth'
import ImageUpload from '../Helpers/Image_upload'


const CreateEvents = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    event_title: '',
    description: '',
    date: '',
    price: '',
    address: '',
    animal_friendly: false,
    tags: []
  })

  const [errors, setErrors] = useState({
    event_title: {},
    description: {},
    date: {},
    price: {},
    address: {},
    animal_friendly: {},
    tags: {}
  })

  const [options, setOptions] = useState([])

  const handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    setFormData({ ...formData, [event.target.name]: value })
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const handleMultiEnter = (tags) => {
    // const value = event.target.value.split(',')
    // console.log(event.target.value, value)
    console.log(tags)
    setFormData({ ...formData, tags: tags.map(tag => tag.id) })
  }
  // const handleMultiMethod = event => {
  //   const value = event.target.value.split(',')
  //   setFormData({ ...formData, [event.target.title]: value })
  // }
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/tags/') // * <-- replace with your endpoint
      setOptions(data)
    }
    getData()
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        'http://localhost:3000/api/events/',
        formData,
        { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/')
    } catch (error) {
      if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }

  const handleImageUrl = (url) => {
    try {
      setFormData({ ...formData, event_image: url })
      // setFormData({ ...formData, [event.target.name]: url })
    } catch (error) {
      if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }




  return (
    <>
      <Scrowler>
      </Scrowler>
      <Container>

        <FormBox>


          Create Your Event
          <form onSubmit={handleSubmit}>
            <FormField>

              <UserInput><Input onInput={handleChange} name="event_title" id="title" type="text" placeholder="Event title" value={formData.event_title} /></UserInput>
              {errors.name && <p className="error">Please enter event's title</p>}

              <UserInput><Description onInput={handleChange} as="textarea" id="description" name="description" placeholder="Description" >{formData.description}</Description></UserInput>
              {errors.name && <p className="error">Please enter event's description</p>}


              <UserInput><Input onInput={handleChange} name="date" type="date" placeholder="Date" value={formData.date} /></UserInput>


              <UserInput><Input onInput={handleChange} name="price" type="text" placeholder="Price" value={formData.price} /></UserInput>


              <UserInput><Input onInput={handleChange} name="address" type="text" placeholder="Address" value={formData.address} /></UserInput>

              <Dropdown><Select options={options.map(option => ({ id: option.id, value: option.id, label: option.name }))} isMulti name="tags" onChange={handleMultiEnter} />{formData.tags}</Dropdown>
              <div>

                <CheckBox onInput={handleChange} name="animal_friendly" id="animal-box" type="checkbox" placeholder="Animal friendly" value={formData.animal_friendly} />
                <Label for="animal-box">Animal Friendly</Label>
              </div>
              <EventImage><p>Upload a image for your event:</p>
                <ImageUpload value={formData.event_image} name="image" handleImageUrl={handleImageUrl} />
              </EventImage>
              <Submit type="submit">Submit Event</Submit>
            </FormField >
          </form>
        </FormBox >
      </Container >
    </>

  )
}

export default CreateEvents


const Scrowler = styled.div`
background-color: ${props => props.theme.primary};
height: 50px;
color: black;
font-size: 20px;
margin-bottom: 50px;
`


const Label = styled.label`
margin-left: 8px;
`

const CheckBox = styled.input`
margin: 0 0 10px 20px;
`

const Description = styled(Input)`
height: 130px;

`
const UserInput = styled(_UserInput)`
width: 500px;

`

const FormField = styled.div`
    font-size: 17px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px 30px;

`
const Container = styled.div`
display: flex;
justify-content: center;
margin-top: 20px;
`
const FormBox = styled.div`
    background-color: ${props => props.theme.card};
    font-size: 45px;
    width: 600px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    font-family: 'Inter', sans-serif;
    border-radius: 5px;
    margin-bottom: 50px;
`
