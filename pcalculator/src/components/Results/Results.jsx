/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React from 'react';
import { useRecoilValue } from 'recoil';
import { numberWithCommas } from '../../helpers';
import { ratesState, selectedState, exchangeOptionsState } from '../../store';

import { Container } from './Results';

export default function Results({ calculation, option, isCalculated }) {
  const selected = useRecoilValue(selectedState);
  const rate = useRecoilValue(ratesState);
  const options = useRecoilValue(exchangeOptionsState);
  const choices = ['PV', 'FV', 'PMT', 'Rate', 'Periods'];

  // const currentRate = rate[options.indexOf(selected)];
  const usd = rate[options.indexOf('USD')];

  // console.log('selected', selected);
  // console.log('rate', rate);
  // console.log('options', options);
  // console.log('currentRate', currentRate);

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
                {option} = {numberWithCommas((calculation / usd).toFixed(2))} {selected || 'USD'}
              </b>
            );
          }
        })}
      </Container>
    );
  }
  return null;
}
