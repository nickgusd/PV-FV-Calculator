import React from "react";
import styled from 'styled-components';

export const CalcWrapper = styled.div`
text-align: center;
width: 30vw;
display: block;
margin: 0 auto;
margin-top: 20px;
// border: 1px solid black;
border-radius: 6px;
background: #0b4f6c;
color: white;
`

export const Container = styled.div`
display: flex;
flex-direction: row;
width: 18vw;
margin: 0 auto;
`

export const Button = styled.button`
margin-bottom: 20px;
background-color: #ef5750;
height: 25px;
width: 100px;
border: none;
color: #fff;
border-radius: 7px;
font-size: 16px;
`

export const Input = styled.input`
width: 180px;
margin: 15px;
`

export const Label = styled.label`
`

export const InputContainer = styled.div`
width: 15vw;
// border: 1px solid white;
display: flex;
flex-direction: column;
align-items: center;
`

export const BtnContainer = styled(InputContainer)`
width: 3vw;
`

export const Hidden = styled(Label)`
visibility: hidden;
`
export const ClearBtn = styled.button`
    margin: 15px;
`

