import React from "react";
import Container from "../Container/Container.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import {
    Wrapper
} from "./Main";

export default function Main() {
    return (
        <Wrapper >
            <Sidebar/>
            <Container/>
        </Wrapper>
    );
}