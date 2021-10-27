import React, { useContext, useState, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components';
import { Link, useHistory, useLocation } from 'react-router-dom'
import logoDark from '../../Logo-dark-theme.png'
import logoLight from '../../Logo-light-theme.png'
import profileLogo from '../../profile.png'


import LoginForm from '../Forms/LoginForm'
import RegisterForm from '../Forms/RegisterForm'
import { userIsAuthenticated } from '../Helpers/Auth';




const Navbar = ({ children }) => {
  const theme = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(false)

  const history = useHistory()

  const location = useLocation()

  useEffect(() => {
    // Triggers rerender with path change
  }, [location.pathname])


  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <Container>
      <Logo>
        <Link to='/'>
          {theme.dark ? <img src={logoDark} alt="logo" /> : <img src={logoLight} alt="logo" />}
        </Link>
      </Logo>
      <AllEvents to='/'>
        All Events
      </AllEvents>
      {userIsAuthenticated() ? (
        <>

          <AllEvents to='/create-event'>+ Events</AllEvents>
          <AllEvents onClick={handleLogout} to='/'>Logout</AllEvents>
          <Link to='/profile/'>
            <Profile src={profileLogo} alt="profile-logo"></Profile>
          </Link>
        </>
      ) : (
        <Register onClick={() => setModalOpen(true)}>
          Login | Register
        </Register>)
      }
      <ThemeSwitch>
        <SwitchDiv>
          {children}
        </SwitchDiv>
        <>Dark-Mode</>
      </ThemeSwitch>
      {
        modalOpen && (
          <>
            <Modal onClick={() => setModalOpen(false)} />
            <ModelContent>
              <LoginForm />
              <SubTextOr>Or</SubTextOr>
              <RegisterForm />
            </ModelContent>
          </>
        )
      }
    </Container >
  )
}
const Profile = styled.img`
width: 40px;
height: 40px;
margin: 20px;
`

const SubTextOr = styled.div`
display: flex;
justify-content: center;
margin-top: 300px;
font-family: 'Inter', sans-serif;
font-size: 25px;
`

const ModelContent = styled.div`
height: 740px;
width: 1300px;
background-color: ${props => props.theme.card};
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
border-radius: 10px;
display: flex;
justify-content: space-around;
`

const Modal = styled.div`
position: fixed;
top: 0;
right: 0;
bottom: 0;
left: 0;
background-color: ${props => props.theme.modalBackground};
display: flex;
justify-content: center;
align-items: center;
`

const AllEvents = styled(Link)`
    font-size: 20px;
    margin: 0 20px;
    color: ${props => props.theme.text};
    text-decoration: none;
    display: flex;
    align-items: center;
  
    `
const SwitchDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px 0;
`
const ThemeSwitch = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 13px;
    padding: 18px 25px 5px 20px;
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const Logo = styled.div`
  flex: 1;
  margin: 5px 15px;
`
const Register = styled.button`
    font: inherit;
    font-size: 17px;
    margin: 24px 20px 29px;
    background-color: ${props => props.theme.primary};
    color: black;
    padding: 0 15px ;
    text-decoration: none;
    display: flex;
    align-items: center;
    outline: 0 none;
    border: 0 none;
    border-radius: 3px;
`


export default Navbar