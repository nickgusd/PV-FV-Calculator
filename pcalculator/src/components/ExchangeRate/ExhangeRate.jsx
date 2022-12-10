/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ratesState, exchangeOptionsState, selectedState } from '../../store';

import { Container, RatesWrapper, List, Caption } from './ExchangeRate';
import DropDown from '../Dropdown/Dropdown.jsx';
import Loader from '../Loader/Loader';

export const ExchangeRate = () => {
  const [rates, setRates] = useRecoilState(ratesState);
  const [options, setOptions] = useRecoilState(exchangeOptionsState);
  const [selected, setSelected] = useRecoilState(selectedState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        // eslint-disable-next-line no-undef
        'X-RapidAPI-Key': 'd60b77f798msh32257c07ec0e08ap1cb378jsn227b3dea201a',
        'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com'
      }
    };

    setIsLoading(true);

    fetch(`https://exchangerate-api.p.rapidapi.com/rapid/latest/${selected || 'USD'}`, options)
      .then((response) => response.json())
      .then((response) => {
        setRates(Object.values(response.rates));
        setOptions(Object.keys(response.rates));
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [selected]);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const compare = rates[options.indexOf('USD')];

  console.log('compare', compare);

  return (
    <Container>
      <h2> Exchange Rates</h2>
      <RatesWrapper>
        <DropDown options={options} onChange={handleChange} />
        <List>
          {isLoading && <Loader />}
          {!isLoading &&
            options.map((item, idx) => (
              <div key={item}>
                {item} {rates[idx].toFixed(2)}
              </div>
            ))}
        </List>
      </RatesWrapper>
      {selected && !isLoading && <Caption>{selected + ' to ' + 'USD'}</Caption>}
      {selected && !isLoading && (
        <Caption>
          {rates[options.indexOf(selected)]} to {'$' + compare.toFixed(2)}
        </Caption>
      )}
    </Container>
  );
};
