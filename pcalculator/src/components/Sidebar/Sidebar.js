import styled from "styled-components";

export const Container = styled.div`
width: 200px;
border: 1px solid black;
// background: #0b4f6c;
background: #1C5253;
height: 100vw;
`;

export const Tab = styled.div`
height: 50px;
border-bottom: 1px solid #757575;
display: flex;
justify-content: center;
align-items: center;
color: white;
font-size: 16px;
// background: ${(props) => (props.active ? "#ef5750" : "#0b4f6c")};
background: ${(props) => (props.active ? "#76B041" : "#1C5253")};
`;
