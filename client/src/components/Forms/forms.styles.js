import styled from 'styled-components'
import { device } from '../Helpers/style.components/sizes'

export const Input = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 3px;
  font-family: 'Inter', sans-serif;
  background-color: ${(props) => props.theme.inputBox};
  padding-left: 8px;
  outline: 0 none;
  border: 0 none;
`
export const UserInput = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  font-size: 10px;
  width: 100%;
`
export const GoogleLink = styled.div`
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  margin: 10px;
  @media ${device.tablet} {
  }
  @media ${device.desktop} {
  }
`
export const Submit = styled.button`
  font: inherit;
  font-size: 17px;
  margin: 30px 0;
  background-color: ${(props) => props.theme.primary};
  color: black;
  padding: 15px 112px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  border-radius: 5px;
  outline: 0 none;
  border: 0 none;
`
export const SubText = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
`
export const EventImage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  font-family: 'Inter', sans-serif;
`
export const SubmitDiv = styled.div`
  display: flex;
  justify-content: center;
`
export const Dropdown = styled.div`
  color: black;
  margin: 20px 0;
`
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`
export const SubTextError = styled.span`
  align-self: flex-start;
  font-size: 12px;
  padding: 3px;
  color: black;
  margin-left: 20px;
  background-color: #ef8b2f;
  border-radius: 5px;
  letter-spacing: 1px;
`

export const Label = styled.label`
  font-size: 15px;
`

export const CheckBox = styled.input`
  margin-bottom: 10px;
`

export const Description = styled(Input)`
  height: 130px;
`

export const Form = styled.form`
  font-size: 17px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 0;
  width: 100%;

  @media ${device.tablet} {
    padding: 30px 30px;
  }
`
export const FormBox = styled.div`
  background-color: ${(props) => props.theme.card};
  width: calc(100% - 32px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  border-radius: 5px;
  margin: 40px 16px;

  @media ${device.tablet} {
    width: 600px;
    padding: 40px;
    margin: 20px auto;
  }
`
export const FormTitle = styled.h1`
  font-size: 28px;
  @media ${device.tablet} {
    font-size: 48px;
  }
`
