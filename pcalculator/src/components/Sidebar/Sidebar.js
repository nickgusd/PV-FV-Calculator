import React from "react";

import styled from "styled-components";

export default function Sidebar() {

    const Container = styled.div`
        width: 200px;
        border: 1px solid black;
        background: #0b4f6c;
        height: 100%;
    `
    const Tab = styled.div`
        height: 50px;
        border-bottom: 1px solid #757575;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 16px;
    `

    const items = ["Future Value", "Present Value", "Payments", "Interest"]

    return (
        <Container>
            {items.map((item, idx) => {
                return <Tab>{item}</Tab>
            })}
        </Container>
    )
}