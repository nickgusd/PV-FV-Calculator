/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from "react";
import {
  useRecoilState,
  useRecoilValue,
} from "recoil";

import {
  optionState,
  isCalculatedState,
  calculateState,
} from "../../store";

import Calculator from "../Calculator/Calculator";
import Dropdown from "../Dropdown/Dropdown.jsx";
import BasicTable from "../Table/Table";
import Error from "../Error/Error";
import { ContainerDiv } from "./Container";

export default function Container() {
  const [type, setType] = useRecoilState(optionState);

  const handleChange = (event) => {
    const { value } = event.target;
    setType(value);
  };

  const IsCalculatedState = useRecoilValue(isCalculatedState);
  const calculation = useRecoilValue(calculateState);
  const options = ["PV", "FV", "PMT", "Rate", "Periods"];

  return (
    <ContainerDiv>
      <Dropdown onChange={handleChange} options={options} />
      <Calculator option={type} value={options} />
      {calculation === 'N.aN' || calculation.toString() === 'NaN' ? <Error message="Please Enter Numeric Values!" /> : type === "Rate" && calculation === 1 ? <Error message="Please Enter Numeric Values!" /> : null}
      {IsCalculatedState ? <BasicTable option={type} /> : null}
    </ContainerDiv>
  );
}
