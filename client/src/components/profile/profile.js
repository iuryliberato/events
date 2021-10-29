import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage, getUserId } from '../Helpers/Auth'
import axios from 'axios'

import styled from 'styled-components'
import { Container } from "../Forms/forms.styles"
import EventCard from './EventCard'

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
          '/api/auth/profile/',
          { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } }
        )
        setProfile(data)

      } catch (error) {
        setHasError(true)
      }
    }
    getProfile()
  }, [])

  const userId = getUserId()

  const yourEvents = events.filter(event => event.owner.id === userId)

  const attendingEvents = events.filter(event => {
    return event.join.find(join => join.owner === userId)
  })




  return (
    <Container>
      {profile ?
        <>
          {profile.profile_image && <ProfileImg><ProfilePic src={profile.profile_image} alt="profile" /></ProfileImg>}

          <Welcome>Welcome, {profile.first_name}</Welcome>

          <Manage>Manage your events</Manage>

          <Cards>
            {yourEvents.map(event => <EventCard key={event._id} event={event} />)}
          </Cards>
          <Hr />
          <Going>Events that you are going</Going>
          <Cards>
            {attendingEvents.map(event => <EventCard key={event._id} event={event} />)}
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

const Hr = styled.hr`
border-color: ${props => props.theme.primary};
`

const Going = styled.div`
display: flex;
justify-content: center;
font-size: 45px;
font-family: 'Inter', sans-serif;
margin: 90px 0 110px;
`

const Manage = styled.div`
display: flex;
justify-content: center;
font-size: 45px;
font-family: 'Inter', sans-serif;
margin: 50px 0 60px;
`
const Welcome = styled.div`
display: flex;
justify-content: center;
font-family: 'Inter', sans-serif;
font-size: 35px;
margin: 20px;
`

const ProfileImg = styled.div`
display: flex;
justify-content: center;
`
const ProfilePic = styled.img`
width: 150px;
height: 150px;
border-radius: 75px;
margin: 30px;
`

const Cards = styled.div`
display: flex;
flex-wrap: wrap;
`
export default Profile