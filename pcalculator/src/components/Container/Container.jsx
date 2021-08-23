import React from "react";
import {
  useRecoilState,
  useRecoilValue,
} from "recoil";

import {
  optionState,
  isCalculatedState,
} from "../../store";

import Calculator from "../Calculator/Calculator";
import Dropdown from "../Dropdown/Dropdown.jsx";
import BasicTable from "../Table/Table";
import { ContainerDiv } from "./Container";

export default function Container() {
  const [type, setType] = useRecoilState(optionState);

  const handleChange = (event) => {
    const { value } = event.target;
    setType(value);
  };

  const calculatedState = useRecoilValue(isCalculatedState);
  const options = ["PV", "FV", "PMT", "Rate"];

  if (calculatedState === false) {
    return (
      <ContainerDiv>
        <Dropdown onChange={handleChange} options={options} />
        <Calculator option={type} value={options} />
      </ContainerDiv>
    );
  }
  return (
    <ContainerDiv>
      <Dropdown onChange={handleChange} options={options} />
      <Calculator option={type} value={options} />
      <BasicTable option={type} />
    </ContainerDiv>
  );
}
