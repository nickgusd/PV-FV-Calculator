/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React from 'react';

import { Container } from './Results';

import { numberWithCommas } from '../../helpers';

export default function Results({ calculation, option, isCalculated }) {
  const choices = ['PV', 'FV', 'PMT', 'Rate', 'Periods'];

  if (option === 'Rate' && calculation === 1) {
    return null;
  }

  if (parseInt(calculation) !== 0) {
    return (
      <Container>
        {choices.map((item) => {
          if (item === option && isCalculated) {
            if (option === 'Rate') {
              return (
                <b>
                  {option} = {calculation.toFixed(3)}%
                </b>
              );
            }
            if (option === 'Periods') {
              return (
                <b>
                  {option} = {calculation.toFixed(3)}
                </b>
              );
            }
            if (calculation === 'N.aN' || calculation.toString() === 'NaN') {
              return null;
            }
            return (
              <b>
                {console.log('lol', calculation)}
                {option} = $ {numberWithCommas(calculation)}
              </b>
            );
          }
        })}
      </Container>
    );
  }
  return null;
}
