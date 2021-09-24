/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React from "react";

// import Error from "../Error/Error";

import {
  Container,
} from "./Results";

import {
  numberWithCommas,
} from "../../helpers";

export default function Results({ calculation, option, isCalculated }) {
  const choices = ["PV", "FV", "PMT", "Rate", "Periods"];

  if (parseInt(calculation) !== 0) {
    return (
      <Container>
        {choices.map((item) => {
          if (item === option && isCalculated) {
            if (option === "Rate" && parseInt(calculation) > 0) {
              return (
                <b>
                  {option}
                  {' '}
                  =
                  {' '}
                  {calculation.toFixed(3)}
                  %
                </b>
              );
            } if (option === "Periods" && parseInt(calculation) > 0) {
              return (
                <b>
                  {option}
                  {' '}
                  =
                  {' '}
                  {calculation.toFixed(3)}
                </b>
              );
            }
            if (calculation === "N.aN") {
              return null;
            }
            return (
              <b>
                {option}
                {' '}
                = $
                {' '}
                {numberWithCommas(calculation)}
              </b>
            );
          }
        })}
      </Container>
    );
  }
  return null;
}
