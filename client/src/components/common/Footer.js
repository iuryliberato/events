import React from "react"
import styled from 'styled-components'

const Footer = () => {

  return (
    <>
      <FooterBox>
        <Created>
          Created by:
        </Created>
        <Iury>
          Iury Liberato
        </Iury>
      </FooterBox>
    </>

  )
}

const FooterBox = styled.div`
  background-color: ${props => props.theme.footer};
  height: 100px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`
const Created = styled.div`
margin: 20px 0 5px;
  font-size: 10px;
  display: flex;
  justify-content: center;
`
const Iury = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: center;
`

export default Footer