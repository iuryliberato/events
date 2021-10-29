import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getTokenFromLocalStorage, getUserId } from '../Helpers/Auth'
import { Container as _Container } from "../Forms/forms.styles"
import styled from 'styled-components'

const SingleEvent = () => {


  const [event, setEvent] = useState()
  const [hasError, setHasError] = useState(false)


  const { id } = useParams()

  const getEvent = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/events/${id}`)
      setEvent(data)
      console.log(data)
    } catch (error) {
      setHasError(true)
    }
  }, [id])

  useEffect(() => {
    getEvent()
  }, [getEvent])

  const handleAttending = async () => {
    try {
      await axios.post(
        `/api/join/`, {
        event: event.id,
        going: true
      }, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } })
      await getEvent()
    } catch (error) {
      console.log(error)
    }
  }

  const handleNotAttending = async (joinId) => {
    try {
      await axios.delete(
        `/api/join/${joinId}/`, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      await getEvent()
    } catch (error) {
      console.log(error)
    }
  }


  const userId = getUserId()
  const join = event && event.join.find(join => join.owner === userId)
  const isUserAttending = userId && !!join

  console.log(`user is attending ${isUserAttending}`)


  return (

    <Container>

      {event ?

        <>

          <Img src={event.event_image} alt={event.event_title} />
          <Div>
            <Title>{event.event_title}</Title>
            <Card>
              <Attending>{isUserAttending ? 'You are already attending' : 'You are not attending yet'}</Attending>
              <Attending><Color>{event.join.length}</Color></Attending>
              <Attending>people attending</Attending>
              {isUserAttending ? (
                <Going onClick={() => handleNotAttending(join.id)}>Cancel</Going>
              ) : (
                <Going onClick={handleAttending}>I want to go</Going>
              )}
            </Card>
          </Div>




          <About>About: </About>
          <Description>{event.description}</Description>
          <Date>Date: {event.date}</Date>
          <Price>From: {event.time_from} until {event.time_until} </Price>

          <Price>Price: £{event.price}</Price>
          <Price>Location: {event.address}</Price>
          <Price>Pet friendly: {event.animal_friendly ? 'Yes!' : 'Not, I am affraid'}</Price>

          <Price>Organizer: {event.owner.first_name}</Price>
          <Tags>{event.tags.map(tag => <TagStyle key={tag.name}>{tag.name}</TagStyle>)}</Tags>
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

const TagStyle = styled.span`
background-color: ${props => props.theme.cardLight};
padding: 10px;
border-radius: 10px;
margin: 5px;

`

const Tags = styled.div`
font-size: 20px;

color: ${props => props.theme.primary};
font-family: 'Inter', sans-serif;
display: flex;
margin: 0 80px;
flex-wrap: wrap;
`

const Card = styled.div`
background-color: ${props => props.theme.cardLight};
width: 170px;
border-radius: 20px;
padding: 20px;
display: flex;
flex-direction: column;
text-align: center;
transition: transform 150ms;
        &:hover{
        transform: scale(1.05);
        }
`

const Div = styled.div`
display: flex;
justify-content: space-around;
margin: 30px 20px 20px 90px;
`
const Color = styled.span`
color: ${props => props.theme.primary};
font-size: 50px;
margin: 0 5px 0 0;
`
const Attending = styled.div`
font-family: 'Inter', sans-serif;
font-size: 18px;
margin-top: 10px;
`
const Going = styled.button`
background-color: ${props => props.theme.primary};
padding: 8px 20px;
font-size: 15px;;
    border-radius: 5px;
    outline: 0 none;
    border: 0 none;
    margin-top: 10px;
    
`

const Container = styled(_Container)`
 background-color: ${props => props.theme.card};
 padding: 0 0 40px;
 border-radius: 10px;
 margin-top: 30px;
 overflow: hidden;
`
const Price = styled.div`
font-size: 17px;
margin: 20px 0;
font-family: 'Inter', sans-serif;
text-align: justify;
padding: 0 90px;
`

const Description = styled.div`
font-size: 17px;
margin: 20px 0 50px;
font-family: 'Inter', sans-serif;
text-align: center;
padding: 0 90px;
letter-spacing: 0.8px;


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
        height: 500px;
        width: 100%;
        object-fit: cover;
`

export default SingleEvent