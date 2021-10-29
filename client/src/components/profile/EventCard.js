import React from "react"
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage, getPayload } from '../Helpers/Auth'

const EventCard = ({ event }) => {

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(
        `/api/events/${id}`, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
      )
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const userIsOwner = (ownerId) => {
    const payload = getPayload()
    if (!payload) return
    return ownerId === payload.sub
  }

  return (
    <Card>
      <Img src={event.event_image} alt="events" />
      <Title>{event.event_title}</Title>
      <Date>Date: {event.date}</Date>
      <Price>Price: £{event.price}</Price>
      <View as={Link} to={`/events/${event.id}`}>View</View>
      <Settings>
        {
          userIsOwner(event.owner.id) &&
          <>
            <ViewEdit as={Link} to={`/events/${event.id}/edit/`}>Edit Event</ViewEdit>
            <ViewDelete onClick={() => handleDeleteEvent(event.id)}>Delete Event</ViewDelete>
          </>
        }
      </Settings>

    </Card>

  )
}


const Card = styled.div`
        text-decoration: none;
        background-color: ${props => props.theme.card};
        margin: 20px;
        width: calc(33.3% - 40px);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 30px;
        `
const Img = styled.img`  
        position: cover;
        border-radius: 10px;
        height: 250px;
        width: 100%;
        object-fit: cover;
        `
const Title = styled.span`
        color:${props => props.theme.text};
        font-size: 30px;
        display: flex;
        text-align: center;
        margin: 8px;
        
        `
const Date = styled.div`
        color:${props => props.theme.text};
        font-size: 15px;
        font-family: 'Inter', sans-serif;
        `
const Price = styled.div`
color:${props => props.theme.text};
font-size: 15px;
font-family: 'Inter', sans-serif;
padding: 10px 0 20px;
flex: 1;
`
const Button = styled.button`
font: inherit;
text-align: center;
font-size: 15px;
background-color: ${props => props.theme.primary};
color: black;
padding: 10px 0;
text-decoration: none;
font-family: 'Inter', sans-serif;
border-radius: 5px;
outline: 0 none;
border: 0 none;
cursor: pointer;
transition: transform 150ms;
        &:hover{
        transform: scale(1.05);
        }
`

const View = styled(Button)`
align-self: stretch;
margin: 0 30px;
`
const Settings = styled.div`
display: flex;
flex-direction: row;
margin: 10px 30px 0;
justify-content: space-between;
align-self: stretch;
`
const ViewDelete = styled(Button)`
margin-left: 5px;
flex: 1;
`
const ViewEdit = styled(Button)`
margin-right: 5px;
flex: 1;
`

export default EventCard