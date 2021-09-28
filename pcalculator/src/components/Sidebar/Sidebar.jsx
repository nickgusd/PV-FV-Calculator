/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";

import {
  useRecoilValue,
} from "recoil";
import {
  optionState,
} from "../../store";

import {
  Container,
  Tab,
  Wrapper,
  StyledLink,
} from "./Sidebar";

export default function Sidebar() {
  const [active, setActive] = useState([]);
  const readOption = useRecoilValue(optionState);

  const arr = [
    {
      type: "Present Value",
      active: true,
    },
    {
      type: "Future Value",
      active: false,
    },
    {
      type: "Payments",
      active: false,
    },
    {
      type: "Interest",
      active: false,
    },
    {
      type: "Periods",
      active: false,
    },
  ];

  const changeType = (option) => {
    if (option === "PV") {
      return "Present Value";
    } if (option === "FV") {
      return "Future Value";
    } if (option === "PMT") {
      return "Payments";
    } if (option === "Periods") {
      return "Periods";
    }
    return "Interest";
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
    arr.forEach((item, idx) => {
      if (item.type === type) {
        item.active = true;
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
            <StyledLink to={`/?calculation=${item.type.toLowerCase()}`}>
              <Tab onClick={handleClick} active={item.active}>{item.type}</Tab>
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
          <StyledLink to={`/?calculation=${item.type.toLowerCase()}`}>
            <Tab onClick={handleClick} active={item.active}>{item.type}</Tab>
          </StyledLink>
        ))}
      </Wrapper>
    </Container>
  );
}
