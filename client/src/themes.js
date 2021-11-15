
import { createGlobalStyle } from "styled-components"

export const lightTheme = {
  dark: false,
  body: '#eeeeee',
  text: '#0A0A0A',
  card: '#ffffff',
  primary: '#00DEB6',
  modalBackground: 'rgba(0, 0, 0, 0.3)',
  inputBox: '#eeeeee',
  footer: '#D3D3D3',
  inputFilter: '#ffffff',
  inputText: '#737373',
  cardLight: '#f3f3f3',
  menu: '#9EBD9F',
  menuBackground: '#f0f0f0'
}

export const darkTheme = {
  dark: true,
  body: '#1D1D1D',
  text: '#fff',
  card: '#2F2F2F',
  primary: '#00DEB6',
  modalBackground: 'rgba(0, 0, 0, 0.8)',
  inputBox: '#ffffff',
  footer: '#2F2F2F',
  inputFilter: '#424242',
  inputText: '#cccccc',
  cardLight: '#424242',
  menu: '#00E0AA',
  menuBackground: '#282828'
}

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    font-family: 'Josefin Sans', sans-serif;
  }
  body {
    min-height: 100vh;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
  }
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }


`