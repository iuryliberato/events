import logoDark from '../../GitHub-Mark-32px.png'
import logoLight from '../../GitHub-Mark-Light-32px.png'

import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

const Footer = () => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <FooterBox>
        <Created>
          Created by:
        </Created>
        <Iury href="https://github.com/iuryliberato" target="_blank" rel="noreferrer" >{theme.dark ? <GitLogo src={logoLight} alt="logo" /> : <GitLogo src={logoDark} alt="logo" />}Iury Liberato
        </Iury>
      </FooterBox>
    </>

  )
}
const GitLogo = styled.img`
width: 20px;
height: 20px;
margin: 0 8px 40px;
`

const FooterBox = styled.div`
  background-color: ${props => props.theme.footer};
  height: 100px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`
const Created = styled.div`
margin: 20px 0 10px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.primary};
`
const Iury = styled.a`
  font-size: 19px;
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: ${props => props.theme.text};
`

export default Footer