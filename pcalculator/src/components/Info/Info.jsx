import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Header, Body } from '../Info/Info.style';

import calculations from '../../config/calculations.json';
import content from '../../config/content.json';

export default function Info({ option }) {
  return (
    <Wrapper>
      <Header>
        <h2>{calculations[option]}</h2>
      </Header>
      <Body>
        <p>{content[option]}</p>
      </Body>
    </Wrapper>
  );
}

Info.propTypes = {
  option: PropTypes.string
};
