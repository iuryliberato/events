import React, { useContext, useState, useEffect, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Link, useHistory, useLocation } from 'react-router-dom'
import logoDark from '../../Logo-dark-theme.png'
import logoLight from '../../Logo-light-theme.png'
import profileLogo from '../../profile.png'
import Menu from '../../styles/icons8-menu.svg'
import { device } from '../Helpers/style.components/sizes'
import { Container as _Container } from './Conatiner'

import LoginForm from '../Forms/LoginForm'
import RegisterForm from '../Forms/RegisterForm'
import { userIsAuthenticated } from '../Helpers/Auth'

const Navbar = ({ children }) => {
  const theme = useContext(ThemeContext)

  const [modalOpen, setModalOpen] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef(null)

  useEffect(() => {
    /* Close the drawer when the user clicks outside of it */
    const closeDrawer = (event) => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return
      }

      setMenuOpen(false)
    }

    document.addEventListener('mousedown', closeDrawer)
    return () => document.removeEventListener('mousedown', closeDrawer)
  }, [])

  const handleMenuLink = () => {
    setMenuOpen(false)
  }

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
        <Link to="/">
          {theme.dark ? (
            <img src={logoDark} alt="logo" />
          ) : (
            <img src={logoLight} alt="logo" />
          )}
        </Link>
      </Logo>

      {userIsAuthenticated() ? (
        <>
          <MenuButton onClick={() => setMenuOpen(true)}>
            <ImgMenu src={Menu} alt="Menu" />
          </MenuButton>

          <MenuBackground menuOpen={menuOpen}></MenuBackground>
          <NavLinksDiv ref={drawerRef} menuOpen={menuOpen}>
            <Link onClick={handleMenuLink} to="/profile/">
              <Profile src={profileLogo} alt="profile-logo"></Profile>
            </Link>

            <NavbarItem onClick={handleMenuLink} to="/">
              All Events
            </NavbarItem>
            <NavbarItem onClick={handleMenuLink} to="/create-event/">
              Add Events
            </NavbarItem>
            <NavbarItem onClick={handleLogout} to="/">
              Logout
            </NavbarItem>
            <ThemeSwitch>
              <SwitchDiv>{children}</SwitchDiv>
              <>Dark-Mode</>
            </ThemeSwitch>
          </NavLinksDiv>
        </>
      ) : (
        <>
          <MenuButton onClick={() => setMenuOpen(true)}>
            <ImgMenu src={Menu} alt="Menu" />
          </MenuButton>
          <MenuBackground menuOpen={menuOpen}></MenuBackground>
          <NavLinksDiv ref={drawerRef} menuOpen={menuOpen}>
            <AllEvents onClick={handleMenuLink} to="/">
              All Events
            </AllEvents>
            <Register
              onClick={() => {
                handleMenuLink()
                setModalOpen(true)
              }}
            >
              Login | Register
            </Register>

            <ThemeSwitch>
              <SwitchDiv onClick={handleMenuLink}>{children}</SwitchDiv>
              <>Dark-Mode</>
            </ThemeSwitch>
          </NavLinksDiv>
        </>
      )}

      {modalOpen && (
        <>
          <Modal onClick={() => setModalOpen(false)} />
          <ModelContent>
            <ModalScroll>
              <LoginForm />
              <SubTextOr>Or</SubTextOr>
              <RegisterForm />
            </ModalScroll>
          </ModelContent>
        </>
      )}
    </Container>
  )
}

const NavbarItem = styled(Link)`
  margin: 5px;
  font-size: 22px;
  text-decoration: none;
  color: ${(props) => props.theme.text};
  position: relative;
  @media ${device.desktop} {
    margin: 0 10px 0;

    &::after {
      position: absolute;
      content: '';
      width: 0%;
      height: 4px;
      background-color: whitesmoke;
      left: 50%;
      bottom: -10px;
      transition: all 0.1s ease-in-out;
    }
    &:hover::after {
      left: 0;
      width: 100%;
    }
  }
`
const NavLinksDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  border-radius: 5px;

  @media ${device.smallerThanDesktop} {
    position: fixed;
    top: 0;
    right: 0;
    width: 320px;
    z-index: 1000;
    padding: 100px 40px 100px 20px;
    transition: transform 0.5s;
    background-color: ${(props) => props.theme.menuBackground};
    transform: ${(props) =>
      props.menuOpen ? 'translateX(0%)' : 'translateX(100%)'};
    flex-direction: column;
  }

  @media ${device.desktop} {
  }
`
const Container = styled(_Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const MenuBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(214, 214, 214, 0.7);
  z-index: 1000;
  opacity: ${(props) => (props.menuOpen ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.5s;

  @media ${device.desktop} {
    display: none;
  }
`

const ImgMenu = styled.img`
  width: 25px;
  @media ${device.desktop} {
    display: none;
  }
`

const MenuButton = styled.button`
  margin: 30px 19px 20px;
  height: 35px;
  border-radius: 3px;
  outline: 0 none;
  border: 0 none;
  display: flex;
  align-items: center;
  @media ${device.desktop} {
    display: none;
  }
`
const Profile = styled.img`
  width: 40px;
  height: 40px;
  margin: 20px;
`

const SubTextOr = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  @media ${device.tablet} {
    font-size: 15px;
    margin-top: 60px;
    margin-bottom: 60px;
  }
  @media ${device.desktop} {
    margin-top: 300px;
    font-size: 25px;
  }
`

const ModelContent = styled.div`
  overflow: scroll;
  background-color: ${(props) => props.theme.card};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  z-index: 1;
  padding: 0 50px;
  overflow: scroll;
  height: 80vh;
  @media ${device.tablet} {
    width: 500px;
  }

  @media ${device.desktop} {
    width: 960px;
    height: auto;
    overflow: hidden;
  }
  @media ${device.wide} {
    width: 1200px;
  }
`

const ModalScroll = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media ${device.desktop} {
    justify-content: space-around;
    flex-direction: row;
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.modalBackground};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
`

const AllEvents = styled(Link)`
  font-size: 20px;
  margin: 0 20px;
  color: ${(props) => props.theme.text};
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
  padding: 0 25px 5px 20px;
  @media ${device.smallerThanDesktop} {
    padding: 18px 10px 5px 10px;
  }

  @media ${device.desktop} {
  }
`

const Logo = styled.div`
  flex: 1;
  margin: 5px 15px;
  @media ${device.smallerThanDesktop} {
    margin: 5px 5px;
  }

  @media ${device.desktop} {
  }
`

const Register = styled.button`
  font: inherit;
  font-size: 17px;
  margin: 24px 20px 29px;
  background-color: ${(props) => props.theme.primary};
  color: black;
  padding: 15px;
  text-decoration: none;
  display: flex;
  align-items: center;
  outline: 0 none;
  border: 0 none;
  border-radius: 3px;
`

export default Navbar
