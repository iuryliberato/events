import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage, getPayload } from '../Helpers/Auth'
import { Container as _Container } from "../Forms/forms.styles"
import styled from 'styled-components'

const SingleEvent = () => {


  const [event, setEvent] = useState()
  const [hasError, setHasError] = useState(false)


  const { id } = useParams()
  const history = useHistory()

  console.log(id)

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`)
        setEvent(data)
        console.log(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getEvents()
  }, [id])

  const userIsOwner = (ownerId) => {
    const payload = getPayload()
    if (!payload) return
    return ownerId === payload.sub
  }

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(
        `/api/events/${id}`, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      history.push('/events')
    } catch (error) {
      console.log(error)
    }
  }
  console.log(userIsOwner, handleDeleteEvent)

  return (

    <Container>

      {event ?

        <>
          <Img src={event.event_image} alt={event.event_title} />
          <Title>{event.event_title}</Title>

          <About>About: </About>
          <Description>{event.description}</Description>
          <Date>Date: {event.date}</Date>
          <Price>Price: £{event.price}</Price>
          <Price>Location: {event.address}</Price>
          {/* <p>tags: {event.tags}</p> */}
          <Price>Pet friendly: {event.animal_friendly ? 'Yes!' : 'Not, I am affraid'}</Price>
          <Price>Organizer: {event.owner.first_name}</Price>
        </>

        :
        <>
          {hasError ?
            <h2>Oops something went wrong.</h2>
            :
            <h2>Loading...</h2>
          }
        </>
      }
    </Container >

  )

}

const Container = styled(_Container)`
 background-color: ${props => props.theme.card};
 padding: 0 0 40px;
 border-radius: 10px;
 margin-top: 30px;
`
const Price = styled.div`
font-size: 17px;
margin: 20px 0 20px;
font-family: 'Inter', sans-serif;
text-align: justify;
padding: 0 90px;
`

const Description = styled.div`
font-size: 17px;
margin: 20px 0 50px;
font-family: 'Inter', sans-serif;
text-align: justify;
padding: 0 90px;
`

const About = styled.div`
font-size: 40px;
margin: 20px 0 20px;
font-family: 'Inter', sans-serif;
display: flex;
justify-content: center;
`
const Date = styled.div`
font-size: 20px;
margin: 20px 0 20px;
color: ${props => props.theme.primary};
font-family: 'Inter', sans-serif;
padding: 20px 90px;
`

const Title = styled.div`
font-size: 50px;
display: flex;
justify-content: center;
margin: 20px 0 80px;
`

const Img = styled.img`
        position: cover;
        border-radius: 10px;
        height: 500px;
        width: 100%;
        object-fit: cover;
`

export default SingleEvent