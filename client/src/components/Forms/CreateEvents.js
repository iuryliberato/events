import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { UserInput as _UserInput, Input, Submit, EventImage, Dropdown } from "./forms.styles"
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../Helpers/Auth'
import ImageUpload from '../Helpers/Image_upload'
import Ticker from 'react-ticker'

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
    event_title: [],
    description: [],
    date: [],
    price: [],
    address: [],
    animal_friendly: [],
    tags: []
  })

  const [options, setOptions] = useState([])

  const handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    setFormData({ ...formData, [event.target.name]: value })
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const handleMultiEnter = (tags) => {

    console.log(tags)
    setFormData({ ...formData, tags: tags.map(tag => tag.id) })
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/tags/')
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
      if (error.response.data) setErrors(error.response.data)
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
      <Scroller>
        <Ticker>
          {() => <TextScroller>BEST EVENTS IN TOWN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔜 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RUNNING-CLUBS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔜 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FESTIVALS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  🔜  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CONCERTS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🔜 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SHOWS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TextScroller>}
        </Ticker>
      </Scroller>
      <Container>

        <FormBox>


          Create Your Event
          <form onSubmit={handleSubmit}>
            <FormField>
              <Label>Event's title:</Label>
              <UserInput><Input onInput={handleChange} name="event_title" id="title" type="text" placeholder="Event title" value={formData.event_title} /></UserInput>
              {errors.event_title && errors.event_title.length > 0 && <SubTextError>{errors.event_title[0]}</SubTextError>}

              <Label>Description:</Label>
              <UserInput><Description onInput={handleChange} as="textarea" id="description" name="description" placeholder="Description" >{formData.description}</Description></UserInput>
              {errors.description && errors.description.length > 0 && <SubTextError>{errors.description[0]}</SubTextError>}

              <Label>Date:</Label>
              <UserInput><Input onInput={handleChange} name="date" type="date" placeholder="Date" value={formData.date} /></UserInput>
              {errors.date && errors.date.length > 0 && <SubTextError>{errors.date[0]}</SubTextError>}

              <Label>Start from:</Label>
              <UserInput><Input onInput={handleChange} name="time_from" type="time" placeholder="Time from" value={formData.time_from} /></UserInput>
              {errors.time_from && errors.time_from.length > 0 && <SubTextError>{errors.time_from[0]}</SubTextError>}

              <Label>Until:</Label>
              <UserInput><Input onInput={handleChange} name="time_until" type="time" placeholder="Time until" value={formData.time_until} /></UserInput>
              {errors.time_until && errors.time_until.length > 0 && <SubTextError>{errors.time_until[0]}</SubTextError>}

              <Label>Price:</Label>
              <UserInput><Input onInput={handleChange} name="price" type="text" placeholder="Price" value={formData.price} /></UserInput>
              {errors.price && errors.price.length > 0 && <SubTextError>{errors.price[0]}</SubTextError>}

              <Label>Adress:</Label>
              <UserInput><Input onInput={handleChange} name="address" type="text" placeholder="Address" value={formData.address} /></UserInput>
              {errors.address && errors.address.length > 0 && <SubTextError>{errors.address[0]}</SubTextError>}

              <Label>Tags:</Label>
              <Dropdown><Select options={options.map(option => ({ id: option.id, value: option.id, label: option.name }))} isMulti name="tags" onChange={handleMultiEnter} /></Dropdown>
              {errors.tags && errors.tags.length > 0 && <SubTextError>{errors.tags[0]}</SubTextError>}
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
const SubTextError = styled.span`
align-self: flex-start;
        font-size: 12px;      
        padding: 3px;
        color: black;
        margin-left: 20px;
        background-color: #EF8B2F;
        border-radius: 5px;
        letter-spacing: 1px;
        `

const TextScroller = styled.div`
font-family: 'Wallpoet', cursive;        
font-size: 20px;
color: black;

 `
const Scroller = styled.div`
       background-color: ${props => props.theme.primary};
         padding: 10px 0;
         color: black;
        `


const Label = styled.label`
margin-left: 19px;
font-size: 15px;
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
margin-top: 40px;
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
