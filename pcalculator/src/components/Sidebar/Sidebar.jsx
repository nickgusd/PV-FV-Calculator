/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { contentState, optionState } from '../../store';
import calculations from '../../config/calculations.json';

import { Container, Tab, Wrapper, StyledLink } from './Sidebar';

export default function Sidebar() {
  const [active, setActive] = useState([]);
  const readOption = useRecoilValue(optionState);
  const setContent = useSetRecoilState(contentState);
  const [calc, setCalc] = useRecoilState(optionState);

  const arr = [
    {
      type: 'Present Value',
      calc: 'PV',
      active: true
    },
    {
      type: 'Future Value',
      calc: 'FV',
      active: false
    },
    {
      type: 'Payments',
      calc: 'PMT',
      active: false
    },
    {
      type: 'Interest',
      calc: 'Rate',
      active: false
    },
    {
      type: 'Periods',
      calc: 'Periods',
      active: false
    }
  ];

  const changeType = (option) => {
    return calculations[option];
  };

  useEffect(() => {
    const option = changeType(readOption);
    arr.forEach((item, idx) => {
      if (item.type === option) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    setActive(arr);
  }, [readOption]);

  const handleClick = (event) => {
    const type = event.target.innerHTML;

    setCalc(arr[arr.findIndex((item) => item.type === type)].calc);

    arr.forEach((item, idx) => {
      if (item.type === type) {
        item.active = true;
        setContent(item.calc);
      } else {
        item.active = false;
      }
    });
    setActive(arr);
  };

  if (active.length > 0) {
    return (
      <Container>
        <Wrapper>
          {active.map((item, idx) => (
            <StyledLink key={idx}>
              <Tab onClick={handleClick} active={item.active}>
                {item.type}
              </Tab>
            </StyledLink>
          ))}
        </Wrapper>
      </Container>
    );
  }
  return (
    <Container>
      <Wrapper>
        {arr.map((item, idx) => (
          <StyledLink key={idx}>
            <Tab onClick={handleClick} active={item.active}>
              {item.type}
            </Tab>
          </StyledLink>
        ))}
      </Wrapper>
    </Container>
  );
}
