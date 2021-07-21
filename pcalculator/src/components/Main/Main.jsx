import React from "react";
import Container from "../Container/Container.jsx";
import Sidebar from "../Sidebar/Sidebar";

import styled from "styled-components";

export default function Main() {

    const Wrapper = styled.div`
        width: 100vw;
        height: Calc(100vh - 50px);
        display: flex;
        flex-direction: row;
        overflow: hidden;
    `

    return (
        <Wrapper >
            <Sidebar/>
            <Container/>
        </Wrapper>
    )
}