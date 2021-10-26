import styled from 'styled-components';

export const Input = styled.input`
width: 100%;
height: 30px;
border-radius: 3px;
font-family: 'Inter', sans-serif;
background-color: ${props => props.theme.inputBox};
padding-left: 8px;
outline: 0 none;
border: 0 none;
`
export const UserInput = styled.div`
display: flex;
justify-content: center;
margin: 20px;
font-size: 10px;
width: 290px;

`
export const GoogleLink = styled.div`
font-size: 19px;
font-family: 'Inter', sans-serif;
display: flex;
justify-content: center;
margin: 20px;
`
export const Submit = styled.button`
    font: inherit;
    font-size: 17px;
    margin: 30px 0 15px;
    background-color: ${props => props.theme.primary};
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
padding: 10px 20px;
font-family: 'Inter', sans-serif;
`
export const SubmitDiv = styled.div`
display: flex;
justify-content: center;
`
export const Dropdown = styled.div`
color: black;
width: 500px;
margin: 20px;
`
export const Container = styled.div`
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        `