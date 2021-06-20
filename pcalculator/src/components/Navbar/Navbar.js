import React from "react";

import styled, { css } from "styled-components";

export default function Navbar() {

const Nav = styled.div`
    height: 50px;
    width: 100vw;
    background-color: #0b4f6c;
    top: 0px;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 18px;
    font-family: "Titillium Web",sans-serif;
    font-weight: bold;
    padding-left: 20px;
`;

    return (
            <Nav>
                <Title>
                    Financial Calculator
                </Title>
            </Nav>
    )
}