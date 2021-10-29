import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from "../Forms/forms.styles"
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Ticker from 'react-ticker'


const itemsPerPage = 6

const Main = () => {

  const [events, setEvents] = useState([])
  const [date, setDate] = useState()
  const [price, setPrice] = useState('all')
  const [location, setLocation] = useState('')
  const [search, setSearch] = useState('')
  const [error, setError] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/events/')
        setEvents(data)
      } catch (error) {
        setError(true)
      }
    }
    getData()
  }, [search, setEvents])

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())
    setPageNumber(1)
  }

  const handleLocation = (event) => {
    setLocation(event.target.value.toLowerCase())
    setPageNumber(1)
  }


  const handleDate = (event) => {
    setDate(event.target.value)
    setPageNumber(1)
  }

  const handlePrice = (event) => {
    setPrice(event.target.value)
    setPageNumber(1)
  }

  const filteredItems = events
    .filter(event => !date || event.date === date)
    .filter(event => {
      if (price === 'all') return true
      if (price === 'thirty' && Number(event.price) <= 30) return true
      if (price === 'sixty' && Number(event.price) <= 60) return true
      if (price === 'ninety' && Number(event.price) <= 90) return true
      if (price === 'hundred-twenty' && Number(event.price) <= 120) return true
      if (price === 'hundred-twenty-plus' && Number(event.price) >= 120) return true
      return false
    })
    .filter(event => !search || event.event_title.toLowerCase().includes(search))
    .filter(event => !location || event.address.toLowerCase().includes(location))

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  if (error) {
    return <span>Something went wrong...</span>
  }

  return (
    <>

      <Scroller>
        <Ticker>
          {() => <TextScroller>BEST EVENTS IN TOWN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔜 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RUNNING-CLUBS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔜 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FESTIVALS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  🔜  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CONCERTS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🔜 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SHOWS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TextScroller>}
        </Ticker>
      </Scroller>



      <Container>
        <Filters>
          <Input type='text' placeholder='Search Event' id='search-field' onInput={handleSearch}></Input>

          <Input type='text' placeholder='Where' id='where-field' onInput={handleLocation}></Input>

          <Input type='date' placeholder='When' id='when-field' onInput={handleDate}></Input>

          <SelectOption onChange={handlePrice}>
            <option value="all" default> Price £ </option>
            <option value="thirty">£0 to £30</option>
            <option value="sixty">£0 to £60</option>
            <option value="ninety">£0 to £90</option>
            <option value="hundred-twenty">£0 to £120</option>
            <option value="hundred-twenty-plus">£0 to £120+</option>
          </SelectOption>
        </Filters>

        <Cards>
          {filteredItems.sort((a, b) => a.event_title.toUpperCase() < b.event_title.toUpperCase() ? -1 : 1).slice(0, pageNumber * itemsPerPage).map((event, i) => {
            return <Card key={event._id} to={`/events/${event.id}`}>
              <Img src={event.event_image} alt="events" />
              <Title>{event.event_title}</Title>
              <Date>Date: {event.date}</Date>
              <Price>Price: £{event.price}</Price>
              <View>View</View>
            </Card>
          })}
        </Cards>
        <LoadBox>
          {
            pageNumber < totalPages && <LoadMore onClick={() => setPageNumber(pageNumber + 1)}>Load more...</LoadMore>
          }
        </LoadBox>



      </Container >

    </>
  )
}

const LoadBox = styled.div`
display: flex;
justify-content: center;
margin: 20px 0 80px;
`
const LoadMore = styled.button`
display: flex;
justify-content: center;
border-radius: 5px;
        outline: 0 none;
        border: 0 none;
        background-color: ${props => props.theme.inputFilter};
        color:${props => props.theme.text};
        padding: 10px 30px;

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
        cursor: pointer;
        `


const Price = styled.div`
        color:${props => props.theme.text};
        font-size: 15px;
        font-family: 'Inter', sans-serif;
        padding: 10px 0 20px;
        flex: 1;
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
const Input = styled.input`
        background-color: ${props => props.theme.inputFilter};
        height: 40px;
        border-radius: 20px;
        outline: 0 none;
        border: 0 none;
        padding: 0 90px 0 10px;
        color:${props => props.theme.inputText};
        padding-left: 15px;
        font-size: 15px;
        &::placeholder {
          color:${props => props.theme.inputText};
  
}
        `
const SelectOption = styled.select`
        background-color: ${props => props.theme.inputFilter};
        padding: 0 145px 0 10px;
        border-radius: 20px;
        outline: 0 none;
        border: 0 none;
        color:${props => props.theme.inputText};
        `

const Filters = styled.div`
        padding: 20px;
        margin: 40px 0 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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

export default Main