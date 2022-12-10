/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { optionState, isCalculatedState, calculateState } from '../../store';

import Calculator from '../Calculator/Calculator';
import Dropdown from '../Dropdown/Dropdown.jsx';
import BasicTable from '../Table/Table';
import Error from '../Error/Error';
// import Info from '../Info/Info';

import { ContainerDiv } from './Container';

export default function Container() {
  const [type, setType] = useRecoilState(optionState);
  // const [content, setContent] = useRecoilState(contentState);
  const IsCalculatedState = useRecoilValue(isCalculatedState);
  const calculation = useRecoilValue(calculateState);
  const options = ['PV', 'FV', 'PMT', 'Rate', 'Periods'];

  const handleChange = (event) => {
    const { value } = event.target;
    setType(value);
  };

  return (
    <ContainerDiv>
      <Dropdown onChange={handleChange} options={options} selected={type} />
      <Calculator option={type} value={options} />
      {calculation === 'N.aN' || calculation.toString() === 'NaN' ? (
        <Error message="Please Enter Numeric Values!" />
      ) : type === 'Rate' && calculation === 1 ? (
        <Error message="Please Enter Numeric Values!" />
      ) : null}
      {IsCalculatedState ? <BasicTable option={type} /> : null}
      {/* <Info option={content} /> */}
    </ContainerDiv>
  );
}
