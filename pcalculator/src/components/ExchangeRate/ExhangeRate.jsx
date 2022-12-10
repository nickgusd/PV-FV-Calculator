/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ratesState, exchangeOptionsState } from '../../store';

import { Container, RatesWrapper, List } from './ExchangeRate';
import DropDown from '../Dropdown/Dropdown.jsx';
import Loader from '../Loader/Loader';

export const ExchangeRate = () => {
  const [rates, setRates] = useRecoilState(ratesState);
  const [options, setOptions] = useRecoilState(exchangeOptionsState);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        // eslint-disable-next-line no-undef
        'X-RapidAPI-Key': process.env.apikey,
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
    </Container>
  );
};
