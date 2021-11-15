import React from 'react'
import styled from 'styled-components'
import { device } from './Helpers/style.components/sizes'
import Ticker from 'react-ticker'

const Scroller = () => {
  return (
    <ScrollerDiv>
      <Ticker>
        {() => (
          <TextScroller>
            BEST EVENTS IN
            TOWN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔜
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RUNNING-CLUBS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔜
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            FESTIVALS
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            🔜
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CONCERTS
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            🔜
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            SHOWS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </TextScroller>
        )}
      </Ticker>
    </ScrollerDiv>
  )
}
const TextScroller = styled.div`
  font-family: 'Wallpoet', cursive;
  font-size: 20px;
  color: black;
  white-space: nowrap;
  @media ${device.smallerThanDesktop} {
    font-family: 'Wallpoet', cursive;
    font-size: 15px;
    color: black;
  }
  @media ${device.desktop} {
  }
`

const ScrollerDiv = styled.div`
  background-color: ${(props) => props.theme.primary};
  padding: 10px 0;
  color: black;
  @media ${device.smallerThanDesktop} {
    padding: 5px 0;
  }
  @media ${device.desktop} {
  }
`

export default Scroller
