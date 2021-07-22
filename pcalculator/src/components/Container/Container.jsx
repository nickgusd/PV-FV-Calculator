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

  const options = ["PV", "FV", "PMT", "Rate"];

  return (
    <ContainerDiv>
      <Dropdown onChange={handleChange} options={options} />
      <Calculator option={type} value={options} />
    </ContainerDiv>
  );
}
