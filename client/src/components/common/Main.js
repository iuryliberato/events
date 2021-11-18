import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from '../Forms/forms.styles'
import styled from 'styled-components'
import { device } from '../Helpers/style.components/sizes'
import EventCard from './../profile/EventCard'
import Scroller from '../scroller'

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
    .filter((event) => !date || event.date === date)
    .filter((event) => {
      if (price === 'all') return true
      if (price === 'thirty' && Number(event.price) <= 30) return true
      if (price === 'sixty' && Number(event.price) <= 60) return true
      if (price === 'ninety' && Number(event.price) <= 90) return true
      if (price === 'hundred-twenty' && Number(event.price) <= 120) return true
      if (price === 'hundred-twenty-plus' && Number(event.price) >= 120)
        return true
      return false
    })
    .filter(
      (event) => !search || event.event_title.toLowerCase().includes(search)
    )
    .filter(
      (event) => !location || event.address.toLowerCase().includes(location)
    )

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  if (error) {
    return <span>Something went wrong...</span>
  }

  return (
    <>
      <Scroller />
      <Container>
        <Filters>
          <Input
            type="text"
            placeholder="Search Event"
            id="search-field"
            onInput={handleSearch}
          ></Input>

          <Input
            type="text"
            placeholder="Where"
            id="where-field"
            onInput={handleLocation}
          ></Input>

          <Input
            type="date"
            placeholder="date"
            id="when-field"
            onfocus="(this.type='date')"
            onInput={handleDate}
            onblur="if(this.value==''){this.type='text'}"
          ></Input>

          <SelectOption onChange={handlePrice}>
            <option value="all" default>
              {' '}
              Price £{' '}
            </option>
            <option value="thirty">£0 to £30</option>
            <option value="sixty">£0 to £60</option>
            <option value="ninety">£0 to £90</option>
            <option value="hundred-twenty">£0 to £120</option>
            <option value="hundred-twenty-plus">£0 to £120+</option>
          </SelectOption>
        </Filters>

        <Cards>
          {filteredItems
            .sort((a, b) =>
              a.event_title.toUpperCase() < b.event_title.toUpperCase() ? -1 : 1
            )
            .slice(0, pageNumber * itemsPerPage)
            .map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
        </Cards>
        <LoadBox>
          {pageNumber < totalPages && (
            <LoadMore onClick={() => setPageNumber(pageNumber + 1)}>
              Load more...
            </LoadMore>
          )}
        </LoadBox>
      </Container>
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
  background-color: ${(props) => props.theme.inputFilter};
  color: ${(props) => props.theme.text};
  padding: 10px 30px;
`

const Cards = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const Filters = styled.div`
  padding: 20px;
  margin: 40px 0 60px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0 20px;
    flex-wrap: wrap;
  }
`

const Input = styled.input`
  font: inherit;
  background-color: ${(props) => props.theme.inputFilter};
  height: 40px;
  border-radius: 20px;
  outline: 0 none;
  border: 0 none;
  padding: 0 10px 0 15px;
  color: ${(props) => props.theme.inputText};
  font-size: 15px;
  margin: 5px;
  appearance: none;
  text-align: left;
  &::placeholder {
    color: ${(props) => props.theme.inputText};
  }

  @media ${device.tablet} {
    width: calc(50% - 10px);
  }

  @media ${device.desktop} {
    width: 100%;
    flex: 1;
  }
`

const SelectOption = styled.select`
  font: inherit;
  background-color: ${(props) => props.theme.inputFilter};
  border-radius: 20px;
  outline: 0 none;
  border: 0 none;
  color: ${(props) => props.theme.inputText};
  height: 40px;
  margin: 5px;
  padding: 0 1rem;
  appearance: none;

  @media ${device.tablet} {
    width: calc(50% - 10px);
  }

  @media ${device.desktop} {
    width: 100%;
    flex: 1;
  }
`

export default Main
