import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage } from '../Helpers/Auth'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from "../Forms/forms.styles"

const Profile = () => {

  const [profile, setProfile] = useState({})
  const [hasError, setHasError] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/events/')
        setEvents(data)
      } catch (error) {
      }
    }
    getData()
  }, [setEvents])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          `/api/profile/`,
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setProfile(data)
        console.log(data)
      } catch (error) {
        setHasError(true)
      }
    }
    getProfile()
  }, [])


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


  return (
    <Container>
      {profile ?
        <>
          {profile.profile_image && <img src={profile.profile_image} alt="profile" />}

          <h1>Welcome, {profile.first_name}</h1>
          <p>Manage your events</p>

          <h2>My Events</h2>

          <Cards>
            {events.map(event => {
              return <Card key={event._id} to={`/events/${event.id}`}>
                <Img src={event.event_image} alt="events" />
                <Title>{event.event_title}</Title>
                <Date>Date: {event.date}</Date>
                <Price>Price: £{event.price}</Price>
                <View>View</View>
                <Settings>
                  <Link to={`/events/${events._id}/edit/`}><ViewEdit>Edit Event</ViewEdit></Link>
                  <ViewDelete onClick={() => handleDeleteEvent(events._id)} >Delete Event</ViewDelete>
                </Settings>
              </Card>
            })}

          </Cards>






        </> : <>
          {hasError ?
            <h2>Oops something went wrong.</h2>
            :
            <h2>Loading...</h2>
          }

        </>
      }
    </Container>

  )
}

const Settings = styled.div`
display: flex;
flex-direction: row;
margin-top: 10px;
justify-content: space-between;

`
const ViewDelete = styled.button`
font: inherit;
font-size: 15px;
margin: 0 0 0 10px;;
background-color: ${props => props.theme.primary};
color: black;
padding: 10px 30px;
text-decoration: none;
font-family: 'Inter', sans-serif;
border-radius: 5px;
outline: 0 none;
border: 0 none;

`
const ViewEdit = styled.button`
font: inherit;
font-size: 15px;
margin: 0 0 0 10px;;
background-color: ${props => props.theme.primary};
color: black;
padding: 10px 30px;
text-decoration: none;
font-family: 'Inter', sans-serif;
border-radius: 5px;
outline: 0 none;
border: 0 none;

`

const Card = styled(Link)`
        text-decoration: none;
        background-color: ${props => props.theme.card};
        margin: 20px;
        width: calc(33.3% - 40px);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 30px;
        transition: transform 150ms;
        &:hover{
        transform: scale(1.05);
        }
        `

const Date = styled.div`
        color:${props => props.theme.text};
        font-size: 15px;
        font-family: 'Inter', sans-serif;
        `
const View = styled.button`
font: inherit;
font-size: 15px;
background-color: ${props => props.theme.primary};
color: black;
padding: 10px 100px;
align-self: stretch;
text-decoration: none;
font-family: 'Inter', sans-serif;
border-radius: 5px;
outline: 0 none;
border: 0 none;
margin: 0 30px;
`

const Price = styled.div`
        color:${props => props.theme.text};
        font-size: 15px;
        font-family: 'Inter', sans-serif;
        padding: 10px 0 20px;
        flex: 1;
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
const Cards = styled.div`
display: flex;
flex-wrap: wrap;
`
export default Profile