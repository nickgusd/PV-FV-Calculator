import React, { useState } from "react";
import Calculator from "../Calculator/Calculator.jsx";
import Dropdown from "../Dropdown/Dropdown.jsx";
import { ContainerDiv } from "./Container";

export default function Container() {
  const [type, setType] = useState("PV");

  const handleChange = (event) => {
    const { value } = event.target;
    setType(value);
  };

  return (
    <ContainerDiv>
      <Dropdown onChange={handleChange} />
      <Calculator option={type} />
    </ContainerDiv>
  );
}
