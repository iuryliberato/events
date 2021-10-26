import styled, { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from './themes'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import useLocalStorage from "use-local-storage"
import SwitchButton from "react-switch";


import Navbar from './components/common/Navbar'
import Main from './components/common/Main'
import Footer from './components/common/Footer'
import CreateEvents from './components/Forms/CreateEvents'
import SingleEvent from './components/events/SingleEvent'

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Navbar>
          <SwitchButton offColor="#00DEB6" onColor="#00DEB6" activeBoxShadow="0 0 2px 3px #9AE9DB" onChange={themeToggler} checked={theme === 'dark'} />
        </Navbar>
        <Content>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route exact path='/create-event'>
              <CreateEvents />
            </Route>
            <Route exact path='/events/:id/'>
              <SingleEvent />
            </Route>
          </Switch>
        </Content>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )

}

const Content = styled.div`
flex: 1;
`


export default App
