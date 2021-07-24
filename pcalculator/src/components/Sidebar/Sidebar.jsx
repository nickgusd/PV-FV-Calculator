import React from "react";
import {
Container,
Tab
} from "./Sidebar";


export default function Sidebar() {

    const items = ["Future Value", "Present Value", "Payments", "Interest"]

    const handleClick = (event) => {
        alert(event.target.innerHTML)
    }

    return (
        <Container>
            {items.map((item, idx) => {
                return <Tab onClick={handleClick}>{item}</Tab>
            })}
        </Container>
    )
}